import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  
const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/employee',{
      state: {name: '山田太郎',id: '12345',}
    })
  }

  return (
    <>
      <div className="black-banner">

        <h1>居酒屋みどり亭</h1>

      </div>

      <form className="lightgray-banner" onSubmit={handleLogin}>
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
