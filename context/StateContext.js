import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0.00)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    const [category, setCategory] = useState('all')

    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(9999)
    const [priceRange, setPriceRange] = useState([0, 9999])
    const [filteredProducts, setFilteredProducts] = useState([])

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id == product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    /**Recieves filter value and creates a product array containing established category */
    const filterProductsByCategory = async (filter, products) => {
        console.log(products)
        setCategory(filter)
        if (filter == 'all') {
            setFilteredProducts(products)
        }
        else {
            setFilteredProducts(products.filter((item) => item.product_type == filter))
        }
        console.log(filteredProducts)
    }

    /**Recieves a price range and filters products to an array within that range */
    const filterProductsByPrice = async (priceRange, products) => {
        if (priceRange[0] > priceRange[1])
            return
        if (category == 'all') {
            const priceFilter = products.filter((item) => (item.price >= priceRange[0] && item.price <= priceRange[1]))
            // console.log( products.filter((item) => (item.price >= priceRange[0] && item.price <= priceRange[1])).length)
            // const test =  products.filter((item) => (item.price >= priceRange[0] && item.price <= priceRange[1])).length
            setFilteredProducts((priceFilter == products ? [] : priceFilter))

        }
        else {
            console.log('poop')
            const clone = products
            const categoryFilter = products.filter((item) => item.product_type == category)
            // setFilteredProducts(clone.filter((item) => (item.price >= priceRange[0] && item.price <= priceRange[1])))

            const priceFilter = categoryFilter.filter((item) => (item.price >= priceRange[0] && item.price <= priceRange[1]))
            setFilteredProducts((priceFilter == categoryFilter ? [] : priceFilter))

        }
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            const old = cartItems[index]
            const clone = [...cartItems]
            clone[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 }
            setCartItems(clone)
            // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                const old = cartItems[index]
                const clone = [...cartItems]
                clone[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 }
                setCartItems(clone)
                // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }

    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }


    return (
        <Context.Provider
            value={{
                category,
                setCategory,
                filteredProducts,
                setFilteredProducts,
                priceMin,
                setPriceMin,
                priceMax,
                setPriceMax,
                priceRange,
                setPriceRange,
                filterProductsByCategory,
                filterProductsByPrice,
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)