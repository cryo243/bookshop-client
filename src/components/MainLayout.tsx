// src/components/MainLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">BookShop</Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Centering starts here */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100vh - 64px)", // subtract AppBar height
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            minWidth: "80vw",
                        }}
                    >
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default MainLayout;
