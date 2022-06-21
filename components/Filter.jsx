import React, { useState, useEffect, useRef } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
// import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

    return (
        <>
            <h6>Filter By Category</h6>
            <span>Guitars</span>
            <span>Bass</span>
            <span>Keyboards & Synth</span>
            <span>Drums & Percussion</span>
            <span>Accessories</span>
            

        </>
    )
}

export default Filter