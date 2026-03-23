import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow">

            {/* Logo */}
            <h1 
                onClick={() => navigate("/")}
                className="text-2xl font-bold cursor-pointer"
            >
                <span className="text-blue-600">Slot</span>
                <span className="text-purple-600">ivo</span>
            </h1>

            {/* Buttons */}
            <div className="hidden md:flex gap-4">
                <button onClick={() => navigate("/doctors")}>
                    Doctors
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Navbar;