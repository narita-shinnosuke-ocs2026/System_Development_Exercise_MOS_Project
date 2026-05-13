
import { useNavigate } from 'react-router-dom'

function Store() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="pageTop">
        <button className="ghostBtn" onClick={() => navigate(-1)}>← 戻る</button>
        <h2 className="pageTitle">店舗管理</h2>
      </div>
      <p>（ここにメニュー管理・売り切れ設定を作っていきます）</p>
    </div>
  )
}

export default Store
