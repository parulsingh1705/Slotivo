import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import MobileNav from "../components/MobileNav";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pb-20">

                {/* 🔥 HERO SECTION */}
                <div className="flex flex-col items-center justify-center text-center px-6 py-20">

                    <motion.h1
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Book Doctor Appointments
                        <span className="text-blue-600"> Instantly</span>
                    </motion.h1>

                    <p className="text-gray-600 text-lg mb-8 max-w-xl">
                        Find trusted doctors, select your time slot, and book appointments in seconds.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => navigate("/doctors")}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
                        >
                            Book Appointment 🚀
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="bg-white border px-6 py-3 rounded-xl shadow hover:bg-gray-100"
                        >
                            Doctor Login
                        </button>
                    </div>

                </div>

                {/* 🔥 FEATURES */}
                <div className="px-6 pb-16">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Choose Us?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">⚡ Instant Booking</h3>
                            <p className="text-gray-600">
                                Book appointments in seconds without any hassle.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">⏰ Smart Slots</h3>
                            <p className="text-gray-600">
                                Choose available time slots easily.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">📅 Calendar View</h3>
                            <p className="text-gray-600">
                                Manage all appointments in one place.
                            </p>
                        </div>

                    </div>

                </div>

                {/* States */}
                <div className="grid grid-cols-3 text-center mt-16">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-600">1000+</h2>
                        <p className="text-gray-600">Appointments</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-purple-600">150+</h2>
                        <p className="text-gray-600">Doctors</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-green-600">4.9★</h2>
                        <p className="text-gray-600">Rating</p>
                    </div>
                </div>

                <div className="px-6 py-16 bg-white">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        What Users Say 💬
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="p-5 rounded-xl shadow">
                            <p>"Super fast booking! Loved it."</p>
                            <h4 className="mt-2 font-semibold">- Riya</h4>
                        </div>

                        <div className="p-5 rounded-xl shadow">
                            <p>"Very smooth experience."</p>
                            <h4 className="mt-2 font-semibold">- Aman</h4>
                        </div>

                        <div className="p-5 rounded-xl shadow">
                            <p>"Best doctor booking app."</p>
                            <h4 className="mt-2 font-semibold">- Rahul</h4>
                        </div>

                    </div>
                </div>

                {/* 🔥 CTA */}
                <div className="text-center pb-20">

                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Book Your Appointment?
                    </h2>

                    <button
                        onClick={() => navigate("/doctors")}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:scale-105 transition"
                    >
                        Get Started 🚀
                    </button>

                </div>

                <MobileNav/>

            </div>

            
        </>
    );
}

export default Home;