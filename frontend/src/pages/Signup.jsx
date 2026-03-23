import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        clinicName: "",
        specialization: "",
        phone: "",
        address: ""
    });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/doctor/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        alert(data.message);

        if (data.message === "Signup successful") {
            navigate("/login");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow-lg w-[400px] space-y-3">

                <h2 className="text-xl font-bold text-center">Doctor Signup</h2>

                <input placeholder="Name" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />

                <input placeholder="Email" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />

                <input type="password" placeholder="Password" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />

                <input placeholder="Clinic Name" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })} />

                <input placeholder="Specialization" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })} />

                <input placeholder="Phone" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />

                <input placeholder="Address" className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, address: e.target.value })} />

                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Signup
                </button>

            </form>
        </div>
    );
}

export default Signup;