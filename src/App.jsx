import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [recaptcha, setRecaptcha] = useState("");
  const [sitekey, setSitekey] = useState("");
  const [response, setResponse] = useState("");

  const recaptchaRef = React.createRef();

  useEffect(() => {
    getSitekey();
  }, []);

  useEffect(() => {
    recaptchaRef.current.execute();
  }, [sitekey]);

  const getSitekey = async () => {
    const key = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/data/sitekey`
    ).then((body) => body.text());
    setSitekey(key);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (name && recaptcha) {
        const hello = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/data/save`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Token: recaptcha,
            },
            body: JSON.stringify({ name }),
          }
        ).then((body) => body.text());
        setResponse(hello);
      }
    },
    [name, recaptcha]
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{response || "Hello Vite + React!"}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={sitekey}
            onChange={setRecaptcha}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
};

export default App;
