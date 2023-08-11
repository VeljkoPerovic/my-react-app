import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 3 || name.trim().split(" ").length > 1) {
      Swal.fire({
        icon: "error",
        title: "Validation error",
        text: "Ime mora sadrzati minimun tri karaktera i ne sme imati razmaka.",
      });
      return;
    } else if (!email || !question.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation error",
        text: "Molim vas popunite sva polja forme.",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Molim vas unesite validnu email adresu.",
      });
      return;
    }

    setSubmitted(true);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const getFormattedName = (name) => {
    const formattedName =
      name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    if (formattedName.slice(-2) === "ar") {
      return formattedName.slice(0, -2) + "re";
    } else if (
      formattedName.slice(-1) !== "o" &&
      formattedName.slice(-1) !== "i" && // dva nacina za proveru imena :D
      formattedName.charAt(formattedName.length - 1) !== "a" &&
      formattedName.charAt(formattedName.length - 1) !== "u"
    ) {
      return formattedName + "e";
    }

    return formattedName;
  };

  return (
    <Layout>
      <Header />

      <div className="contact-container">
        {submitted ? (
          <div className="thank-you-message">
            <h2>Hvala ti!</h2>
            <p>
              {" "}
              Postovani {getFormattedName(name)}, hvala Vam sto ste se
              zainteresovali za nasu kompaniju.
            </p>
            <p>
              Uspesno si poslao pitanje, ocekuj odgovor u sto kracem periodu na
              "{email}".{" "}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Question:</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <button className="contact-button" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>

      <Footer />
    </Layout>
  );
}
