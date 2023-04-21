import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import AddtoCart from '../Components/AddToCart';

const BooksList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [filter, setFilter] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [isLoading, setIsLoading] = useState(true); // Added loading state


    useEffect(() => {
        const getBooks = async () => {
            try {
                setIsLoading(true); // Set loading state to true while fetching data
                const response = await fetch('http://localhost/api/book/index.php');
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                const data = await response.json();
                setBooks(data);
                setFilteredBooks(data);
                setIsLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                setError(error.message);
                setIsLoading(false); // Set loading state to false after error occurs
            }
        };

        getBooks();
    }, []);

    const handleFilterChange = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setFilter(inputValue);

        if (inputValue === '') {
            setFilteredBooks(books);
        } else {
            const filteredBooks = [];
            for (const book of books) {
                const title = book.title.toLowerCase();
                const author = book.author.toLowerCase();
                if (title.includes(inputValue) || author.includes(inputValue)) {
                    filteredBooks.push(book);
                }
            }
            setFilteredBooks(filteredBooks);
        }
    };

    return (
        
        <div>
            <div className="p-4">
                <div className="bg-grey col-12 mt-3 flex justify-center items-center">
                    <label htmlFor="filterInput" className="mr-2">Search: </label>
                    <input
                        type="text"
                        placeholder="Search by title, author, or keyword..."
                        value={filter}
                        onChange={handleFilterChange}
                        id="filterInput"
                        className="block mb-4 px-4 py-2 w-1/2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center p-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                                >
                                    <Link to={`/book/${book.id}`}><img
                                        className="h-56 lg:h-60 w-full object-cover"
                                        src={book.cover_image}
                                        alt=""
                                    /></Link>
                                    <div className="p-4">
                                        <h1 className="text-gray-900 font-bold text-xl"><Link to={`/book/${book.id}`}>{book.title}</Link></h1>
                                        <p className="mt-2 text-gray-600 text-sm">Author: {book.author}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <h1 className="text-gray-6 font-bold text-l">
                                                UG {Number(book.price).toLocaleString()}
                                            </h1>
                                            <AddtoCart bookId={book.id}/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div class="items-center justify-center p-12 w-full">
                                <div class="flex h-full flex-col bg-white shadow-xl">
                                    <div class="flex-1 px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-center">
                                            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">No books to list</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );

};

export default BooksList;


