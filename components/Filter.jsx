import React, { useState, useEffect, useRef } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
// import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { useStateContext } from '../context/StateContext'
import FilterDropdown from './FilterDropdown';
const Filter = ({ products }) => {

    const { priceMin, setPriceMin, priceMax, setPriceMax, filteredProducts, filterProductsByCategory, filterProductsByPrice } = useStateContext()


    useEffect(() => {
        // console.log(category)
        filterProductsByCategory('all', products)
        filterProductsByPrice([0, 9999], products)
    }, [])

    const handlePriceMin = (value) => {
        if (!isNaN(Number(value))) {
            setPriceMin(Number(value))
            console.log(priceMin)
        }
    }
    const handlePriceMax = (value) => {
        if (!isNaN(Number(value))) {
            setPriceMax(Number(value))
            console.log(priceMax)
        }
    }

    const handleSubmitPriceRange = (e) => {
        e.preventDefault()
        filterProductsByPrice([priceMin, priceMax], products)
    }

    return (
        <>
            {/* <div className="filter-box">
                <div className="filter-header">
                    <h6>Filter By Category</h6>
                    <AiFillCaretDown size='25px' />
                </div>
                <div className="filter-content">
                    <p onClick={() => filterProductsByCategory('all', products)}><span>All</span></p>
                    <p onClick={() => filterProductsByCategory('guitar', products)}><span>Guitars</span></p>
                    <p onClick={() => filterProductsByCategory('bass', products)}><span>Bass</span></p>
                    <p onClick={() => filterProductsByCategory('synth', products)}><span>Keyboards & Synth</span></p>
                    <p onClick={() => filterProductsByCategory('drum', products)}><span>Drums & Percussion</span></p>
                    <p onClick={() => filterProductsByCategory('accessory', products)}><span>Accessories</span></p>
                </div>
            </div> */}
            <FilterDropdown
                header="Filter By Category"
                content={
                    <>
                        <div className="filter-category">
                            <p onClick={() => filterProductsByCategory('all', products)}><span>All</span></p>
                            <p onClick={() => filterProductsByCategory('guitar', products)}><span>Guitars</span></p>
                            <p onClick={() => filterProductsByCategory('bass', products)}><span>Bass</span></p>
                            <p onClick={() => filterProductsByCategory('synth', products)}><span>Keyboards & Synth</span></p>
                            <p onClick={() => filterProductsByCategory('drum', products)}><span>Drums & Percussion</span></p>
                            <p onClick={() => filterProductsByCategory('accessory', products)}><span>Accessories</span></p>

                        </div>
                    </>
                }

            />
            <FilterDropdown
                header="Filter By Price"
                content={
                    <>
                        <div className="price-filter">
                            <form className='form-inline' onSubmit={handleSubmitPriceRange}>
                                <label>$</label>
                                <input type="text" onChange={(e) => handlePriceMin(e.target.value)} />
                                <label>to</label>
                                <input type="text" onChange={(e) => handlePriceMax(e.target.value)} />
                                <button type='submit'>

                                <AiFillCaretRight size="30px" />
                                </button>
                            </form>
                        </div>
                    </>
                }

            />
        </>
    )
}

export default Filter