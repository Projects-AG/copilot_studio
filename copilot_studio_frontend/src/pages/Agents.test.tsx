import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import Agents from "./Agents";

// Mock localStorage store functions
vi.mock("../store/agents", () => ({
  getAgents: () => [],
  createAgent: vi.fn(),
}));

// Mock Components
vi.mock("../components/layout/Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));

vi.mock("../components/agents/AgentTopbar", () => ({
  default: () => <div>Topbar</div>,
}));

vi.mock("../components/agents/CreateAgentModal", () => ({
  default: () => <div>Create Modal</div>,
}));

vi.mock("../components/agents/EmptyAgents", () => ({
  default: () => <div>Empty Agents Component</div>,
}));

vi.mock("../components/agents/TemplateCard", () => ({
  default: ({ title }: any) => <div>{title}</div>,
}));

vi.mock("../components/agents/AgentCard", () => ({
  default: ({ agent }: any) => <div>{agent.name}</div>,
}));

describe("Agents Page", () => {
  it("renders Agents heading", () => {
    render(
      <BrowserRouter>
        <Agents />
      </BrowserRouter>,
    );

    expect(screen.getByText("Agents")).toBeInTheDocument();
  });

  it("renders Create blank agent button", () => {
    render(
      <BrowserRouter>
        <Agents />
      </BrowserRouter>,
    );

    expect(screen.getByText("+ Create blank agent")).toBeInTheDocument();
  });

  it("renders templates section", () => {
    render(
      <BrowserRouter>
        <Agents />
      </BrowserRouter>,
    );

    expect(screen.getByText("Customer Support")).toBeInTheDocument();

    expect(screen.getByText("Data Analysis")).toBeInTheDocument();

    expect(screen.getByText("Internal Workflow")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(
      <BrowserRouter>
        <Agents />
      </BrowserRouter>,
    );

    expect(screen.getByPlaceholderText("Search agents")).toBeInTheDocument();
  });

  it("shows empty state when no agents exist", () => {
    render(
      <BrowserRouter>
        <Agents />
      </BrowserRouter>,
    );

    expect(screen.getByText("Empty Agents Component")).toBeInTheDocument();
  });
});
