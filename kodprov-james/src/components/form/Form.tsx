import { useState } from "react";
import { IFormInputs } from "../../types/formTypes";
import { postData } from "../../api/requests";
import "./formStyle.scss";
export default function Form() {
  const [formData, setFormData] = useState<IFormInputs>({
    userId: 1,
    title: "",
    body: "",
  });
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
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
    if (formData.body.length < 6 || !formData.title) {
      setValidationMessage(
        "Username is required. Password should be at least 6 characters."
      );
      setSuccessMessage("");
    } else {
      postData(formData)
        .then((response) => {
          console.log("Response from the API:", response.data);
          setValidationMessage("");
          setSuccessMessage("Post successfully created and sent!");

          setFormData({
            userId: 1,
            title: "",
            body: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {successMessage && <p style={{ color: "#646cff" }}>{successMessage}</p>}
      {validationMessage && (
        <p style={{ color: "#d4281c" }}>{validationMessage}</p>
      )}
      <section className="form-wrapper">
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
            />
          </div>
          <div>
            <button className="sumbit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
