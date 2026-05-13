import { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { clearUser, getUser } from './auth'
import './Employee.css'

function StaffLayout() {
  const navigate = useNavigate()
  const user = getUser()

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // クリック外で閉じる
  useEffect(() => {
    const onMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  // ESCで閉じる
  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleLogout = () => {
    clearUser()
    navigate('/', { replace: true }) // 戻るで戻れない
  }

  const initial = user?.name?.[0] ?? '？'

  return (
    <>
      <header className="staffHeader">
        <div className="staffBrand">
          <div className="staffTitle">居酒屋みどり亭</div>
          <div className="staffSub">スタッフ側</div>
        </div>

        <div className="userArea" ref={ref}>
          <button
            className="userIcon"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="ユーザーメニュー"
          >
            {initial}
          </button>

          {open && (
            <div className="userPop" role="menu">
              <div className="userLine">
                <strong>{user?.name}</strong>
              </div>
              <div className="userLine subtle">ID: {user?.id}</div>
              <div className="userLine subtle">
                権限: <strong>{user?.role === 'manager' ? '店長' : '従業員'}</strong>
              </div>

              <button className="logoutBtn" onClick={handleLogout}>
                ログアウト
              </button>

              <div className="popHint">外クリック / ESC で閉じます</div>
            </div>
          )}
        </div>
      </header>

      <main className="staffMain">
        <Outlet />
      </main>
    </>
  )
}

export default StaffLayout
