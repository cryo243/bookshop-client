import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import {
    TextField,
    Button,
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import QRCode from "react-qr-code";

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
        role: "USER",
        isUsing2FA: false,
        mfaUri: ""
    });

    const [showQR, setShowQR] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e: any) => {
        setForm((prev) => ({ ...prev, role: e.target.value }));
    };

    const handleMfaToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, isUsing2FA: e.target.checked }));
    };

    const handleRegister = async () => {
        try {
            const res = await axios.post("/auth/register", form);
            if (res.data.using2FA && res.data.mfaUri) {
                setForm((prev) => ({
                    ...prev,
                    mfaUri: res.data.mfaUri,
                }));
                setShowQR(true);
            } else {
                alert("Registration successful");
                navigate("/login");
            }
        } catch (err: any) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
                <Card elevation={4} sx={{ width: "100%", p: 3 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Register
                        </Typography>

                        {!showQR? (<>
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
                                    type={field === "password" ? "password" : field === "dateOfBirth" ? "date" : "text"}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    InputLabelProps={field === "dateOfBirth" ? { shrink: true } : undefined}
                                    value={form[field as keyof typeof form]}
                                    onChange={handleInputChange}
                                />
                            ))}

                            {/* Role Dropdown */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select labelId="role-label" value={form.role} onChange={handleRoleChange}>
                                    <MenuItem value="USER">USER</MenuItem>
                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                </Select>
                            </FormControl>

                            {/* MFA Toggle */}
                            <FormControlLabel
                                control={<Checkbox checked={form.isUsing2FA} onChange={handleMfaToggle} />}
                                label="Enable MFA (Google Authenticator)"
                            />

                            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
                                Register
                            </Button>
                        </>):(<></>)}


                        {showQR && form.mfaUri && (
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <Typography>Scan this QR code in Google Authenticator:</Typography>
                                <QRCode value={form.mfaUri} />
                                <Button sx={{ mt: 1 }} onClick={() => navigate("/login")}>
                                    Proceed to Login
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
};

export default Register;