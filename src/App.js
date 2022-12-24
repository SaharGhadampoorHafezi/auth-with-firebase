import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Contact, Login, Reset, Register } from "./pages";
import { Header, Footer } from "./components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
