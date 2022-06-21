import React, { useState, useEffect, useRef } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
// import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { useStateContext } from '../context/StateContext'
const Filter = ({products}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])
    const {category, setCategory, filterProductsByCategory} = useStateContext()

    // useEffect(()=> {
    //     console.log(category)
    //     filterProductsByCategory(category, products)
    // }, [category])

    return (
        <>
        <div className="filter-box">
            <h6>Filter By Category</h6>
            <p onClick={()=>filterProductsByCategory('all', products)}><span>All</span></p>
            <p onClick={()=>filterProductsByCategory('guitar', products)}><span>Guitars</span></p>
            <p onClick={()=>filterProductsByCategory('bass', products)}><span>Bass</span></p>
            <p onClick={()=>filterProductsByCategory('synth', products)}><span>Keyboards & Synth</span></p>
            <p onClick={()=>filterProductsByCategory('drum', products)}><span>Drums & Percussion</span></p>
            <p onClick={()=>filterProductsByCategory('accessory', products)}><span>Accessories</span></p>
        </div>
            

        </>
    )
}

export default Filter