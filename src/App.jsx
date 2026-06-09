import "./App.css";
import Header from "./shared/Header";
import TodosPage from "./features/Todos/TodosPage";
import HomePage from "./pages/HomePage";
import Logon from "./features/Logon";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
