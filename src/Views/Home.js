import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BooksList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    // You can set the currently logged-in user ID in state
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch('http://localhost/api/book/index.php');
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getBooks();
    }, []);


    async function handleAddToCart(bookId) {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            // If userId is null, display a message asking the user to log in
            alert('Please log in first');
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost/api/cart/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use backticks for string interpolation
                },
                body: JSON.stringify({
                    user_id: userId,
                    book_id: bookId,
                    quantity: 1
                }),
            });
            if (response.ok) {
                console.log("Book added to cart successfully!");
                console.log(userId);
            } else {
                throw new Error('Failed to add book to cart');
            }
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center p-12">
            {error ? (
                <p>Error: {error}</p>
            ) : (
                books.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <img
                            className="h-56 lg:h-60 w-full object-cover"
                            src={book.cover_image}
                            alt=""
                        />
                        <div className="p-4">
                            <h1 className="text-gray-900 font-bold text-xl">{book.title}</h1>
                            <p className="mt-2 text-gray-600 text-sm">Author: {book.author}</p>
                            <div className="flex items-center justify-between mt-3">
                                <h1 className="text-gray-6 font-bold text-l">
                                    UG {Number(book.price).toLocaleString()}
                                </h1>
                                <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={() => handleAddToCart(book.id)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default BooksList;
