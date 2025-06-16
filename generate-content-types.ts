import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import pg from 'pg';

// Configuration
const config = {
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || 'strapi',
    user: process.env.DATABASE_USERNAME || 'strapi',
    password: process.env.DATABASE_PASSWORD || 'strapi',
  },
  strapiDir: process.cwd(), // Current working directory (your Strapi project root)
  apiDir: 'src/api',
};

// Connect to PostgreSQL
const client = new pg.Client(config.database);

// Helper to convert snake_case to camelCase
const toCamelCase = (str) => {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
};

// Helper to convert snake_case to PascalCase
const toPascalCase = (str) => {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// Helper to convert table name to Strapi content type name
const tableToContentType = (tableName) => {
  // Remove common prefixes like 'strapi_' or plural suffixes
  let name = tableName;
  if (name.startsWith('strapi_')) {
    name = name.substring(7);
  }
  
  // Convert to singular form (very basic implementation)
  if (name.endsWith('s')) {
    name = name.substring(0, name.length - 1);
  }
  
  return name;
};

// Map PostgreSQL types to Strapi types
const mapDbTypeToStrapiType = (dbType) => {
  const typeMap = {
    'integer': 'integer',
    'bigint': 'biginteger',
    'character varying': 'string',
    'varchar': 'string',
    'text': 'text',
    'boolean': 'boolean',
    'date': 'date',
    'timestamp with time zone': 'datetime',
    'timestamp': 'datetime',
    'json': 'json',
    'jsonb': 'json',
    'decimal': 'decimal',
    'numeric': 'decimal',
    'real': 'float',
    'double precision': 'float',
  };
  
  return typeMap[dbType.toLowerCase()] || 'string';
};

// Check if a plural name is already in use
const isPluralNameInUse = async (pluralName) => {
  try {
    // Search for existing schema files
    const apiDir = path.join(config.strapiDir, config.apiDir);
    const contentTypeDirs = await fs.readdir(apiDir);
    
    for (const dir of contentTypeDirs) {
      const contentTypeDir = path.join(apiDir, dir, 'content-types');
      try {
        const contentTypes = await fs.readdir(contentTypeDir);
        
        for (const contentType of contentTypes) {
          const schemaPath = path.join(contentTypeDir, contentType, 'schema.json');
          try {
            const schemaContent = await fs.readFile(schemaPath, 'utf8');
            const schema = JSON.parse(schemaContent);
            
            if (schema.collectionName === pluralName || 
                (schema.info && schema.info.pluralName === pluralName)) {
              return true;
            }
          } catch (err) {
            // Schema file doesn't exist or can't be read, continue
          }
        }
      } catch (err) {
        // Content types directory doesn't exist, continue
      }
    }
    
    return false;
  } catch (err) {
    console.error('Error checking plural name:', err);
    return false;
  }
};

// Generate a unique plural name
const generateUniquePluralName = async (baseName) => {
  let counter = 1;
  let pluralName = baseName;
  
  while (await isPluralNameInUse(pluralName)) {
    pluralName = `${baseName}_${counter}`;
    counter++;
  }
  
  return pluralName;
};

// Generate schema.json file for a content type
const generateSchemaFile = async (contentTypeName, tableName, columns, foreignKeys) => {
  const singularName = contentTypeName;
  // Ensure unique plural name
  const pluralName = await generateUniquePluralName(tableName);
  const displayName = toPascalCase(contentTypeName);
  
  // Create attributes object based on columns
  const attributes = {};
  
  for (const column of columns) {
    // Skip internal Strapi columns and primary keys
    if (['id', 'created_at', 'updated_at', 'created_by_id', 'updated_by_id', 'published_at'].includes(column.column_name)) {
      continue;
    }
    
    // Check if this is a foreign key
    const isForeignKey = foreignKeys.some(fk => fk.column_name === column.column_name);
    
    if (isForeignKey) {
      const foreignKey = foreignKeys.find(fk => fk.column_name === column.column_name);
      const targetTable = foreignKey.foreign_table_name;
      const targetContentType = tableToContentType(targetTable);
      
      attributes[column.column_name.replace('_id', '')] = {
        type: 'relation',
        relation: 'manyToOne',
        target: `api::${targetContentType}.${targetContentType}`,
        inversedBy: pluralName
      };
    } else {
      // Regular attribute
      attributes[column.column_name] = {
        type: mapDbTypeToStrapiType(column.data_type),
        required: column.is_nullable === 'NO',
      };
      
      // Add unique constraint if applicable
      if (column.is_unique) {
        attributes[column.column_name].unique = true;
      }
      
      // Add default value if applicable
      if (column.column_default !== null) {
        let defaultValue = column.column_default;
        
        // Clean up default value
        if (typeof defaultValue === 'string' && defaultValue.startsWith('\'') && defaultValue.endsWith('\'')) {
          defaultValue = defaultValue.substring(1, defaultValue.length - 1);
        } else if (defaultValue === 'true') {
          defaultValue = true;
        } else if (defaultValue === 'false') {
          defaultValue = false;
        } else if (!isNaN(defaultValue)) {
          defaultValue = Number(defaultValue);
        }
        
        attributes[column.column_name].default = defaultValue;
      }
    }
  }
  
  // Create schema object
  const schema = {
    kind: 'collectionType',
    collectionName: pluralName,
    info: {
      singularName,
      pluralName,
      displayName,
      description: '',
    },
    options: {
      draftAndPublish: columns.some(col => col.column_name === 'published_at'),
    },
    attributes,
  };
  
  // Create directory structure
  const contentTypeDir = path.join(config.strapiDir, config.apiDir, singularName, 'content-types', singularName);
  await fs.mkdir(contentTypeDir, { recursive: true });
  
  // Write schema.json
  await fs.writeFile(
    path.join(contentTypeDir, 'schema.json'),
    JSON.stringify(schema, null, 2)
  );
  
  console.log(`Generated schema for ${displayName} (collection: ${pluralName})`);
  return { singularName, pluralName, displayName };
};

// Generate controller file (TypeScript version)
const generateController = async (contentTypeName, displayName) => {
  const controllerDir = path.join(config.strapiDir, config.apiDir, contentTypeName, 'controllers');
  await fs.mkdir(controllerDir, { recursive: true });
  
  const controllerContent = `import { factories } from '@strapi/strapi';

/**
 * ${displayName} controller
 */
export default factories.createCoreController('api::${contentTypeName}.${contentTypeName}');
`;
  
  await fs.writeFile(
    path.join(controllerDir, `${contentTypeName}.ts`),
    controllerContent
  );
  
  console.log(`Generated TypeScript controller for ${displayName}`);
};

// Generate routes file (TypeScript version)
const generateRoutes = async (contentTypeName, displayName) => {
  const routesDir = path.join(config.strapiDir, config.apiDir, contentTypeName, 'routes');
  await fs.mkdir(routesDir, { recursive: true });
  
  const routesContent = `import { factories } from '@strapi/strapi';

/**
 * ${displayName} router
 */
export default factories.createCoreRouter('api::${contentTypeName}.${contentTypeName}');
`;
  
  await fs.writeFile(
    path.join(routesDir, `${contentTypeName}.ts`),
    routesContent
  );
  
  console.log(`Generated TypeScript routes for ${displayName}`);
};

// Generate service file (TypeScript version)
const generateService = async (contentTypeName, displayName) => {
  const serviceDir = path.join(config.strapiDir, config.apiDir, contentTypeName, 'services');
  await fs.mkdir(serviceDir, { recursive: true });
  
  const serviceContent = `import { factories } from '@strapi/strapi';

/**
 * ${displayName} service
 */
export default factories.createCoreService('api::${contentTypeName}.${contentTypeName}');
`;
  
  await fs.writeFile(
    path.join(serviceDir, `${contentTypeName}.ts`),
    serviceContent
  );
  
  console.log(`Generated TypeScript service for ${displayName}`);
};

// Generate index.ts file for the content type
const generateIndex = async (contentTypeName, displayName) => {
  const contentTypeDir = path.join(config.strapiDir, config.apiDir, contentTypeName);
  
  const indexContent = `/**
 * ${displayName} module exports
 */

import controllers from './controllers';
import routes from './routes';
import services from './services';

export default {
  controllers,
  routes,
  services,
};
`;
  
  await fs.writeFile(
    path.join(contentTypeDir, 'index.ts'),
    indexContent
  );
  
  console.log(`Generated TypeScript index for ${displayName}`);
};

// Generate controllers/index.ts file
const generateControllersIndex = async (contentTypeName, displayName) => {
  const controllersDir = path.join(config.strapiDir, config.apiDir, contentTypeName, 'controllers');
  
  const indexContent = `/**
 * ${displayName} controllers exports
 */

import ${contentTypeName} from './${contentTypeName}';

export default {
  '${contentTypeName}': ${contentTypeName},
};
`;
  
  await fs.writeFile(
    path.join(controllersDir, 'index.ts'),
    indexContent
  );
};

// Generate routes/index.ts file
const generateRoutesIndex = async (contentTypeName, displayName) => {
  const routesDir = path.join(config.strapiDir, config.apiDir, contentTypeName, 'routes');
  
  const indexContent = `/**
 * ${displayName} routes exports
 */

import ${contentTypeName} from './${contentTypeName}';

export default {
  '${contentTypeName}': ${contentTypeName},
};
`;
  
  await fs.writeFile(
    path.join(routesDir, 'index.ts'),
    indexContent
  );
};

// Generate services/index.ts file
const generateServicesIndex = async (contentTypeName, displayName) => {
  const servicesDir = path.join(config.strapiDir, config.apiDir, contentTypeName, 'services');
  
  const indexContent = `/**
 * ${displayName} services exports
 */

import ${contentTypeName} from './${contentTypeName}';

export default {
  '${contentTypeName}': ${contentTypeName},
};
`;
  
  await fs.writeFile(
    path.join(servicesDir, 'index.ts'),
    indexContent
  );
};

// Main function to generate all content types
const generateContentTypes = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    
    // Get all tables (excluding Strapi internal tables)
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name NOT LIKE 'strapi_%'
      AND table_name NOT LIKE 'admin_%'
      AND table_name NOT LIKE 'up_%'
      AND table_name NOT LIKE 'i18n_%'
      AND table_name NOT LIKE 'pg_%'
    `);
    
    const tables = tablesResult.rows.map(row => row.table_name);
    console.log(`Found ${tables.length} tables: ${tables.join(', ')}`);
    
    for (const tableName of tables) {
      // Get columns for this table
      const columnsResult = await client.query(`
        SELECT 
          column_name, 
          data_type, 
          is_nullable, 
          column_default,
          CASE 
            WHEN EXISTS (
              SELECT 1 FROM information_schema.table_constraints tc
              JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
              WHERE tc.constraint_type = 'UNIQUE' AND tc.table_name = $1 AND ccu.column_name = columns.column_name
            ) THEN true
            ELSE false
          END as is_unique
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [tableName]);
      
      const columns = columnsResult.rows;
      
      // Get foreign keys for this table
      const foreignKeysResult = await client.query(`
        SELECT
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = $1
      `, [tableName]);
      
      const foreignKeys = foreignKeysResult.rows;
      
      // Generate content type files
      const contentTypeName = tableToContentType(tableName);
      const { displayName } = await generateSchemaFile(contentTypeName, tableName, columns, foreignKeys);
      await generateController(contentTypeName, displayName);
      await generateRoutes(contentTypeName, displayName);
      await generateService(contentTypeName, displayName);
      
      // Generate index files for TypeScript
      await generateControllersIndex(contentTypeName, displayName);
      await generateRoutesIndex(contentTypeName, displayName);
      await generateServicesIndex(contentTypeName, displayName);
      await generateIndex(contentTypeName, displayName);
    }
    
    console.log('Content type generation complete!');
    console.log('Generating TypeScript types...');
    
    // Generate TypeScript types using Strapi's built-in command
    try {
      execSync('npm run strapi ts:generate-types', { stdio: 'inherit' });
      console.log('TypeScript types generated successfully!');
    } catch (error) {
      console.error('Failed to generate TypeScript types:', error.message);
      console.log('You may need to install @strapi/typescript-utils:');
      console.log('npm install @strapi/typescript-utils --save-dev');
    }
    
    console.log('\nNext steps:');
    console.log('1. Restart your Strapi server');
    console.log('2. Check the Content-Type Builder to verify your content types');
    console.log('3. Adjust relations and field types as needed');
    
  } catch (error) {
    console.error('Error generating content types:', error);
  } finally {
    await client.end();
  }
};

// Run the script
generateContentTypes();