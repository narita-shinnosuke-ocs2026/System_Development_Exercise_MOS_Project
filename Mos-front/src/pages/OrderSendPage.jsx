import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuLayout } from '../components/MenuLayout'
import { CartContext } from '../CartContext'
import '../menu.css'

export default function OrderSendPage() {
  const { cartItems, confirmOrder, orderHistory } = useContext(CartContext)
  const navigate = useNavigate()
  const [isSent, setIsSent] = useState(false)
  const [showHistoryWarning, setShowHistoryWarning] = useState(false)
  const [showRapidWarning, setShowRapidWarning] = useState(false)
  const [pendingConfirm, setPendingConfirm] = useState(false)

  useEffect(() => {
    if (cartItems.length === 0 && !isSent) {
      navigate('/menu')
    }
  }, [cartItems, isSent, navigate])

  useEffect(() => {
    if (cartItems.length === 0) {
      setShowHistoryWarning(false)
      setShowRapidWarning(false)
      setPendingConfirm(false)
    }
  }, [cartItems])

  const proceedConfirm = () => {
    const didConfirm = confirmOrder()
    if (!didConfirm) {
      navigate('/menu')
      return
    }

    setIsSent(true)
    setTimeout(() => {
      navigate('/menu/categories')
    }, 2300)
  }

  const handleWarningContinue = () => {
    setShowHistoryWarning(false)
    setShowRapidWarning(false)

    if (pendingConfirm) {
      setPendingConfirm(false)
      sessionStorage.setItem('lastOrderAttemptAt', String(Date.now()))
      proceedConfirm()
    }
  }

  const handleConfirm = () => {
    if (cartItems.length === 0) {
      navigate('/menu')
      return
    }

    const buildSignature = (items) => {
      const counts = items.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + 1
        return acc
      }, {})

      return Object.entries(counts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, qty]) => `${name}:${qty}`)
        .join('|')
    }

    const currentSignature = buildSignature(cartItems)
    const recentOrders = orderHistory.slice(0, 5)
    const hasDuplicate = recentOrders.some((order) => (
      buildSignature(order.items) === currentSignature
    ))

    const lastAttempt = Number(sessionStorage.getItem('lastOrderAttemptAt'))
    const hasRapidDuplicate = Boolean(lastAttempt && Date.now() - lastAttempt < 1000)

    if (hasDuplicate || hasRapidDuplicate) {
      setShowHistoryWarning(hasDuplicate)
      setShowRapidWarning(hasRapidDuplicate)
      setPendingConfirm(true)
      return
    }

    sessionStorage.setItem('lastOrderAttemptAt', String(Date.now()))
    proceedConfirm()
  }

  return (
    <MenuLayout activeTab="send">
      <div className="modal-overlay">
        <div className="modal-card">
          <p>注文を確定しますか？</p>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-button"
              onClick={handleConfirm}
              disabled={cartItems.length === 0}
            >
              はい
            </button>
            <Link to="/menu" className="modal-button is-dark">いいえ</Link>
          </div>
        </div>
      </div>

      {(showHistoryWarning || showRapidWarning) && !isSent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>
              注文が重複している可能性があります。
              {showHistoryWarning && (
                <>
                  <br />
                  過去5件以内に同じメニュー、同じ数量の注文があります。
                </>
              )}
              
              {showRapidWarning && (
                <>
                  <br />
                  1秒以内に同じ注文が送信されています。
                </>
              )}
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-button"
                onClick={handleWarningContinue}
              >
                続行
              </button>
              <Link
                to="/menu"
                className="modal-button is-dark"
                onClick={() => {
                  setShowHistoryWarning(false)
                  setShowRapidWarning(false)
                  setPendingConfirm(false)
                }}
              >
                キャンセル
              </Link>
            </div>
          </div>
        </div>
      )}

      {isSent && (
        <div className="toast-overlay" role="status" aria-live="polite">
          <div className="toast-card">
            注文が送信されました
            <br />
            ホーム画面へ戻ります
          </div>
        </div>
      )}
    </MenuLayout>
  )
}
