import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartList = () => {
    const navigate = useNavigate();
    const [carts, setCart] = useState([]);
    const [error, setError] = useState(null);
    // You can set the currently logged-in user ID in state
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getCarts = async () => {
            try {
                const userId = localStorage.getItem('userId');
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


    // async function handleAddToCart(cartId) {
    //     const userId = localStorage.getItem('userId');
    //     if (!userId) {
    //         // If userId is null, display a message asking the user to log in
    //         alert('Please log in first');
    //         navigate('/login');
    //         return;
    //     }

    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await fetch('http://localhost/api/cart/create.php', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}` // Use backticks for string interpolation
    //             },
    //             body: JSON.stringify({
    //                 user_id: userId,
    //                 cart_id: cartId,
    //                 quantity: 1
    //             }),
    //         });
    //         if (response.ok) {
    //             console.log("Cart added to cart successfully!");
    //             console.log(userId);
    //         } else {
    //             throw new Error('Failed to add cart to cart');
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }


    return (
        <div class="items-center justify-center p-12">
            <div class="flex h-full flex-col bg-white shadow-xl">
                <div class="flex-1 px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                        <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">My Shopping cart</h2>
                    </div>

                    <div class="mt-8">
                        <div class="flow-root">
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
                                                    <p className="ml-4">UGX {Number(cart.book_price).toLocaleString()}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Author: {cart.book_author}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty {cart.quantity}</p>

                                                <div className="flex">
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div class="mt-6">
                        <a href="#" class="items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                    </div>
                    <div class="mt-6 flex text-sm text-gray-500">
                        <p>
                            or &nbsp;
                            <Link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList;