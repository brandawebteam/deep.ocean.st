import { ParamValue } from "next/dist/server/request/params";

export async function fetchApiData(name: string): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${name}?populate=*`, {
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    cache: 'no-store'
  })
  console.log(res)

  if (!res.ok) {
    throw new Error("Failed to fetch" + name + " data")
  }

  const data = await res.json();
  return Promise.resolve(data.data)
}

export async function fetchApiDataById(name: string, id: number): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${name}?filters[id][$eq]=${id}&populate=*`, {
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch about page data")
  }

  const data = await res.json();
  console.log(data)
  return Promise.resolve(data.data[0])
}