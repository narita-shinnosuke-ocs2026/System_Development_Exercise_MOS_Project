import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import './Employee.css'

function Employee() {
  const navigate = useNavigate()
  const { state: user } = useLocation() // ← ① user受取
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // 未ログインガード
  useEffect(() => {
    if (!user) navigate('/')
  }, [user, navigate])


  // クリック外で閉じる
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  if (!user) return null // ガード中は何も描画しない

  return (
    <>
      <header className="header">
        <div className="user-area" ref={ref}>
          <button className="user-icon" onClick={() => setOpen(!open)}>
            {user.name[0]}
          </button>

          {open && (
            <div className="user-pop">
              <p><strong>{user.name}</strong></p>
              <p>ID: {user.id}</p>
              <button onClick={() => navigate('/')}>ログアウト</button>
            </div>
          )}
        </div>
      </header>

      <main>
        <h2>ホーム</h2>

        {/* ③ 権限で表示切替 */}
        {user.role === 'manager' ? (
          <p>📊 店長メニュー（売上・管理）</p>
        ) : (
          <p>🧾 従業員メニュー（注文・作業）</p>
        )}
      </main>
    </>
  )
}

export default Employee