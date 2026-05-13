import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from './auth'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [role, setRole] = useState('staff') // staff / manager

  const canSubmit = useMemo(() => id.trim() && pw.trim(), [id, pw])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!canSubmit) return

    // ※ここは本来 API で認証して返ってくる値
    const user = {
      name: role === 'manager' ? '店長 太郎' : '山田 太郎',
      id: id.trim(),
      role,
    }

    setUser(user) // リロード/直打ち対策
    navigate('/employee', { state: user })
  }

  return (
    <>
      <div className="blackBanner">
        <h1>居酒屋みどり亭</h1>
      </div>

      <form className="loginCard" onSubmit={handleLogin}>
        <div className="loginTitle">ログイン</div>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="inputGroup">
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="inputGroup">
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="staff">従業員</option>
            <option value="manager">店長</option>
          </select>
        </div>

        <button className="primaryBtn" type="submit" disabled={!canSubmit}>
          ログイン
        </button>

        <div className="helpText">※今は仮ログイン（入力があれば遷移）</div>
      </form>
    </>
  )
}

export default App
