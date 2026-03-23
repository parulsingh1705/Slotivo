import {BrowserRouter, Routes, Route} from "react-router-dom";

import BookAppointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Signup from "./pages/Signup";
import DoctorProfile from "./pages/DoctorProfile";
import Calendar from "./pages/Calendar";

import "./index.css";


function App(){
  return(
    <BrowserRouter>
      <Routes>\
        <Route path="/" element={<Doctors/>}></Route>
        <Route path="/book/:doctorId" element={<BookAppointment/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/book/:doctorId" element={<Book/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/doctors" element={<Doctors/>}></Route>
        <Route path="/doctor/:id" element={<DoctorProfile/>}></Route>
        <Route path="/calendar" element={<Calendar/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;