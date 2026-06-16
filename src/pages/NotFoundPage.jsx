import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div>
      <main className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-6 bg-surface body-md text-on-surface min-h-screen items-center">
        <h1 className="headline-lg text-primary-container-light">
          {" "}
          Error 404: Page not found
        </h1>
        <Link
          to="/"
          className="body-md text-on-primary-fixed-variant transition-colors rounded-md hover:bg-surface-container hover:text-on-surface hover:underline hover:underline-offset-3"
        >
          &laquo; Back to main page{" "}
        </Link>
      </main>
    </div>
  );
}
