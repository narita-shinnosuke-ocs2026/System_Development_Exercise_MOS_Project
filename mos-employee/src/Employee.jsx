import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Orders from './pages/Orders'
import Seats from './pages/Seats'
import Store from './pages/Store'
import { clearUser, getUser } from './auth'
import './Employee.css'

const TITLE_MAP = {
  home: 'ホーム',
  orders: '注文管理',
  seats: '座席管理',
  store: '店舗管理',
}

function Employee() {
  const navigate = useNavigate()

  const [view, setView] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ 右上ユーザー
  const [userOpen, setUserOpen] = useState(false)
  const user = getUser() ?? { name: '山田 太郎', id: '12345', role: 'staff' }
  const initial = user?.name?.[0] ?? '？'

  const menuRef = useRef(null)
  const userRef = useRef(null)

  // 外クリックで閉じる（メニュー＆ユーザーポップ）
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ESCで閉じる（メニュー＆ユーザーポップ）
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setUserOpen(false)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  const screenTitle = TITLE_MAP[view] ?? 'ホーム'

  const handleLogout = () => {
    clearUser()
    navigate('/', { replace: true })
  }

  return (
    <>
      {/* ===== ヘッダー（共通） ===== */}
      <header className="topHeader">
        {/* 左：戻る + ハンバーガー（現状維持） */}
        <div className="leftControls">
          {view !== 'home' && (
            <button className="iconBtn" onClick={() => setView('home')} aria-label="ホームに戻る">
              ←
            </button>
          )}
          <button className="iconBtn hamburger" onClick={() => setMenuOpen(true)} aria-label="メニューを開く">
            ☰
          </button>
        </div>

        {/* 中央：店名 + 画面名（現状維持） */}
        <div className="titleBlock">
          <div className="shopName">居酒屋みどり亭</div>
          <div className="screenName">{screenTitle}</div>
        </div>

        {/* ✅ 右上：ユーザー（山アイコン） */}
        <div className="userArea" ref={userRef}>
          <button
            className="userIcon"
            onClick={() => setUserOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={userOpen}
            aria-label="ユーザーメニュー"
          >
            {initial}
          </button>

          {userOpen && (
            <div className="userPop" role="menu">
              <p className="userLine">
                <strong>{user?.name}</strong>
              </p>
              <p className="userLine subtle">ID: {user?.id}</p>
              <p className="userLine subtle">
                権限: <strong>{user?.role === 'manager' ? '店長' : '従業員'}</strong>
              </p>

              <button className="logoutBtn" onClick={handleLogout}>
                ログアウト
              </button>

              <div className="popHint">外クリック / ESC で閉じます</div>
            </div>
          )}
        </div>
      </header>

      {/* ===== オーバーレイ（クリックで閉じる） ===== */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      {/* ===== スライドメニュー ===== */}
      <aside className={`sideMenu ${menuOpen ? 'active' : ''}`} ref={menuRef}>
        <div className="menuHeader">
          <div className="menuTitle">メニュー</div>
          <button className="closeBtn" onClick={() => setMenuOpen(false)} aria-label="閉じる">
            ×
          </button>
        </div>

        <button className="menuItem" onClick={() => { setView('orders'); setMenuOpen(false) }}>
          注文管理
        </button>
        <button className="menuItem" onClick={() => { setView('seats'); setMenuOpen(false) }}>
          座席管理
        </button>
        <button className="menuItem" onClick={() => { setView('store'); setMenuOpen(false) }}>
          店舗管理
        </button>
      </aside>

      {/* ===== コンテンツ（画面遷移なしで切り替え） ===== */}
      <main className="content">
        {view === 'home' && (
          <div className="homeHint">
            <p>左上のメニューから操作を選択してください。</p>
          </div>
        )}
        {view === 'orders' && <Orders />}
        {view === 'seats' && <Seats />}
        {view === 'store' && <Store />}
      </main>
    </>
  )
}

export default Employee
