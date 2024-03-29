import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartList = () => {
    const navigate = useNavigate();
    const [carts, setCart] = useState([]);
    const [error, setError] = useState(null);
    // You can set the currently logged-in user ID in state
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const getCarts = async () => {
            try {

                const response = await fetch(`http://localhost/api/cart/index.php?user=${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch carts");
                }
                const data = await response.json();
                setCart(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getCarts();
    }, []);

    const calculateSubtotal = () => {
        let total = 0;
        carts.forEach((cart) => {
            total += Number(cart.book_price) * cart.quantity;
        });
        return total;
    }

    async function removeFromCart(cartId) {
        const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
        if (!confirmed) {
            return; // If user cancels the removal, do nothing
        }
        const token = localStorage.getItem('token');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost/api/cart/delete.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use backticks for string interpolation
                },
                body: JSON.stringify({
                    id: cartId
                }),
            });
            if (response.ok) {
                alert("Book removed from cart successfully!");
                window.location.reload();
            } else {
                throw new Error('Failed to remove book from cart');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // Function to handle checkout
    const handleCheckout = async () => {
        const token = localStorage.getItem('token');

        // Create an array of promises for all the fetch requests
        const fetchPromises = carts.map(async (cart) => {
            const response = await fetch('http://localhost/api/order/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    book_id: cart.book_id,
                    status: "processing"
                }),
            });

            return response;
        });

        // Wait for all promises to resolve
        const responses = await Promise.all(fetchPromises);

        // Check if all responses are okay
        const allResponsesOk = responses.every(response => response.ok);

        if (allResponsesOk) {
            // If order creation is successful, redirect to order success page
            window.alert("Successfully placed an order!");
            // set total cart to 0
            localStorage.setItem("cartsTotal", 0);

            window.location.reload();
        } else {
            // If order creation fails, show an error message
            const errorResponses = responses.filter(response => !response.ok);
            const errorData = await Promise.all(errorResponses.map(response => response.json()));
            const errorMessages = errorData.map(data => data.message);
            setError(errorMessages);
        }
    }


    if (localStorage.getItem('token')) {
        if (carts.length > 0) {
            return (
                <div className="items-center justify-center p-12">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                        <div className="flex-1 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {carts.map((cart) => (
                                            <li key={cart.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img src={cart.book_cover} alt={cart.book_title} className="h-full w-full object-cover object-center" />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#">Title: {cart.book_title}</a>
                                                            </h3>
                                                            <p className="ml-4">UG {Number(cart.book_price).toLocaleString()}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">Author: {cart.book_author}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">Qty {cart.quantity}</p>

                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeFromCart(cart.id)}>Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>UG {calculateSubtotal().toLocaleString()}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <button type="button" className="items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={handleCheckout}>Checkout</button>
                            </div>
                            <div className="mt-6 flex text-sm text-gray-500">
                                <p>
                                    or &nbsp;
                                    <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="items-center justify-center p-12">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                        <div className="flex-1 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-center">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">No item in cart</h2>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        navigate('/login')
        return null
    }
};

export default CartList;