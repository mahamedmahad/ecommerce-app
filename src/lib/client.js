/***Sanity Client***/

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.NEXT_SANIY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-04-01',
    useCdn: true,
    token: process.env.NEXT_APP_SANITY_TOKEN
})


//sanity images
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)