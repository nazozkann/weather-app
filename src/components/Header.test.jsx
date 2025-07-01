/* global jest, describe, test, expect */
import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

jest.mock("../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("../hooks/useCities", () => ({
  useCities: () => ({
    addCity: jest.fn(),
    cities: [],
    selectedCity: null,
  }),
}));

jest.mock("../services/weatherAPI");

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </MemoryRouter>
  );
};

describe("Header Component", () => {
  test("renders app title", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/meteoly/i)).toBeInTheDocument();
  });

  test("renders search bar", () => {
    renderWithProviders(<Header />);
    expect(screen.getByPlaceholderText(/search city/i)).toBeInTheDocument();
  });

  test("renders theme toggle button", () => {
    renderWithProviders(<Header />);
    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
  });
});
