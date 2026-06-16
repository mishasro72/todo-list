import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { email, token } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        setError(null);
        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };
        const paramsObject = {
          limit: 100,
          page: 1,
        };

        const params = new URLSearchParams(paramsObject);
        const response = await fetch(`/api/tasks?${params}`, options);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          const errorText = await response.json();
          throw new Error(errorText.message);
        }
        const data = await response.json();

        const allTasks = data.tasks || [];
        const total = allTasks.length;
        const completed = allTasks.filter((task) => task.isCompleted).length;
        const active = total - completed;
        let completionPercentage = 0;
        if (total > 0) {
          completionPercentage = Math.round((completed / total) * 100);
        }

        setStatistics({
          total,
          completed,
          active,
          completionPercentage,
        });
      } catch (error) {
        setError(`Error: ${error.name} | ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
      fetchTodos();
    }
  }, [token]);

  return (
    <>
      <main className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-12 bg-surface body-md text-on-surface min-h-screen">
        <section className="mb-10">
          <h1 className="headline-md text-on-surface-variant mb-1">
            User profile page
          </h1>
          <div className="flex-col items-center gap-4 mt-6 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">
              {`Welcome back, ${email}`}
            </h2>
            <p className="text-on-surface-variant body-md">
              Task Master &amp; Productivity Enthusiast
            </p>
          </div>
        </section>

        <div>
          {isLoading && (
            <p className="headline-lg text-primary-container-light">
              Loading statistics...
            </p>
          )}
          {error && (
            <p className="body-sm font-semibold text-on-error-container m-0">
              {error}
            </p>
          )}
          {statistics && !isLoading && !error && (
            <>
              <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="body-md-bold text-on-surface-variant">{`${email}'s todo statistic:`}</h2>
                </div>
                <div className="flex gap-2 flex-col md:flex-row">
                  <div className="flex-1 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:border-primary-light transition-all duration-300 flex flex-col items-center text-center">
                    <h3 className="text-on-surface-variant body-sm mb-3">
                      Total
                    </h3>
                    <span className="body-md-bold text-primary-light tracking-tight">
                      {statistics.total}
                    </span>
                    <div className="mt-4 w-8 h-1 bg-primary-light/20 rounded-full"></div>
                  </div>

                  <div className="flex-1 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:border-primary-light transition-all duration-300 flex flex-col items-center text-center">
                    <h3 className="text-on-surface-variant body-sm mb-3">
                      Active
                    </h3>
                    <span className="body-md-bold text-primary-light tracking-tight">
                      {statistics.active}
                    </span>
                    <div className="mt-4 w-8 h-1 bg-primary-light/20 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:border-primary-light transition-all duration-300 flex flex-col items-center text-center">
                    <h3 className="text-on-surface-variant body-sm mb-3">
                      Completed
                    </h3>
                    <span className="body-md-bold text-primary-light tracking-tight">
                      {statistics.completed}
                    </span>
                    <div className="mt-4 w-8 h-1 bg-primary-light/20 rounded-full"></div>
                  </div>
                </div>
              </section>
              <div className="bg-primary-container-light text-on-primary-container-light p-6 rounded-xl border border-primary-light shadow-lg flex flex-col items-center text-center relative overflow-hidden md:col-span-2 lg:col-span-1">
                <span className="body-md-bold uppercase tracking-widest mb-4 opacity-90">
                  Completion Rate
                </span>
                <div className="relative flex items-center justify-center w-32 h-32 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      className="stroke-white/20"
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      strokeWidth="3"
                    ></circle>
                    <circle
                      className="stroke-white"
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      strokeDasharray={`${statistics.completionPercentage}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="headline-lg">{`${statistics.completionPercentage}%`}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-white animate-pulse mt-1"
                      fill="none"
                    >
                      <title>Stars SVG Icon</title>
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m17.8 19.817l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411zm-11.6 0l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411zm5.8-10l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="body-md text-inverse-on-surface opacity-80">
                  {statistics.completionPercentage >= 90
                    ? "Elite Performance Level!"
                    : "Keep it up!"}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
