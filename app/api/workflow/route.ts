import { NextResponse } from "next/server";

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

export async function GET() {
  const event: MockCalendarEvent = {
    title: "Ops Sync: Release Readiness",
    start: "2024-06-18T10:00:00+03:00",
    end: "2024-06-18T10:45:00+03:00",
    attendees: ["selin@example.com", "mert@example.com", "ops@example.com"],
    notes:
      "Discuss release checklist, follow-up on incident action items, and assign Jira tasks.",
  };

  const jiraPayload: JiraPayload = {
    projectKey: "OPS",
    issueType: "Task",
    summary: `Calendar follow-up: ${event.title}`,
    description: `Meeting scheduled from ${event.start} to ${event.end} with ${event.attendees.join(
      ", "
    )}.\n\nNotes:\n${event.notes}`,
    labels: ["calendar", "workflow", "mock"],
    custom: {
      source: "calendar-mock",
      priority: "Medium",
    },
  };

  return NextResponse.json({ ok: true, event, jiraPayload });
}
