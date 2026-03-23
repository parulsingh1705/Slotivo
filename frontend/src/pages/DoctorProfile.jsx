import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DoctorProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookedSlots, setBookedSlots] = useState([]);

    const slots = [
        "09:00 AM", "10:00 AM", "11:00 AM",
        "01:00 PM", "02:00 PM", "03:00 PM",
    ];

    useEffect(() => {
        fetch(`http://localhost:5000/api/doctors`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(d => d._id === id);
                setDoctor(found);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/appointments`)
            .then(res => res.json())
            .then(data => {
                // filter by doctor
                const filtered = data.filter(a => a.doctorId === id);

                // get booked times
                const times = filtered.map(a => a.time);

                setBookedSlots(times);
            });
    }, [id]);

    if (!doctor) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 flex justify-center">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl">
                        {doctor.name.charAt(0)}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">{doctor.name}</h2>
                        <p className="text-gray-500">{doctor.specialization || "General"}</p>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-gray-700">
                    <p>📍 City: {doctor.city || "Not specified"}</p>
                    <p>📞 Phone: {doctor.phone || "Not available"}</p>
                    <p>📧 Email: {doctor.email}</p>
                </div>

                {/* Action */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Select Time Slot ⏰</h3>

                    <div className="grid grid-cols-3 gap-3">
                        {slots.map((slot) => {
                            const isBooked = bookedSlots.includes(slot);

                            return (
                                <button
                                    key={slot}
                                    disabled={isBooked}
                                    onClick={() => !isBooked && setSelectedSlot(slot)}
                                    className={`p-2 rounded-lg border ${isBooked
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : selectedSlot === slot
                                                ? "bg-blue-600 text-white"
                                                : "bg-white hover:bg-blue-100"
                                        }`}
                                >
                                    {slot} {isBooked && "❌"}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (!selectedSlot) {
                            alert("Please select a slot");
                            return;
                        }
                        navigate(`/book/${doctor._id}?time=${selectedSlot}`);
                    }}
                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow hover:scale-105 transition"
                >
                    Book Appointment
                </button>

            </div>

        </div>
    );
}

export default DoctorProfile;