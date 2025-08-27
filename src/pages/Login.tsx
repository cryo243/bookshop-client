import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data);
            navigate("/");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <Container maxWidth={false}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "100vh", minWidth: "100vw" }}
            >
                <Card elevation={4} sx={{ minWidth: "30vw", p: 3 }}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <Typography variant="h5" gutterBottom>
                                Login
                            </Typography>
                            <TextField
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="contained" fullWidth onClick={handleLogin}>
                                Login
                            </Button>
                            <Typography variant="body2">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
};

export default Login;
