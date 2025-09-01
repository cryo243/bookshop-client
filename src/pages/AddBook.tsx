import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [copies, setCopies] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await axios.post("/books", {
                title,
                author,
                year: parseInt(year),
                price: parseFloat(price),
                copies: parseInt(copies),
            });
            alert("Book added successfully!");
            navigate("/");
        } catch (err) {
            alert("Failed to add book.");
        }
    };

    return (
        <Card elevation={4}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Add a New Book
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <TextField label="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                    <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <TextField label="Copies" type="number" value={copies} onChange={(e) => setCopies(e.target.value)} />
                    <Button variant="contained" onClick={handleSubmit}>
                        Save Book
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddBook;
