import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import AgentDetails from "./AgentDetails";

// Mock agent store
vi.mock("../store/agents", () => ({
  getAgentById: vi.fn((id: string) => ({
    id,
    name: "Support Agent",
    description: "Customer Support Bot",
  })),
}));

// Mock components
vi.mock("../components/layout/Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));

vi.mock("../components/agents/AgentTopbar", () => ({
  default: () => <div>Agent Topbar</div>,
}));

vi.mock("../components/agents/TopicsSection", () => ({
  default: () => <div>Topics Section</div>,
}));

vi.mock("../components/agents/SuggestedPrompts", () => ({
  default: () => <div>Suggested Prompts</div>,
}));

vi.mock("../components/agents/TestAgentPanel", () => ({
  default: () => <div>Test Agent Panel</div>,
}));

describe("AgentDetails Page", () => {
  const renderPage = () =>
    render(
      <MemoryRouter initialEntries={["/agents/123"]}>
        <Routes>
          <Route path="/agents/:id" element={<AgentDetails />} />
        </Routes>
      </MemoryRouter>,
    );

  it("renders agent name", () => {
    renderPage();

    expect(screen.getByText("Support Agent")).toBeInTheDocument();
  });

  it("renders agent id", () => {
    renderPage();

    expect(screen.getByText("Agent ID: 123")).toBeInTheDocument();
  });

  it("renders edit button", () => {
    renderPage();

    expect(
      screen.getByRole("button", {
        name: /edit/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders success banner", () => {
    renderPage();

    expect(
      screen.getByText("Your agent has been provisioned successfully."),
    ).toBeInTheDocument();
  });

  it("renders details section", () => {
    renderPage();

    expect(screen.getByText("Details")).toBeInTheDocument();

    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("renders topics section", () => {
    renderPage();

    expect(screen.getByText("Topics Section")).toBeInTheDocument();
  });

  it("renders suggested prompts", () => {
    renderPage();

    expect(screen.getByText("Suggested Prompts")).toBeInTheDocument();
  });

  it("renders test panel", () => {
    renderPage();

    expect(screen.getByText("Test Agent Panel")).toBeInTheDocument();
  });

  it("renders sidebar", () => {
    renderPage();

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  it("renders topbar", () => {
    renderPage();

    expect(screen.getByText("Agent Topbar")).toBeInTheDocument();
  });
});
