
import { useNavigate } from 'react-router-dom'
//import './Orders.css'

function Orders() {
  const navigate = useNavigate()

  // 仮データ（FigmaのT1/T2みたいなやつ）
  const orders = [
    { table: 'T1', time: '12:00', status: '未確認' },
    { table: 'T2', time: '13:00', status: '調理中' },
    { table: 'C1', time: '13:45', status: '提供待ち' },
    { table: 'C2', time: '14:10', status: '完了' },
  ]

  return (
    <div className="page">
      <div className="pageTop">
        <button className="ghostBtn" onClick={() => navigate(-1)}>← 戻る</button>
        <h2 className="pageTitle">注文管理</h2>
      </div>

      <div className="list">
        {orders.map((o) => (
          <div className="orderCard" key={`${o.table}-${o.time}`}>
            <div className="orderLeft">
              <div className="orderTable">{o.table}</div>
              <div className="orderTime">{o.time}</div>
            </div>
            <div className="orderStatus">{o.status}</div>
            <button className="smallBtn">確認</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
