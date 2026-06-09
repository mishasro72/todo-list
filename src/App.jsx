import "./App.css";
import Header from "./shared/Header";
import TodosPage from "./pages/TodosPage";
import HomePage from "./pages/HomePage";
// import Logon from "./features/Logon";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  );
}

export default App;
