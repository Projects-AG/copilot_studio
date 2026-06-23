import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AddKnowledgeModal from "./AddKnowledgeModal";

describe("AddKnowledgeModal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when open is false", () => {
    render(<AddKnowledgeModal open={false} onClose={onClose} />);

    expect(screen.queryByText("Add Knowledge")).not.toBeInTheDocument();
  });

  it("renders modal when open is true", () => {
    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    expect(screen.getByText("Add Knowledge")).toBeInTheDocument();
  });

  it("renders source cards", () => {
    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    expect(screen.getByText("Public Website")).toBeInTheDocument();

    expect(screen.getByText("SharePoint")).toBeInTheDocument();

    expect(screen.getByText("Database")).toBeInTheDocument();
  });

  it("renders website form fields", () => {
    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    expect(screen.getByPlaceholderText("Website name")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("https://example.com"),
    ).toBeInTheDocument();
  });

  it("updates knowledge name", async () => {
    const user = userEvent.setup();

    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    const input = screen.getByPlaceholderText("Website name");

    await user.type(input, "Health Knowledge");

    expect(input).toHaveValue("Health Knowledge");
  });

  it("updates description", async () => {
    const user = userEvent.setup();

    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    const textarea = screen.getByPlaceholderText("Description");

    await user.type(textarea, "Medical knowledge source");

    expect(textarea).toHaveValue("Medical knowledge source");
  });

  it("updates website url", async () => {
    const user = userEvent.setup();

    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    const input = screen.getByPlaceholderText("https://example.com");

    await user.type(input, "https://health.com");

    expect(input).toHaveValue("https://health.com");
  });

  it("calls onClose when X button clicked", async () => {
    const user = userEvent.setup();

    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Cancel clicked", async () => {
    const user = userEvent.setup();

    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders upload section", () => {
    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    expect(screen.getByText("Upload Files")).toBeInTheDocument();

    expect(screen.getByText("Drag and drop a file here")).toBeInTheDocument();
  });

  it("renders save button", () => {
    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    expect(
      screen.getByRole("button", {
        name: /save/i,
      }),
    ).toBeInTheDocument();
  });

  it("switches source selection", async () => {
    const user = userEvent.setup();

    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    await user.click(screen.getByText("Public Website"));

    expect(screen.getByText("Public Website")).toBeInTheDocument();
  });

  it("renders featured and advanced tabs", () => {
    render(<AddKnowledgeModal open={true} onClose={onClose} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();

    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });
});
