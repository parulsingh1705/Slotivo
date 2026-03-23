import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DoctorPublic() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const slots = [
        "09:00 AM", "10:00 AM", "11:00 AM",
        "01:00 PM", "02:00 PM", "03:00 PM"
    ];

    useEffect(() => {
        fetch(`http://localhost:5000/api/doctor/${id}`)
            .then(res => res.json())
            .then(data => setDoctor(data));
    }, [id]);

    if (!doctor) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">

            <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

                <h1 className="text-2xl font-bold mb-2">
                    Dr. {doctor.name}
                </h1>

                <p className="text-gray-500 mb-4">
                    {doctor.specialization || "General Physician"}
                </p>

                {/* Slots */}
                <h3 className="mb-2 font-semibold">Select Time</h3>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {slots.map(slot => (
                        <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-2 border rounded ${
                                selectedSlot === slot
                                    ? "bg-blue-600 text-white"
                                    : ""
                            }`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>

                {/* Book Button */}
                <button
                    onClick={() => {
                        if (!selectedSlot) {
                            alert("Select a slot");
                            return;
                        }
                        navigate(`/book/${doctor._id}?time=${selectedSlot}`);
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Book Appointment
                </button>

            </div>

        </div>
    );
}

export default DoctorPublic;