import { useEffect, useState } from "react";

type Status = { message: string };

export function App() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/v1/status")
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then(setStatus)
      .catch(() => setStatus({ message: "API unavailable" }));
  }, []);

  return <main><h1>Service status</h1><p>{status?.message ?? "Loading…"}</p></main>;
}
