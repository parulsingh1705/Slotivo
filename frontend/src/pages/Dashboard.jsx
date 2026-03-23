import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import MobileNav from "../components/MobileNav";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:5000/api/appointments", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setAppointments(Array.isArray(data) ? data : []);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
    }, []);

    const safeAppointments = Array.isArray(appointments) ? appointments : [];

    const filteredAppointments = safeAppointments.filter(app =>
        app.patientName?.toLowerCase().includes(search.toLowerCase())
    );

    const completed = safeAppointments.filter(a => a.status === "completed").length;
    const pending = safeAppointments.filter(a => a.status === "booked").length;
    const cancelled = safeAppointments.filter(a => a.status === "cancelled").length;

    // 📊 Chart Data
    const dataByDate = {};

    safeAppointments.forEach(app => {
        if (!dataByDate[app.date]) {
            dataByDate[app.date] = 0;
        }
        dataByDate[app.date]++;
    });

    const chartData = Object.keys(dataByDate).map(date => ({
        date,
        count: dataByDate[date]
    }));

    const statusData = [
        { name: "Completed", value: completed },
        { name: "Pending", value: pending },
        { name: "Cancelled", value: cancelled }
    ];

    const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

    // 📅 Date format
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const updateStatus = async (id, status) => {
        try {
            await fetch(`http://localhost:5000/api/appointment/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            setAppointments(prev =>
                prev.map(app =>
                    app._id === id ? { ...app, status } : app
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <div className="flex min-h-screen bg-gray-100 pb-20">

            {/* Sidebar */}
            <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white p-6 z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300`}>
                <h2 className="text-2xl font-bold mb-6">Slotivo</h2>

                <ul className="space-y-3">
                    <li className="bg-white text-blue-700 p-2 rounded">📊 Dashboard</li>
                    <li onClick={() => navigate("/calendar")} className="cursor-pointer">📅 Calendar</li>
                    <li onClick={handleLogout} className="cursor-pointer">🚪 Logout</li>
                </ul>
            </div>

            {/* Main */}
            <div className="flex-1 p-6">

                <div className="md:hidden flex justify-between items-center mb-4">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="bg-blue-600 text-white px-3 py-2 rounded"
                    >
                        ☰
                    </button>

                    <h1 className="font-bold">Dashboard</h1>
                </div>

                {/* Search */}
                <div className="flex justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search patient..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded-lg w-full md:w-1/3"
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3>Total</h3>
                        <p className="text-2xl font-bold">{safeAppointments.length}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-green-600">Completed</h3>
                        <p className="text-2xl font-bold">{completed}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-red-600">Pending</h3>
                        <p className="text-2xl font-bold">{pending}</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="mb-2 font-semibold">Appointments per Day</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="mb-2 font-semibold">Status</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={statusData} dataKey="value" outerRadius={80} label>
                                    {statusData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* Appointments */}
                {filteredAppointments.length === 0 ? (
                    <p className="text-gray-500 text-center">No appointments found 🚀</p>
                ) : (
                    filteredAppointments.map((app) => (
                        <div
                            key={app._id}
                            className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between items-center hover:shadow-xl transition"
                        >
                            <div>
                                <p className="font-bold">{app.patientName}</p>
                                <p className="text-gray-500">
                                    {formatDate(app.date)} • {app.time}
                                </p>

                                <span className={`text-xs px-2 py-1 rounded ${app.status === "completed"
                                    ? "bg-green-100 text-green-600"
                                    : app.status === "cancelled"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-blue-100 text-blue-600"
                                    }`}>
                                    {app.status}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateStatus(app._id, "completed")}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    ✔
                                </button>

                                <button
                                    onClick={() => updateStatus(app._id, "cancelled")}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    ✖
                                </button>
                            </div>
                        </div>
                    ))
                )}

            </div>
            <MobileNav/>
        </div>
        
        </>
    );
}

export default Dashboard;