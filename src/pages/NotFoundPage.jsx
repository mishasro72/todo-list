import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div>
      <h1 style={{ color: "blue" }}>Error 404: Page not found</h1>
      <Link to="/">Back to main page </Link>
    </div>
  );
}
