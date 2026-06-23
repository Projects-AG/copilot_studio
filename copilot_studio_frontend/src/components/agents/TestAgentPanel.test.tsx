import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import TestAgentPanel from "./TestAgentPanel";

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("TestAgentPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
      callback();
      return 0 as any;
    });
  });

  it("renders header", () => {
    render(<TestAgentPanel />);

    expect(screen.getByText("Test your agent")).toBeInTheDocument();
  });

  it("renders welcome message", () => {
    render(<TestAgentPanel />);

    expect(
      screen.getByText(
        "Hi! I'm your Customer Support Agent. How can I help you today?",
      ),
    ).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<TestAgentPanel />);

    expect(
      screen.getByPlaceholderText("Type a message..."),
    ).toBeInTheDocument();
  });

  it("allows typing in input", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  it("does not send empty message", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(
      screen.getByText(
        "Hi! I'm your Customer Support Agent. How can I help you today?",
      ),
    ).toBeInTheDocument();
  });

  it("sends user message", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "Hello");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("clears input after sending", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "Hello");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(input).toHaveValue("");
  });

  it("sends message with Enter key", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "Hello{enter}");

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("returns refund response", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "refund request");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(screen.getByText(/refund within 30 days/i)).toBeInTheDocument();
  });

  it("returns order response", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "track order");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(screen.getByText(/order number/i)).toBeInTheDocument();
  });

  it("returns payment response", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "payment methods");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(
      screen.getByText(/Credit Cards, UPI, and PayPal/i),
    ).toBeInTheDocument();
  });

  it("returns shipping response", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "shipping address");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(screen.getByText(/shipping address/i)).toBeInTheDocument();
  });

  it("returns default response", async () => {
    const user = userEvent.setup();

    render(<TestAgentPanel />);

    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "random question");

    const sendButton = screen.getAllByRole("button")[0];

    await user.click(sendButton);

    expect(screen.getByText(/Thank you for your message/i)).toBeInTheDocument();
  });

  it("calls scrollIntoView", () => {
    render(<TestAgentPanel />);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
