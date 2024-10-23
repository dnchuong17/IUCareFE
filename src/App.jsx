import { Routes, Route } from "react-router-dom";
{
  /* import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
*/
}

import Page0 from "./pages/Page0/Page0"; // Import Page0
import Page1 from "./pages/Page1/Page1"; // Import Page1
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div>
      <div className="bg-[#E6EDF5] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]"></div>
      <div className="bg-[#6285c25b] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/*     <Navbar /> */}
        <Routes>
          {/*
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/*" element={<Page0 />} />
          <Route path="/page1/*" element={<Page1 />} /> {/* Add route for Page1 
          */}
          <Route
            path="/*"
            element={
              <>
                <Page0 />
              </>
            }
          />
          <Route path="/page1/*" element={<Page1 />} />{" "}
          {/* Add route for Page1 */}
        </Routes>
        {/*       <Footer /> */}
      </div>
    </div>
  );
};

export default App;
