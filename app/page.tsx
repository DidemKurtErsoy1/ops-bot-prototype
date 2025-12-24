"use client";

import { useState } from "react";

type MockCalendarEvent = {
  title: string;
  start: string;
  end: string;
  attendees: string[];
  notes: string;
};

type JiraPayload = {
  projectKey: string;
  issueType: string;
  summary: string;
  description: string;
  labels: string[];
  custom: Record<string, string>;
};

type WorkflowResponse = {
  ok: boolean;
  event: MockCalendarEvent;
  jiraPayload: JiraPayload;
};

export default function Home() {
  const [data, setData] = useState<WorkflowResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runWorkflow = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/workflow");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = (await response.json()) as WorkflowResponse;
      setData(payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`İstek başarısız: ${message}`);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "40px",
        lineHeight: 1.5,
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>Calendar → Jira workflow</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Mock data kullanarak basit bir demo akışı.
      </p>

      <button
        type="button"
        onClick={runWorkflow}
        disabled={loading}
        style={{
          padding: "10px 16px",
          borderRadius: "6px",
          border: "1px solid #222",
          background: loading ? "#f2f2f2" : "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        {loading ? "Çalıştırılıyor..." : "Workflow çalıştır"}
      </button>

      {error ? (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            borderRadius: "6px",
            background: "#ffecec",
            border: "1px solid #ffb3b3",
            color: "#9b1c1c",
          }}
        >
          {error}
        </div>
      ) : null}

      {data ? (
        <div style={{ marginTop: "24px", display: "grid", gap: "20px" }}>
          <section>
            <h2 style={{ marginBottom: "8px" }}>Mock Calendar Event</h2>
            <pre
              style={{
                background: "#f7f7f7",
                padding: "16px",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(data.event, null, 2)}
            </pre>
          </section>

          <section>
            <h2 style={{ marginBottom: "8px" }}>Jira Payload (paste-ready)</h2>
            <pre
              style={{
                background: "#f7f7f7",
                padding: "16px",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(data.jiraPayload, null, 2)}
            </pre>
          </section>
        </div>
      ) : null}
    </main>
  );
}
