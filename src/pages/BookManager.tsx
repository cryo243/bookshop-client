import {useEffect, useState} from "react";
import type {Book} from "../models/Book.ts";
import axios from "../api/axiosInstance.ts";

const BookManager =  () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState<Book>({
        id: 0,
        title: "",
        author: "",
        year: new Date().getFullYear(),
        price: 0,
        copies: 1,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksRes = await axios.get("/books");
                setBooks(booksRes.data);
                // const cartBookIds = cartRes.data.books.map((b: Book) => b.id);
                // setSelectedBookIds(cartBookIds);
            } catch (err) {
                console.error("Failed to load data", err);
            }
        };
        fetchData();

    }, []);

    const handleAddBook = () => {
        setBooks([...books, { ...newBook, id: Date.now() }]);
        setNewBook({ id: 0, title: "", author: "", year: new Date().getFullYear(), price: 0, copies: 1 });
    };

    const handleDeleteBook = (id: number) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Admin Book Manager</h2>

            {/* Add Book Form */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={newBook.year}
                    onChange={(e) => setNewBook({ ...newBook, year: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Copies"
                    value={newBook.copies}
                    onChange={(e) => setNewBook({ ...newBook, copies: Number(e.target.value) })}
                />
                <button onClick={handleAddBook}>Add Book</button>
            </div>

            {/* Book List */}
            <ul>
                {books.map((book) => (
                    <li key={book.id} className="flex justify-between items-center mb-2">
                        {book.title} ({book.copies} copies)
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export  default BookManager;