import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import KnowledgeTable from "./KnowledgeTable";

// Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("KnowledgeTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Last Modified")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders knowledge records", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    expect(screen.getByText("Better Health")).toBeInTheDocument();

    expect(screen.getByText("Melbourne Pollen")).toBeInTheDocument();
  });

  it("renders knowledge types", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    const types = screen.getAllByText("Public Website");

    expect(types.length).toBeGreaterThan(0);
  });

  it("renders status badges", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    const statuses = screen.getAllByText("Ready");

    expect(statuses.length).toBe(2);
  });

  it("renders filter buttons", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", {
        name: "All",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Public Website",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Files",
      }),
    ).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("Search knowledge")).toBeInTheDocument();
  });

  it("allows typing in search input", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("Search knowledge");

    await user.type(input, "Health");

    expect(input).toHaveValue("Health");
  });

  it("navigates to first knowledge details page", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    await user.click(screen.getByText("Better Health"));

    expect(mockNavigate).toHaveBeenCalledWith("/knowledge/1");
  });

  it("navigates to second knowledge details page", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    await user.click(screen.getByText("Melbourne Pollen"));

    expect(mockNavigate).toHaveBeenCalledWith("/knowledge/2");
  });

  it("renders modification times", () => {
    render(
      <MemoryRouter>
        <KnowledgeTable />
      </MemoryRouter>,
    );

    expect(screen.getByText("2 minutes ago")).toBeInTheDocument();

    expect(screen.getByText("5 minutes ago")).toBeInTheDocument();
  });
});
