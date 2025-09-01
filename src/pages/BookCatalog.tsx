import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import type { Book } from "../models/Book";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

const BookCatalog = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBookIds, setSelectedBookIds] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksRes, cartRes] = await Promise.all([
                    axios.get("/books"),
                    axios.get("/carts"),
                ]);

                setBooks(booksRes.data);
                const cartBookIds = cartRes.data.books.map((b: Book) => b.id);
                setSelectedBookIds(cartBookIds);
            } catch (err) {
                console.error("Failed to load data", err);
            }
        };

        fetchData();
    }, []);

    const toggleBookSelection = async (bookId: number) => {
        const isAlreadySelected = selectedBookIds.includes(bookId);

        if (isAlreadySelected) {
            try {
                await axios.delete(`/carts/remove/${bookId}`);
                setSelectedBookIds((prev) => prev.filter((id) => id !== bookId));
            } catch {
                alert("Failed to remove from cart.");
            }
        } else {
            try {
                await axios.post(`/carts/add/${bookId}`);
                setSelectedBookIds((prev) => [...prev, bookId]);
            } catch {
                alert("Please log in to add to cart");
            }
        }
    };

    return (
        <Card elevation={4}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Browse Books
                </Typography>
                <Grid container spacing={2}>
                    {books.map((book) => {
                        const isSelected = selectedBookIds.includes(book.id);
                        return (
                            <Grid item xs={12} sm={6} md={4} key={book.id}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        backgroundColor: isSelected ? "#e8f5e9" : "inherit",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => toggleBookSelection(book.id)}
                                >
                                    <CardContent>
                                        <Typography variant="h6">{book.title}</Typography>
                                        <Typography>Author: {book.author}</Typography>
                                        <Typography>Year: {book.year}</Typography>
                                        <Typography>Price: {book.price}€</Typography>
                                        <Typography>In store: {book.copies}</Typography>
                                        <Button
                                            variant="contained"
                                            color={isSelected ? "success" : "primary"}
                                            sx={{ mt: 1 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleBookSelection(book.id);
                                            }}
                                        >
                                            {isSelected ? "Selected" : "Add to Cart"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                {books.length > 0 && (
                    <Box textAlign="center" mt={4}>
                        <Button variant="contained" onClick={() => navigate("/cart")}>
                            Go to Cart / Checkout
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default BookCatalog;
