import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import MobileNav from "../components/MobileNav";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/doctors")
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, []);

    if (doctors.length === 0) {
        return (
            <p className="text-center mt-20 text-gray-500">
                No doctors available 🚀
            </p>
        );
    }

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 pb-20">

            <h1 className="text-3xl font-bold text-center mb-8">
                Find Your Doctor 👨‍⚕️
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {doctors.map((doc) => (
                    <Card key={doc._id}>

                        {/* Doctor Info */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">
                                {doc.name}
                            </h2>

                            <p className="text-gray-500">
                                {doc.specialization || "General"}
                            </p>

                            <p className="text-sm text-gray-400">
                                📍 {doc.city || "Not specified"}
                            </p>
                        </div>

                        {/* Button */}
                        <Button
                            type="gradient"
                            onClick={() => navigate(`/doctor/${doc._id}`)}
                        >
                            View Profile →
                        </Button>

                    </Card>
                ))}

            </div>
            <MobileNav/>
        </div>
        
        </>
    );
}

export default Doctors;