/***Sanity Client***/
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: 'production',
  apiVersion: '2022-04-27',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

//sanity images
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
