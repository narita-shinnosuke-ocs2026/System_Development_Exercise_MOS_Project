
import { useNavigate } from 'react-router-dom'

function Seats() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="pageTop">
        <button className="ghostBtn" onClick={() => navigate(-1)}>← 戻る</button>
        <h2 className="pageTitle">座席管理</h2>
      </div>
      <p>（ここに座席一覧グリッドを作っていきます）</p>
    </div>
  )
}

export default Seats
