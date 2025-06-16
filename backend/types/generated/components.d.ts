import type { Schema, Struct } from '@strapi/strapi';

export interface ContentContent extends Struct.ComponentSchema {
  collectionName: 'components_content_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    header: Schema.Attribute.String;
    theses: Schema.Attribute.Text;
  };
}

export interface FeaturesFeatures extends Struct.ComponentSchema {
  collectionName: 'components_features_features';
  info: {
    displayName: 'features';
  };
  attributes: {
    features: Schema.Attribute.String;
  };
}

export interface LinkLink extends Struct.ComponentSchema {
  collectionName: 'components_link_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    epicGames: Schema.Attribute.String;
    steam: Schema.Attribute.String;
    website: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface LinksLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    displayName: 'links';
  };
  attributes: {};
}

export interface SharedApproaches extends Struct.ComponentSchema {
  collectionName: 'components_shared_approaches';
  info: {
    displayName: 'approaches';
  };
  attributes: {
    description: Schema.Attribute.Text;
    step: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface SharedValues extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    displayName: 'values';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ThesesTheses extends Struct.ComponentSchema {
  collectionName: 'components_theses_theses';
  info: {
    displayName: 'theses';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.content': ContentContent;
      'features.features': FeaturesFeatures;
      'link.link': LinkLink;
      'links.links': LinksLinks;
      'shared.approaches': SharedApproaches;
      'shared.values': SharedValues;
      'theses.theses': ThesesTheses;
    }
  }
}
