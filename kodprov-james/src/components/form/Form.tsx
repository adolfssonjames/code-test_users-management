import { useState } from "react";
import { IFormInputs } from "../../types/formTypes";
import { postData } from "../../api/requests";
export default function Form() {
  const [formData, setFormData] = useState<IFormInputs>({
    userId: 1,
    title: "",
    body: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postData(formData)
      .then((response) => {
        // Handle the response from the API
        console.log("Response from the API:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };
  return (
    <div>
      <h2>Login</h2>

      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Username</label>
          <div>
            <input
              type="text"
              placeholder="Your Username (required)"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="body">Password</label>
          <div>
            <input
              type="password"
              placeholder="min 6 characters (required)"
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}
