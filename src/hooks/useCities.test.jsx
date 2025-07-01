/* eslint-env jest */
import { renderHook, act } from "@testing-library/react";
import { expect, describe, beforeEach, test, jest } from "@jest/globals";
import React from "react";

const mockState = {
  cities: [],
  selectedCity: null,
};

jest.mock("../services/weatherAPI");

import { useCities } from "./useCities";

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useCities Hook", () => {
  beforeEach(() => {
    mockState.cities = [];
    mockState.selectedCity = null;
    jest.clearAllMocks();
  });

  test("should initialize with empty cities array", () => {
    const { result } = renderHook(() => useCities());

    expect(result.current.cities).toEqual([]);
    expect(result.current.selectedCity).toBe(null);
  });

  test("should add a city", () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.addCity("London");
    });

    expect(result.current.cities).toEqual(["London"]);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "meteoly-cities",
      JSON.stringify(["London"])
    );
  });

  test("should not add duplicate city", () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.addCity("London");
      result.current.addCity("London");
    });

    expect(result.current.cities).toEqual(["London"]);
  });

  test("should remove a city", () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.addCity("London");
      result.current.addCity("Paris");
      result.current.removeCity("London");
    });

    expect(result.current.cities).toEqual(["Paris"]);
  });

  test("should set selected city", () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.addCity("London");
      result.current.setSelectedCity("London");
    });

    expect(result.current.selectedCity).toBe("London");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "meteoly-selected-city",
      "London"
    );
  });
});
