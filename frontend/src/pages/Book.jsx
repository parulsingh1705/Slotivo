import { useState } from "react";
import { useParams } from "react-router-dom";

function Book() {
    const {doctorId} = useParams();
    const [form, setForm] = useState({
        patientName: "",
        phone: "",
        date: "",
        time: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    doctorId
                }),
            });

            const data = await res.json();
            console.log(data);

            if (data.message) {
                alert(data.message);
            } else {
                alert("Appointment Booked ✅");
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Book Appointment
                </h2>

                <input
                    type="text"
                    name="patientName"
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-3 border rounded-lg"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-3 border rounded-lg"
                />

                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-3 border rounded-lg"
                />

                <input
                    type="time"
                    name="time"
                    onChange={handleChange}
                    required
                    className="w-full mb-6 p-3 border rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow hover:scale-105 transition"
                >
                    Book Now
                </button>
            </form>

        </div>
    );
}

export default Book;