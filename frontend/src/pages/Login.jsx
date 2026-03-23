import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/doctor/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.token) {
                localStorage.setItem("token", data.token); // 🔥 IMPORTANT
                alert("Login Successful ✅");
                navigate("/dashboard");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Doctor Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 border rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;