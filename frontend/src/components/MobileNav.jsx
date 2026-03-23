import { useNavigate } from "react-router-dom";

function MobileNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 md:hidden z-50">

      <button onClick={() => navigate("/home")}>🏠</button>

      <button onClick={() => navigate("/doctors")}>👨‍⚕️</button>

      <button onClick={() => navigate("/calendar")}>📅</button>

      <button onClick={() => navigate("/dashboard")}>📊</button>

    </div>
  );
}

export default MobileNav;