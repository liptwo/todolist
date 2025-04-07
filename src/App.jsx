import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginAndRegister/LoginPage";
import CreateNote from "./components/Main/CreateNote";
import Header from "./components/Main/Header";
import ListNotes from "./components/Main/ListNotes";
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import RegisterPage from "./components/LoginAndRegister/RegisterPage";
import EditProfilePage from "./components/Main/EditProfile";

// Tạo PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Tạo PublicRoute để ngăn user đã đăng nhập truy cập trang login
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
};

// Tạo một component con để sử dụng useNavigate
const FavouritePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <button 
          className="absolute  hover:text-blue-400 px-4 py-2 flex items-center gap-2 transition-colors"
          onClick={() => navigate('/')}
        >
          <span>←</span> Quay lại
        </button>
        <ListNotes favourite={true} />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <SearchProvider>
          <Routes>
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } 
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-100">
                    <Header />
                    <div className="container mx-auto px-4 py-8">
                      <CreateNote />
                      <ListNotes favourite={false} />
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
            <Route 
              path="/favourite" 
              element={
                <PrivateRoute>
                  <FavouritePage />
                </PrivateRoute>
              } 
            />
          </Routes> 
        </SearchProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
