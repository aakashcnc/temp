import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="container">
            Opps Page Not Found

            <Link to="/">Go to Home</Link>
        </div>
    );
}