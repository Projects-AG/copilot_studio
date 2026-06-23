import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import Knowledge from "./Knowledge";

// Mock Sidebar
vi.mock("../components/layout/Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));

// Mock Header
vi.mock("../components/knowledge/KnowledgeHeader", () => ({
  default: ({ onAdd }: any) => (
    <div>
      Knowledge Header
      <button onClick={onAdd}>Add Knowledge</button>
    </div>
  ),
}));

// Mock Table
vi.mock("../components/knowledge/KnowledgeTable", () => ({
  default: () => <div>Knowledge Table</div>,
}));

// Mock Test Agent Panel
vi.mock("../components/agents/TestAgentPanel", () => ({
  default: () => <div>Test Agent Panel</div>,
}));

// Mock Modal
vi.mock("../components/knowledge/AddKnowledgeModal", () => ({
  default: ({ open }: any) => (open ? <div>Add Knowledge Modal</div> : null),
}));

describe("Knowledge Page", () => {
  it("renders sidebar", () => {
    render(
      <BrowserRouter>
        <Knowledge />
      </BrowserRouter>,
    );

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  it("renders knowledge header", () => {
    render(
      <BrowserRouter>
        <Knowledge />
      </BrowserRouter>,
    );

    expect(screen.getByText("Knowledge Header")).toBeInTheDocument();
  });

  it("renders knowledge table", () => {
    render(
      <BrowserRouter>
        <Knowledge />
      </BrowserRouter>,
    );

    expect(screen.getByText("Knowledge Table")).toBeInTheDocument();
  });

  it("renders test agent panel", () => {
    render(
      <BrowserRouter>
        <Knowledge />
      </BrowserRouter>,
    );

    expect(screen.getByText("Test Agent Panel")).toBeInTheDocument();
  });

  //   it("opens add knowledge modal when button clicked", async () => {
  //     const { user } = await import("@testing-library/user-event");

  //     render(
  //       <BrowserRouter>
  //         <Knowledge />
  //       </BrowserRouter>,
  //     );

  //     await user.click(screen.getByText("Add Knowledge"));

  //     expect(screen.getByText("Add Knowledge Modal")).toBeInTheDocument();
  //   });
});
