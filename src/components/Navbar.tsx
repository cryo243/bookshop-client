import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>BookShop</Link>
                </Typography>
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" onClick={() => navigate("/cart")}>Cart</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                        <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
