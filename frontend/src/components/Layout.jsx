import { useState } from "react";

function Layout({ children }) {

    const [dark, setDark] = useState(false);

    return (
        <div className={dark ? "dark" : ""}>

            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

                {/* Sidebar */}
                <div className="w-64 bg-blue-700 dark:bg-gray-800 text-white p-5">
                    <h2 className="text-2xl font-bold mb-8">Doctor Panel</h2>

                    <ul className="space-y-4">
                        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">Dashboard</li>
                        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">Appointments</li>
                        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">Patients</li>
                        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">Logout</li>
                    </ul>
                </div>

                {/* Main */}
                <div className="flex-1">

                    {/* Navbar */}
                    <div className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">

                        <input
                            type="text"
                            placeholder="Search..."
                            className="border p-2 rounded w-1/3"
                        />

                        <div className="flex gap-4 items-center">

                            <button className="text-xl">🔔</button>

                            <button
                                onClick={() => setDark(!dark)}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >
                                {dark ? "Light ☀️" : "Dark 🌙"}
                            </button>

                        </div>

                    </div>

                    {/* Content */}
                    <div className="p-6 text-gray-900 dark:text-white">
                        {children}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Layout;