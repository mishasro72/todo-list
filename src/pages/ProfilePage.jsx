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
        // const userName = data?.tasks?.[0]?.User?.name || "User";

        setStatistics({
          total,
          completed,
          active,
          completionPercentage,
        //   userName,
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
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>User profile page</h1>
      {isLoading && <p>Loading statistics...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {statistics && !isLoading && !error && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "15px",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              alignItems: "center",
            }}
          >
            <h2>{`${email}'s todo statistic:`}</h2>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Total</h3>

            <p style={{ fontSize: "24px", margin: 0, fontWeight: "bold" }}>
              {statistics.total}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Active</h3>

            <p style={{ fontSize: "24px", margin: 0, fontWeight: "bold" }}>
              {statistics.active}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Completed</h3>

            <p style={{ fontSize: "24px", margin: 0, fontWeight: "bold" }}>
              {statistics.completed}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3>Completion Percentage </h3>

            <p style={{ fontSize: "24px", margin: 0, fontWeight: "bold" }}>
              {statistics.completionPercentage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
