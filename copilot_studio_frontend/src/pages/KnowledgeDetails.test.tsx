import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import KnowledgeDetails from "./KnowledgeDetails";

// Mock Sidebar
vi.mock("../components/layout/Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));

// Mock Topbar
vi.mock("../components/agents/AgentTopbar", () => ({
  default: () => <div>Agent Topbar</div>,
}));

// Mock Test Panel
vi.mock("../components/agents/TestAgentPanel", () => ({
  default: () => <div>Test Agent Panel</div>,
}));

describe("KnowledgeDetails Page", () => {
  const renderPage = () =>
    render(
      <MemoryRouter initialEntries={["/knowledge/123"]}>
        <Routes>
          <Route path="/knowledge/:id" element={<KnowledgeDetails />} />
        </Routes>
      </MemoryRouter>,
    );

  it("renders page title", () => {
    renderPage();

    expect(screen.getByText("Better Health")).toBeInTheDocument();
  });

  it("renders knowledge id from route", () => {
    renderPage();

    expect(screen.getByText("Knowledge ID: 123")).toBeInTheDocument();
  });

  it("renders save button", () => {
    renderPage();

    expect(
      screen.getByRole("button", {
        name: /save/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders knowledge info panel", () => {
    renderPage();

    expect(screen.getByText("Knowledge Info")).toBeInTheDocument();

    expect(screen.getByText("Public Website")).toBeInTheDocument();
  });

  it("renders modified by section", () => {
    renderPage();

    expect(screen.getByText("Admin User")).toBeInTheDocument();
  });

  it("renders status ready", () => {
    renderPage();

    expect(screen.getByText("Ready")).toBeInTheDocument();
  });

  it("renders form fields", () => {
    renderPage();

    expect(screen.getByText("Knowledge Name *")).toBeInTheDocument();

    expect(screen.getByText("Knowledge Description *")).toBeInTheDocument();

    expect(screen.getByText("Website Link *")).toBeInTheDocument();
  });

  it("renders website input values", () => {
    renderPage();

    const inputs = screen.getAllByDisplayValue(
      "https://www.betterhealth.vic.gov.au",
    );

    expect(inputs.length).toBe(2);
  });

  it("renders sidebar", () => {
    renderPage();

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  it("renders test agent panel", () => {
    renderPage();

    expect(screen.getByText("Test Agent Panel")).toBeInTheDocument();
  });
});
