import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import Auth from "~/routes/auth";

describe("LoginForm", () => {
  it("renders and displays all elements", () => {
    const Stub = createRoutesStub([
      {
        path: "/auth",
        Component: Auth,
        action() {
          return {};
        },
      },
    ]);

    render(<Stub initialEntries={["/auth"]} />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeVisible();

    // expect(screen.getByLabelText(/email address/i)).toBeVisible();
    // expect(screen.getByLabelText(/password/i)).toBeVisible();

    // expect(screen.getByRole("button", { name: /log in/i })).toBeVisible();
  });
});
