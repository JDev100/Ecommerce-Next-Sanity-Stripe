import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({
  product: {
    image,
    name,
    product_type,
    slug,
    price
  } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <div className="image-wrapper">

            <img src={urlFor(image && image[0])} alt=""
              
            />
          </div>
          <p className='product-name'>{name} {product_type}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product