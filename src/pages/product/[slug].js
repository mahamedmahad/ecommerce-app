import React, { useState } from 'react'

import { urlFor, client } from '../../lib/client'

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai'

import { Product } from '../../components'

//import state context
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product

  const [index, setIndex] = useState(0)

  const { decQty, incQty, qty, onAddCart } = useStateContext()

  return (
    <>
      <div>
        <div className='product-detail-container'>
          <div>
            <div className='image-container'>
              <img
                src={urlFor(image && image[index])}
                className='product-detail-image'
              />
            </div>

            <div className='small-images-container'>
              {image?.map((item, i) => (
                <img
                  src={urlFor(item)}
                  key={i}
                  className={
                    i === index ? 'small-image selected-image' : 'small-image'
                  }
                  // onMouseEnter={() => setIndex(i)}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>

              <p>(20)</p>
            </div>
            <h4>Details:</h4>
            <p>{details}</p>
            <p className='price'>${price}</p>

            {/* quantity */}
            <div className='quantity'>
              <h3>Quantity</h3>
              <p className='quantity-desc'>
                <span className='minus' onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className='num'>{qty}</span>
                <span className='plus' onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>

            <div className='buttons'>
              <button
                type='button'
                className='add-to-cart'
                onClick={() => onAddCart(product, qty)}
              >
                Add to Cart
              </button>
              <button type='button' className='buy-now'>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* similar products */}
        <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='marquee'>
            <div className='maylike-products-container track'>
              {products?.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
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

  //single product
  const product = await client.fetch(query)
  //multiple products
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

export default ProductDetails
