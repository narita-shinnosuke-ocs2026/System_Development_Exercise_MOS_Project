<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <>
      <div className="page-title">
        <h1>居酒屋みどり亭</h1>
      </div>

      <div className="welcome-text">
        <h1>いらっしゃいませ</h1>
        <h2>ボタンをお選びください</h2>
      </div>

      <div className="button-row">
        <Link to="/customer" className="nav-button customer-button">
          お客様用画面へ移行
        </Link>
      </div>

      <Link to="/staff" className="nav-button staff-button">
        スタッフ用画面
      </Link>
>>>>>>> 2958e8c2717a397a16bc49bac5595f11b38e7314
    </>
  )
}

function CustomerPage() {
  return (
    <div className="page-content">
      <h2>お客様用画面</h2>
      <p>こちらからメニューやご注文の確認・操作ができます。</p>

      <Link to="/" className="nav-button back-button">
        トップへ戻る
      </Link>
    </div>
  )
}

function StaffPage() {
  return (
    <div className="page-content">
      <h2>スタッフ用画面</h2>
      <p>スタッフ専用の管理機能へアクセスします。</p>

      <Link to="/" className="nav-button back-button">
        トップへ戻る
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-main">
        <main className="home-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/staff" element={<StaffPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App