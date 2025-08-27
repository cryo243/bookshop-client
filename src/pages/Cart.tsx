import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import type {Cart as CartModel} from "../models/Cart";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";

const Cart = () => {
    const [cart, setCart] = useState<CartModel | null>(null);
    const navigate = useNavigate();

    const fetchCart = async () => {
        const res = await axios.get("/carts");
        setCart(res.data);
    };

    const handleCheckout = async () => {
        try {
            await axios.post("/carts/checkout");
            alert("Order confirmed!");
            navigate("/");
        } catch {
            alert("Checkout failed.");
        }
    };

    const handleRemove = async (bookId: number) => {
        await axios.delete(`/carts/remove/${bookId}`);
        fetchCart();
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const total = cart?.books.reduce((sum, b) => sum + b.price, 0) || 0;

    return (
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Your Cart</Typography>
                    <List>
                        {cart?.books.map((book) => (
                            <ListItem
                                key={book.id}
                                secondaryAction={
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemove(book.id)}
                                    >
                                        Remove
                                    </Button>
                                }
                            >
                                <ListItemText primary={`${book.title} - ${book.price}€`} />

                            </ListItem>
                        ))}
                    </List>
                    <Box mt={2} mr={2}>
                        <Typography variant="h6">Total: {total.toFixed(2)}€</Typography>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={!cart || cart.books.length === 0}
                            onClick={handleCheckout}
                        >
                            Confirm Order
                        </Button>
                    </Box>

                </CardContent>
            </Card>
    );
};

export default Cart;
