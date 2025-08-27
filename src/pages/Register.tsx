import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import {
    TextField,
    Button,
    Container,

    Card,
    CardContent,
    Grid, Typography, Select, InputLabel, FormControl, MenuItem, type SelectChangeEvent
} from "@mui/material";
const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        address: "",
        phoneNumber: "",
        dateOfBirth: "",
        role: "USER", // default role
    });

    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e: SelectChangeEvent<string>) => {
        setForm((prev) => ({ ...prev, role: e.target.value }));
    };
    const handleRegister = async () => {
        try {
            await axios.post("/auth/register", form);
            alert("Registration successful");
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        }
    };

    // @ts-ignore
    return (
        <Container maxWidth="sm">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "100vh" }}
            >
                <Card elevation={4} sx={{ width: "100%", p: 3 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Register
                        </Typography>

                        {[
                            "username",
                            "password",
                            "name",
                            "surname",
                            "email",
                            "address",
                            "phoneNumber",
                            "dateOfBirth",
                        ].map((field) => (
                            <TextField
                                key={field}
                                fullWidth
                                margin="normal"
                                name={field}
                                type={
                                    field === "password"
                                        ? "password"
                                        : field === "dateOfBirth"
                                            ? "date"
                                            : "text"
                                }
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                InputLabelProps={
                                    field === "dateOfBirth" ? { shrink: true } : undefined
                                }
                                value={form[field as keyof typeof form]}
                                onChange={handleInputChange}
                            />
                        ))}

                        {/* Role Dropdown */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                value={form.role}
                                label="Role"
                                onChange={handleRoleChange}
                            >
                                <MenuItem value="USER">USER</MenuItem>
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
};

export default Register;