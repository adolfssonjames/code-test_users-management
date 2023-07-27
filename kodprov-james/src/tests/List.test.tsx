import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import List from "../components/list/List";
import "@testing-library/jest-dom/extend-expect";
import { getUsers } from "../api/requests";
jest.mock("../api/requests", () => ({
  getUsers: jest.fn(() =>
    Promise.resolve({
      data: [
        { id: 1, name: "James Adolfsson", email: "james@mail.com" },
        { id: 2, name: "Kalle Kaviar", email: "kalle@mail.com" },
        { id: 3, name: "Felix Ketchup", email: "felix@mail.com" },
      ],
    })
  ),
}));

beforeEach(() => {
  act(() => {
    render(<List />);
  });
});

test("Component renders with default values", () => {
  const defaultTitle = screen.getByText(/User List/i);
  expect(defaultTitle).toBeInTheDocument();

  const defaultSortSelect = screen.getByLabelText(/Sort by/i);
  expect(defaultSortSelect).toHaveValue("name");

  const defaultSortDirectionButton = screen.getByRole("button", {
    name: /Ascending/i,
  });
  expect(defaultSortDirectionButton).toBeInTheDocument();

  const defaultFilterInput = screen.getByPlaceholderText(/search user/i);
  expect(defaultFilterInput).toHaveValue("");
});

test("Component renders with correct title when sorting by email", () => {
  const sortSelect = screen.getByLabelText(/Sort by/i);
  fireEvent.change(sortSelect, { target: { value: "email" } });

  const sortedTitle = screen.getByText(/Users sorted by Email/i);
  expect(sortedTitle).toBeInTheDocument();
});

test("Component renders with correct title when sorting by name", () => {
  const sortSelect = screen.getByLabelText(/Sort by/i);
  fireEvent.change(sortSelect, { target: { value: "name" } });

  const sortedTitle = screen.getByText(/Users sorted by Name/i);
  expect(sortedTitle).toBeInTheDocument();
});

test("Component renders with correct title when using the filter", () => {
  const filterInput = screen.getByPlaceholderText(/search user/i);
  fireEvent.change(filterInput, { target: { value: "example" } });

  const filteredTitle = screen.getByText(/Filtered Users/i);
  expect(filteredTitle).toBeInTheDocument();
});

test("Component gets data from API endpoint correctly", async () => {
  expect(getUsers).toHaveBeenCalled();

  const userJames = await screen.findByText(/James Adolfsson/i);
  // Check if the rendered data matches the mock data
  expect(userJames).toBeInTheDocument();
});

test("Component renders a list of users with correct names and emails", async () => {
  await screen.findByText(/James Adolfsson/i);
  await screen.findByText(/james@mail.com/i);

  const userName = screen.getByText(/James Adolfsson/i);
  const userEmail = screen.getByText(/james@mail.com/i);

  expect(userName).toBeInTheDocument();
  expect(userEmail).toBeInTheDocument();
});

test("Component sorts users correctly when sortBy and sortDirection being set", async () => {
  const sortSelect = screen.getByLabelText(/Sort by/i);
  fireEvent.change(sortSelect, { target: { value: "name" } });

  // Get the sort direction button using queryAllByTestId to handle multiple elements
  const sortDirectionButtons = screen.queryAllByTestId("sort-direction");
  expect(sortDirectionButtons).toHaveLength(1);
  fireEvent.click(sortDirectionButtons[0]); // Toggle sorting direction to "Descending"

  await waitFor(() => {
    expect(screen.getByText("Felix Ketchup")).toBeInTheDocument();
    expect(screen.getByText("Kalle Kaviar")).toBeInTheDocument();
    expect(screen.getByText("James Adolfsson")).toBeInTheDocument();
  });

  const userElements = screen.getAllByTestId("user-list");

  // Verify that the users are sorted correctly (Descending order based on names)
  expect(userElements[0]).toHaveTextContent("Kalle Kaviar");
  expect(userElements[1]).toHaveTextContent("James Adolfsson");
  expect(userElements[2]).toHaveTextContent("Felix Ketchup");
});
