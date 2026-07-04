// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders the expected breadcrumb trail for a nested route", () => {
    render(
      <MemoryRouter initialEntries={["/menu"]}>
        <Routes>
          <Route path="*" element={<Breadcrumb />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Menu")).toBeTruthy();
  });
});
