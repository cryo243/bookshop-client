import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mfaCode, setMfaCode] = useState("");
    const [mfaRequired, setMfaRequired] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("/auth/login", { username, password });

            if (res.data.mfaRequired) {
                setMfaRequired(true);
            } else {
                // MFA not required → store token and continue
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                navigate("/");
            }
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    const handleVerifyMfa = async () => {
        try {
            const res = await axios.post("/auth/verify-mfa", { username, code: parseInt(mfaCode) });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            navigate("/");
        } catch (err) {
            alert("Invalid MFA code");
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

                            {/* Step 1: Username + Password */}
                            {!mfaRequired && (
                                <>
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
                                        Don't have an account?{" "}
                                        <Link to="/register">Register here</Link>
                                    </Typography>
                                </>
                            )}

                            {/* Step 2: MFA */}
                            {mfaRequired && (
                                <>
                                    <Typography>
                                        Enter the 6-digit code from your Google Authenticator app:
                                    </Typography>
                                    <TextField
                                        label="MFA Code"
                                        fullWidth
                                        value={mfaCode}
                                        onChange={(e) => setMfaCode(e.target.value)}
                                    />
                                    <Button variant="contained" fullWidth onClick={handleVerifyMfa}>
                                        Verify
                                    </Button>
                                </>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
};

export default Login;
