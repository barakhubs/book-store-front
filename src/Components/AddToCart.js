import React from 'react';
import { useNavigate } from "react-router-dom";

const AddToCart = ({ bookId }) => {
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            alert('Please log in first');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost/api/cart/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    book_id: bookId,
                    quantity: 1
                }),
            });
            if (response.ok) {
                alert("Book added to cart successfully!");
                window.location.reload();
                // Update cart total in local storage
                if (localStorage.getItem('cartsTotal')) {
                    const cartsTotal = parseInt(localStorage.getItem('cartsTotal')) + 1;
                    localStorage.setItem('cartsTotal', cartsTotal);
                } else {
                    localStorage.setItem('cartsTotal', 1);
                }
            } else {
                throw new Error('Failed to add book to cart');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <button className="px-3 py-2 bg-indigo-500 text-white font-semibold rounded-md"
            onClick={handleAddToCart}
        >
            Add to Cart
        </button>
    );
}

export default AddToCart;
