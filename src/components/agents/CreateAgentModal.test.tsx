import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import CreateAgentModal from "./CreateAgentModal";

describe("CreateAgentModal", () => {
  const onClose = vi.fn();
  const onCreate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when open is false", () => {
    render(
      <CreateAgentModal open={false} onClose={onClose} onCreate={onCreate} />,
    );

    expect(screen.queryByText("Create an agent")).not.toBeInTheDocument();
  });

  it("renders modal when open is true", () => {
    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    expect(screen.getByText("Create an agent")).toBeInTheDocument();
  });

  it("renders name input", () => {
    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    expect(screen.getByPlaceholderText("Enter agent name")).toBeInTheDocument();
  });

  it("renders description textarea", () => {
    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    expect(
      screen.getByPlaceholderText("What should your agent do?"),
    ).toBeInTheDocument();
  });

  it("calls onClose when cancel button clicked", async () => {
    const user = userEvent.setup();

    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("create button is disabled initially", () => {
    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    expect(
      screen.getByRole("button", {
        name: /create/i,
      }),
    ).toBeDisabled();
  });

  it("enables create button when name entered", async () => {
    const user = userEvent.setup();

    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    await user.type(
      screen.getByPlaceholderText("Enter agent name"),
      "Support Agent",
    );

    expect(
      screen.getByRole("button", {
        name: /create/i,
      }),
    ).toBeEnabled();
  });

  it("calls onCreate when create button clicked", async () => {
    const user = userEvent.setup();

    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    await user.type(
      screen.getByPlaceholderText("Enter agent name"),
      "Support Agent",
    );

    await user.click(
      screen.getByRole("button", {
        name: /create/i,
      }),
    );

    expect(onCreate).toHaveBeenCalledWith("Support Agent");
  });

  it("opens settings section", async () => {
    const user = userEvent.setup();

    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    await user.click(screen.getByText("Agent settings (Optional)"));

    expect(
      screen.getByPlaceholderText("Additional instructions..."),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Hi, how can I help you?"),
    ).toBeInTheDocument();
  });

  it("toggles settings section closed", async () => {
    const user = userEvent.setup();

    render(
      <CreateAgentModal open={true} onClose={onClose} onCreate={onCreate} />,
    );

    const settingsButton = screen.getByText("Agent settings (Optional)");

    await user.click(settingsButton);

    expect(
      screen.getByPlaceholderText("Additional instructions..."),
    ).toBeInTheDocument();

    await user.click(settingsButton);

    expect(
      screen.queryByPlaceholderText("Additional instructions..."),
    ).not.toBeInTheDocument();
  });
});
