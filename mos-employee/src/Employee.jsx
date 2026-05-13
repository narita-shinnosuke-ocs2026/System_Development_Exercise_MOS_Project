
import { useNavigate } from 'react-router-dom'
import { getUser } from './auth'
import './Employee.css'

function Employee() {
  const navigate = useNavigate()
  const user = getUser()

  return (
    <div className="page">
      <h2 className="pageTitle">ホーム</h2>

      <div className="grid">
        <button className="tile" onClick={() => navigate('/orders')}>
          <div className="tileTitle">注文受付 / 注文管理</div>
          <div className="tileSub">注文確認・提供状況</div>
        </button>

        <button className="tile" onClick={() => navigate('/seats')}>
          <div className="tileTitle">座席管理</div>
          <div className="tileSub">空席/使用中の切替</div>
        </button>

        <button className="tile" onClick={() => navigate('/store')}>
          <div className="tileTitle">店舗管理</div>
          <div className="tileSub">メニュー・売り切れ</div>
        </button>
      </div>

      {/* 権限で軽く見せ分け（Figmaの店長機能に繋げやすい） */}
      <div className="roleCard">
        {user?.role === 'manager' ? (
          <>
            <div className="roleTitle">📊 店長モード</div>
            <div className="roleSub">売上・在庫・メニュー管理が使えます</div>
          </>
        ) : (
          <>
            <div className="roleTitle">🧾 従業員モード</div>
            <div className="roleSub">注文・座席の基本操作が使えます</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Employee
