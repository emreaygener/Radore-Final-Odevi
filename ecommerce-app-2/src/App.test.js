import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "./App";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockStore = configureMockStore();

jest.mock("p-min-delay", () => {
  return (importPromise) => importPromise;
});

jest.mock("@axa-fr/react-oidc", () => ({
  useOidcFetch: () => ({
    fetch: jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            result: [],
          }),
      })
    ),
  }),
}));

let store;

beforeEach(() => {
  store = mockStore({
    user: {
      status: "loggedOut",
      user: null,
    },
    products: [],
  });
  fetchMock.resetMocks();
});

test("fetches and dispatches product data", async () => {
  const mockProducts = {
    result: [
      {
        productId: 1,
        categoryName: "Electronics",
        imageUrl: "/img/product1.jpg",
        name: "Product 1",
        price: 100,
        description: "Description 1",
      },
      {
        productId: 2,
        categoryName: "Clothing",
        imageUrl: "/img/product2.jpg",
        name: "Product 2",
        price: 200,
        description: "Description 2",
      },
    ],
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockProducts));

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => {
    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0]).toHaveProperty("type", "products/GetProducts");
    expect(actions[0]).toHaveProperty("payload");
  });
});
