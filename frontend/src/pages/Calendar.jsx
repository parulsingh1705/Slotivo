import { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav";

function Calendar() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/appointments", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAppointments(data));
    }, []);

    // group by date
    const grouped = appointments.reduce((acc, curr) => {
        if (!acc[curr.date]) {
            acc[curr.date] = [];
        }
        acc[curr.date].push(curr);
        return acc;
    }, {});

    return (
        <>
        <div className="min-h-screen bg-gray-100 p-6 pb-20">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Appointment Calendar 📅
            </h1>

            {Object.keys(grouped).length === 0 ? (
                <p className="text-center text-gray-500">
                    No appointments yet
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">

                    {Object.keys(grouped).map((date) => (
                        <div
                            key={date}
                            className="bg-white p-5 rounded-xl shadow"
                        >
                            <h2 className="font-bold text-lg mb-3 text-blue-600">
                                {date}
                            </h2>

                            {grouped[date].map((app) => (
                                <div
                                    key={app._id}
                                    className="border p-2 mb-2 rounded"
                                >
                                    <p className="font-semibold">
                                        {app.patientName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ⏰ {app.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            )}
            <MobileNav/>
        </div>
        
        </>
    );
}

export default Calendar;