import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function BookAppointment() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");

    const { doctorId } = useParams();
    const [searchParams] = useSearchParams();
    const selectedTime = searchParams.get("time");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/api/appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    doctorId,
                    patientName: name,
                    phone,
                    date,
                    time: selectedTime
                })
            });

            const data = await res.json();

            if (data.message) {
                alert(data.message);
            } else {
                alert("Appointment Booked ✅");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4 pb-20">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Book Appointment 🩺
                </h2>

                {/* Selected Slot */}
                <div className="mb-4 p-3 bg-blue-100 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Selected Time</p>
                    <p className="font-bold text-blue-700">{selectedTime}</p>
                </div>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Patient Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Phone */}
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Date */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow hover:scale-105 transition"
                >
                    Confirm Booking 🚀
                </button>
            </form>

        </div>
    );
}

export default BookAppointment;