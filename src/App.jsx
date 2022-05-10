import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import ReCAPTCHA from 'react-google-recaptcha'
import './App.css'

const App = () => {
  const [name, setName] = useState('')
  const [recaptcha, setRecaptcha] = useState('')

  const recaptchaRef = React.createRef()

  useEffect(() => {
    if (name && recaptcha) {
      fetch('http://localhost:4000/data/save', {
        method: 'POST',
        headers: {
          Token: recaptcha,
        },
        body: JSON.stringify({name}),
      })
    }
  }, [name, recaptcha])

  const handleSubmit = (e) => {
    e.preventDefault()
    recaptchaRef.current.execute()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
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
            sitekey="6LdssNkfAAAAAOSD5-R6RBsSRu4V_VmsSVpoC7yk"
            onChange={setRecaptcha}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  )
}

export default App
