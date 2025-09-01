// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookCatalog from "./pages/BookCatalog.tsx";
import Cart from "./pages/Cart";
import MainLayout from "./components/MainLayout";
import BookManagement from "./pages/BookManagement.tsx";

// Protect routes using token
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "ADMIN" ? children : <Navigate to="/" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    {/* Accessible to all logged-in users */}
                    <Route path="/" element={<BookCatalog />} />
                    <Route path="/books" element={<BookCatalog />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Admin-only route */}
                    <Route
                        path="/admin/books"
                        element={
                            <AdminRoute>
                                <BookManagement />
                            </AdminRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
