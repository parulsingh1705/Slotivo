function Button({ children, onClick, type = "primary" }) {
    return (
        <button
            onClick={onClick}
            className={`btn ${type === "gradient" ? "btn-gradient" : "btn-primary"}`}
        >
            {children}
        </button>
    );
}

export default Button;