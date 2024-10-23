import { Routes, Route } from "react-router-dom";
import About from "./About";
import Appointment from "./Appointment";
import Doctor from "./Doctor";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Page0 = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Hero />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Page0;
