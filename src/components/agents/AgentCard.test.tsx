import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import AgentCard from "./AgentCard";

// Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AgentCard", () => {
  const mockAgent = {
    id: "123",
    name: "Support Agent",
    description: "Customer support bot",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders agent name", () => {
    render(
      <MemoryRouter>
        <AgentCard agent={mockAgent} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Support Agent")).toBeInTheDocument();
  });

  it("renders agent description", () => {
    render(
      <MemoryRouter>
        <AgentCard agent={mockAgent} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Customer support bot")).toBeInTheDocument();
  });

  it("navigates to agent details page on click", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AgentCard agent={mockAgent} />
      </MemoryRouter>,
    );

    await user.click(screen.getByText("Support Agent"));

    expect(mockNavigate).toHaveBeenCalledWith("/agents/123");
  });

  it("renders bot icon container", () => {
    const { container } = render(
      <MemoryRouter>
        <AgentCard agent={mockAgent} />
      </MemoryRouter>,
    );

    const iconContainer = container.querySelector(".bg-\\[\\#eef2ff\\]");

    expect(iconContainer).toBeInTheDocument();
  });
});
