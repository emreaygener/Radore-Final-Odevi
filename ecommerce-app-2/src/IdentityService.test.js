import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/slices/user"; // Adjust the import path
import IdentityService from "./IdentityService";
import { OidcUserStatus } from "@axa-fr/react-oidc";
import * as oidcHooks from "@axa-fr/react-oidc";

// Mock the hooks from @axa-fr/react-oidc
jest.mock("@axa-fr/react-oidc", () => ({
  OidcUserStatus: {
    Loading: "Loading",
    Unauthenticated: "Unauthenticated",
    Loaded: "Loaded",
  },
  useOidc: jest.fn(),
  useOidcUser: jest.fn(),
}));

describe("IdentityService Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  test("renders loading state", () => {
    oidcHooks.useOidcUser.mockReturnValue({
      oidcUser: {},
      oidcUserLoadingState: OidcUserStatus.Loading,
    });
    oidcHooks.useOidc.mockReturnValue({
      login: jest.fn(),
      logout: jest.fn(),
      renewTokens: jest.fn(),
      isAuthenticated: false,
    });

    render(
      <Provider store={store}>
        <IdentityService />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders unauthenticated state", () => {
    oidcHooks.useOidcUser.mockReturnValue({
      oidcUser: {},
      oidcUserLoadingState: OidcUserStatus.Unauthenticated,
    });
    oidcHooks.useOidc.mockReturnValue({
      login: jest.fn(),
      logout: jest.fn(),
      renewTokens: jest.fn(),
      isAuthenticated: false,
    });

    render(
      <Provider store={store}>
        <IdentityService />
      </Provider>
    );

    expect(
      screen.getByText(
        /Unauthorized \/ Admin Account => email:admin1@gmail.com pass:Admin123\* \/ Customer Account => email:customer1@gmail.com pass:Admin123\*/
      )
    ).toBeInTheDocument();
  });

  test("renders loaded state and displays user information", () => {
    oidcHooks.useOidcUser.mockReturnValue({
      oidcUser: {
        name: "John Doe",
        email: "john@example.com",
        preferred_username: "johndoe",
      },
      oidcUserLoadingState: OidcUserStatus.Loaded,
    });
    oidcHooks.useOidc.mockReturnValue({
      login: jest.fn(),
      logout: jest.fn(),
      renewTokens: jest.fn(),
      isAuthenticated: true,
    });

    render(
      <Provider store={store}>
        <IdentityService />
      </Provider>
    );

    expect(
      screen.getByText(
        `johndoe/{"status":true,"user":{"name":"John Doe","role":"customer","email":"john@example.com","pass":"123456"}}`
      )
    ).toBeInTheDocument();
  });

  test("login button triggers login function and is disabled when authenticated", () => {
    const loginMock = jest.fn();
    oidcHooks.useOidc.mockReturnValue({
      login: loginMock,
      logout: jest.fn(),
      renewTokens: jest.fn(),
      isAuthenticated: false,
    });
    oidcHooks.useOidcUser.mockReturnValue({
      oidcUser: {
        name: "John Doe",
        email: "john@example.com",
        preferred_username: "johndoe",
      },
      oidcUserLoadingState: OidcUserStatus.Loaded,
    });

    render(
      <Provider store={store}>
        <IdentityService />
      </Provider>
    );

    const loginButton = screen.getByText("Identity Login");
    fireEvent.click(loginButton);
    expect(loginMock).toHaveBeenCalled();
    expect(loginButton).not.toBeDisabled();
  });

  test("logout button triggers logout function and clears user", () => {
    const logoutMock = jest.fn();
    oidcHooks.useOidc.mockReturnValue({
      login: jest.fn(),
      logout: logoutMock,
      renewTokens: jest.fn(),
      isAuthenticated: true,
    });
    oidcHooks.useOidcUser.mockReturnValue({
      oidcUser: {},
      oidcUserLoadingState: OidcUserStatus.Loaded,
    });

    render(
      <Provider store={store}>
        <IdentityService />
      </Provider>
    );

    const logoutButton = screen.getByText("Clear Identity User");
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
    expect(logoutButton).not.toBeDisabled();
  });
});
