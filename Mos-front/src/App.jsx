import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <>
        <div className="black-banner">

          <h1>居酒屋みどり亭</h1>

        </div>

        <form className="lightgray-banner">
    <div className="input-group">
      <input type="text" placeholder="ID" />
    </div>
    <div className="input-group">
      <input type="password" placeholder="Password" />
    </div>
    <div className="form-actions">
    <button type="submit" className="login-button">ログイン</button>
    </div>
  </form>
    </>
  )
}

export default App
