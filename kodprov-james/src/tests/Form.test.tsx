import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "../components/form/Form";
import { postData } from "../api/requests";
jest.mock("../api/requests", () => ({
  postData: jest.fn().mockResolvedValue({ data: { postId: 99 } }),
}));

test("component renders correctly", () => {
  const { getByText, getByLabelText } = render(<Form />);

  const usernameInput = getByLabelText("Username");
  const passwordInput = getByLabelText("Password");
  const submitButton = getByText("Submit");

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("Form component sends form data correctly on submit", async () => {
  const { getByLabelText, getByText } = render(<Form />);

  // Get form inputs
  const usernameInput = getByLabelText("Username");
  const passwordInput = getByLabelText("Password");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);

  // Wait for api call
  await waitFor(() => expect(postData).toHaveBeenCalledTimes(1));

  expect(postData).toHaveBeenCalledWith({
    userId: 1,
    title: "testuser",
    body: "testpassword",
  });
});
