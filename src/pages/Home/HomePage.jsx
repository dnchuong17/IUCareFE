import Navbar from "../../components/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Appointment from "./Appointment.jsx";
import Footer from "../../components/Footer.jsx";

const HomePage = () => {
  return (
      <div>
          <div>
              <div className="relative overflow-hidden">
                  <div
                      className="bg-[#4cbcd831] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]"/>

                  <div
                      className="bg-[#6285c25b] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"/>
                  <div className="flex flex-col h-screen ">

                      <Navbar/>
                      <Routes>
                          <Route path="/" element={<Home/>}/>
                          <Route path="/about" element={<About/>}/>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/appointment" element={<Appointment/>}/>
                      </Routes>

                  </div>
                  <Footer/>
              </div>
          </div>
      </div>
  );
};

export default HomePage;
