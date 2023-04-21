import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from '../Components/AddToCart';

const SingleBook = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams(); // Access the :id parameter from the URL

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost/api/book/single.php?id=${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style> */}
            <div class="min-w-screen min-h-screen bg-green-100 flex items-center p-5 lg:p-10 overflow-hidden relative">
                <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                    <div class="md:flex items-center -mx-10">
                        <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                            <div class="relative">
                                <img src={book.cover_image} class="w-full relative z-10" alt=""/>
                                    <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 px-10">
                            <div class="mb-10">
                                <h1 class="font-bold uppercase text-2xl mb-5">{book.title}</h1>
                                <h4 class="text-l font-gray font-bold">Author: {book.author}</h4>
                                <p class="text-sm">{book.details}</p>
                            </div>
                            <div>
                                <div class="inline-block align-bottom mr-5">
                                    <span class="text-2xl leading-none align-baseline">UG </span>
                                    <span class="font-bold text-5xl leading-none align-baseline">{Number(book.price).toLocaleString()}</span>
                                </div>
                                <AddToCart bookId={book.id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;
