// src/components/MainLayout.tsx
import {Link, Outlet, useNavigate} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
} from "@mui/material";

const MainLayout = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left side */}
                    <Typography variant="h6">BookShop</Typography>

                    {/* Middle navigation */}
                    <Box>
                        <Button color="inherit" component={Link} to="/books">
                            Books
                        </Button>
                        <Button color="inherit" component={Link} to="/cart">
                            Cart
                        </Button>
                        {role === "ADMIN" && (
                            <Button color="inherit" component={Link} to="/admin/books">
                                Manage Books
                            </Button>
                        )}
                    </Box>

                    {/* Right side */}
                    <Box>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Content Area */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100vh - 64px)", // subtract AppBar height
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ minWidth: "80vw" }}>
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </>
    );
};


export default MainLayout;
