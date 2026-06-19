import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuLayout } from '../components/MenuLayout'
import { CartContext } from '../CartContext'
import menuItems from '../data/menuItems'
import useStayRemaining from '../hooks/useStayRemaining'
import '../App.css'
import '../menu.css'
import '../menubook.css'
import freeImage from '../assets/無料備品.jpg'
import yakitoriImage from '../assets/焼き鳥.jpeg'
import speedImage from '../assets/スピード.jpg'
import riceImage from '../assets/ご飯もの.jpg'
import drinkImage from '../assets/ドリンク.jpg'
import dessertImage from '../assets/デザート.jpg'

const categories = [
  { id: 'yakitori', label: '焼き鳥',     image: yakitoriImage },
  { id: 'speed',    label: 'スピード',   image: speedImage },
  { id: 'rice',     label: 'ごはんもの', image: riceImage },
  { id: 'drink',    label: 'ドリンク',   image: drinkImage },
  { id: 'dessert',  label: 'デザート',   image: dessertImage },
  { id: 'free',     label: '無料備品',   image: freeImage }
]

function SunburstDecor({ flip = false }) {
  const lines = Array.from({ length: 23 }, (_, i) => {
    const angle = (-90 + (i - 11) * 8) * (Math.PI / 180)
    const cx = 200
    const cy = 135
    const r0 = 22
    const r1 = 110 + (i % 3 === 0 ? 16 : i % 2 === 0 ? 8 : 0)
    return {
      x1: cx + Math.cos(angle) * r0,
      y1: cy + Math.sin(angle) * r0,
      x2: cx + Math.cos(angle) * r1,
      y2: cy + Math.sin(angle) * r1
    }
  })

  const arcs = [140, 120, 100]

  return (
    <svg
      viewBox="0 0 400 145"
      className="book-sunburst"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Horizontal rule */}
      <line x1="0" y1="135" x2="400" y2="135" stroke="#c8a055" strokeWidth="0.8" opacity="0.7" />

      {/* Radiating lines */}
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#c8a055" strokeWidth="0.9" opacity="0.55" />
      ))}

      {/* Concentric arcs */}
      {arcs.map((r) => (
        <path key={r}
          d={`M ${200 - r} 135 A ${r} ${r} 0 0 1 ${200 + r} 135`}
          fill="none" stroke="#c8a055" strokeWidth="0.8" opacity="0.4"
        />
      ))}

      {/* Central circle */}
      <circle cx="200" cy="135" r="18" fill="none" stroke="#c8a055" strokeWidth="0.9" opacity="0.6"/>
      <circle cx="200" cy="135" r="9" fill="none" stroke="#c8a055" strokeWidth="0.9" opacity="0.5"/>

      {/* Star / diamond */}
      <polygon
        points="200,117 206,129 200,135 194,129"
        fill="none" stroke="#c8a055" strokeWidth="0.9" opacity="0.8"
      />
      <polygon
        points="200,153 206,141 200,135 194,141"
        fill="none" stroke="#c8a055" strokeWidth="0.9" opacity="0.8"
      />

      {/* Accent dots */}
      {[[-70, -28], [70, -28], [-45, -18], [45, -18]].map(([dx, dy], i) => (
        <circle key={i} cx={200 + dx} cy={135 + dy} r="2" fill="#c8a055" opacity="0.5" />
      ))}

      {/* Corner ornament lines */}
      <line x1="0" y1="135" x2="55" y2="135" stroke="#c8a055" strokeWidth="2" opacity="0.7"/>
      <line x1="345" y1="135" x2="400" y2="135" stroke="#c8a055" strokeWidth="2" opacity="0.7"/>
    </svg>
  )
}

