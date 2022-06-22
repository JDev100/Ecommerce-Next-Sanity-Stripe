import React from 'react'

import { Product, FooterBanner, HeroBanner, Filter } from '../components'
import { client } from '../lib/client';
import { useStateContext } from '../context/StateContext'


const Home = ({ products, bannerData }) => {
  // console.log(products)
  const { filteredProducts } = useStateContext()

  return (
    <div>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-section'>

        <div className='filter-container'>
          <Filter products={products} />
        </div>

        <div className='products-container'>
          {
            // filteredProducts.length < 1 ? (
            //   products?.map((product) => (
            //     <Product key={product._id} product={product} />
            //   ))
            // ) :
            filteredProducts?.map((product) => (
              <Product key={product._id} product={product} />
            ))
          }
        </div>
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props:
      { products, bannerData }
  }
}

export default Home

