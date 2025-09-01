import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import type { Book } from "../models/Book";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const BookManagement = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [open, setOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState<Book>({
        title: "",
        author: "",
        year: new Date().getFullYear(),
        price: 0,
        copies: 0,
    });

    const fetchBooks = async () => {
        try {
            const res = await axios.get("/books");
            setBooks(res.data);
        } catch {
            alert("Failed to fetch books");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleOpen = (book?: Book) => {
        if (book) {
            setEditingBook(book);
            setFormData(book);
        } else {
            setEditingBook(null);
            setFormData({ title: "", author: "", year: new Date().getFullYear(), price: 0, copies: 0 });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (editingBook) {
                await axios.put(`/books/${editingBook.id}`, formData);
            } else {
                await axios.post("/books", formData);
            }
            fetchBooks();
            handleClose();
        } catch {
            alert("Failed to save book");
        }
    };

    const handleDelete = async (id?: number) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await axios.delete(`/books/${id}`);
            fetchBooks();
        } catch {
            alert("Failed to delete book");
        }
    };

    return (
        <Card elevation={4}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Book Management</Typography>
                    <Button variant="contained" onClick={() => handleOpen()}>
                        + Add Book
                    </Button>
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{book.title}</Typography>
                                    <Typography>Author: {book.author}</Typography>
                                    <Typography>Year: {book.year}</Typography>
                                    <Typography>Price: {book.price}€</Typography>
                                    <Typography>In store: {book.copies}</Typography>
                                    <Box mt={1} display="flex" gap={1}>
                                        <IconButton onClick={() => handleOpen(book)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(book?.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>

            {/* Add/Edit Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="author"
                        label="Author"
                        fullWidth
                        value={formData.author}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        type="number"
                        label="Year"
                        fullWidth
                        value={formData.year}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        type="number"
                        label="Price"
                        fullWidth
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="copies"
                        type="number"
                        label="Copies"
                        fullWidth
                        value={formData.copies}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingBook ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default BookManagement;