export default function CategoryMenu() {
  const [pageIndex, setPageIndex] = useState(0)
  const [sliding, setSliding] = useState(null)  // 'left' | 'right' | null
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const touchStartX = useRef(null)
  const navigate = useNavigate()
  const { cartItems, resetCart, resetOrderHistory } = useContext(CartContext)
  const { isExpired } = useStayRemaining()

  const selectedCourse = sessionStorage.getItem('selectedCourse') || ''
  const isDrinkPlan = selectedCourse.startsWith('drink')

  const goTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= categories.length || sliding) return
    setSliding(newIndex > pageIndex ? 'left' : 'right')
    setTimeout(() => {
      setPageIndex(newIndex)
      setSliding(null)
    }, 280)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 48) goTo(pageIndex + 1)
    else if (diff < -48) goTo(pageIndex - 1)
    touchStartX.current = null
  }

  const handleCheckout = () => {
    if (cartItems.length > 0) { setIsConfirmOpen(true); return }
    resetCart(); resetOrderHistory(); navigate('/checkout')
  }

  const cat = categories[pageIndex]
  const items = menuItems.filter((m) => m.category === cat.id)

  return (
    <MenuLayout activeTab="categories" showCheckout onCheckoutClick={handleCheckout}>
      {/* Menu Book */}
      <div
        className={`menu-book${sliding ? ` is-sliding-${sliding}` : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top ornament */}
        <div className="book-decor-top">
          <SunburstDecor />
        </div>

        {/* Restaurant name */}
        <div className="book-restaurant-name">
          <span className="book-name-en">IZAKAYA MIDORI-TEI</span>
          <h2 className="book-name-ja">居酒屋みどり亭</h2>
        </div>

        {/* Category name */}
        <div className="book-category-header">
          <span className="book-category-label">{cat.label}</span>
        </div>

        {/* Item list */}
        <ul className="book-item-list">
          {items.map((item) => {
            const isDrinkItem = item.category === 'drink'
            const isDrinkExcluded = Boolean(item.drinkPlanExcluded)
            const showFree = isDrinkPlan && isDrinkItem && !isDrinkExcluded
            const isFree = item.price === 0

            return (
              <li
                key={item.id}
                className={`book-item${item.soldOut ? ' is-sold-out' : ''}`}
                onClick={() => {
                  if (!item.soldOut && !isExpired) navigate(`/menu/item/${item.id}`)
                }}
              >
                <div className="book-item-left">
                  <span className="book-item-name">{item.name}</span>
                  {isDrinkItem && isDrinkExcluded && (
                    <span className="book-item-tag">飲み放題対象外</span>
                  )}
                  {item.soldOut && <span className="book-item-tag sold-out">売り切れ</span>}
                </div>
                <div className="book-item-dots" aria-hidden="true" />
                <span className="book-item-price">
                  {showFree ? '飲み放題' : isFree ? '無料' : `¥${item.price.toLocaleString()}`}
                </span>
              </li>
            )
          })}
        </ul>

        {/* Bottom ornament */}
        <div className="book-decor-bottom">
          <SunburstDecor flip />
        </div>
      </div>

      {/* Page navigation */}
      <div className="book-nav">
        <button
          type="button"
          className="book-nav-arrow"
          onClick={() => goTo(pageIndex - 1)}
          disabled={pageIndex === 0}
          aria-label="前のページ"
        >
          ‹
        </button>

        <div className="book-nav-dots">
          {categories.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`book-nav-dot${i === pageIndex ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={c.label}
            />
          ))}
        </div>

        <button
          type="button"
          className="book-nav-arrow"
          onClick={() => goTo(pageIndex + 1)}
          disabled={pageIndex === categories.length - 1}
          aria-label="次のページ"
        >
          ›
        </button>
      </div>

      {/* Swipe hint (initial) */}
      <p className="book-swipe-hint">← フリックでページをめくる →</p>

      {isConfirmOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>
              注文保留に未確定の商品があります。
              <br />
              注文をせずに会計しますか？
            </p>
            <div className="modal-actions">
              <button type="button" className="modal-button" onClick={() => {
                setIsConfirmOpen(false); resetCart(); resetOrderHistory(); navigate('/checkout')
              }}>
                はい
              </button>
              <button type="button" className="modal-button is-dark" onClick={() => setIsConfirmOpen(false)}>
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </MenuLayout>
  )
}
