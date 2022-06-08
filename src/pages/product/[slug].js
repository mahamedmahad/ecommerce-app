import React from 'react'

import { urlFor, client } from '../../lib/client'

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product

  // console.log(product)

  return (
    <div className='product-detail-container'>
      <div>
        <div className='image-container'>
          <img src={urlFor(image && image[0])} />
        </div>
      </div>
    </div>
  )
}

// pages/product/[slug].js
export async function getStaticPaths() {
  const query = `*[_type == "product"] {
    slug {
      current
    }

  }`

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type =="product" && slug.current == "${slug}"][0]`

  // similaar products
  const productsQuery = `*[_type == "product"]`

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

export default ProductDetails
