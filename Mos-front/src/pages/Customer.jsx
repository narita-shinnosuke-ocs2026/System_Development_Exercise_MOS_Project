import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'
import '../Customer.css'

export default function CustomerPage() {
  const { orderHistory } = useContext(CartContext)
  const hasOrderHistory = orderHistory.length > 0

  return (
    <div className="customer-container">
      <div className="customer-card">
        <h2 className="customer-title">お客様用画面</h2>

        <p className="customer-text">
          こちらからメニュー確認・注文・履歴の確認ができます。
        </p>

        <div className="customer-button-area">
          <Link to="/menu/categories" className="customer-button menu-button">
            メニュー表
          </Link>

          {hasOrderHistory ? (
            <Link to="/history" className="customer-button confirm-button">
              注文履歴
            </Link>
          ) : (
            <span
              className="customer-button confirm-button is-disabled"
              aria-disabled="true"
            >
              注文履歴
            </span>
          )}
        </div>

        <Link to="/checkout" className="customer-button checkout-button">
          お会計
        </Link>
      </div>
    </div>
  )
}
