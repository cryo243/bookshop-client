// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import Cart from "./pages/Cart";
import MainLayout from "./components/MainLayout";

// Protect routes using token
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Shared layout with protected routes */}
                <Route
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/" element={<BookList />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
