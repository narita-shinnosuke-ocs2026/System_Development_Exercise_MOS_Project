import { useMemo, useState, useEffect } from 'react'
import './Orders.css'

const PER_PAGE = 8

const initialOrders = [
  {
    id: 'o1',
    table: 'T1',
    time: '12:00',
    status: '未確認',
    items: [
      { name: '枝豆', qty: 1 },
      { name: '唐揚げ', qty: 2 },
      { name: 'ハイボール', qty: 2 },
    ],
  },
  {
    id: 'o2',
    table: 'T2',
    time: '13:00',
    status: '調理中',
    items: [
      { name: 'ポテト', qty: 1 },
      { name: 'レモンサワー', qty: 2 },
    ],
  },
  {
    id: 'o3',
    table: 'C1',
    time: '13:45',
    status: '提供待ち',
    items: [
      { name: '刺身盛り', qty: 1 },
      { name: '日本酒', qty: 1 },
    ],
  },
  {
    id: 'o4',
    table: 'C2',
    time: '14:10',
    status: '未確認',
    items: [
      { name: 'お茶', qty: 2 },
    ],
  },
]

function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [page, setPage] = useState(1)

  // 完了確認ダイアログ用
  const [confirmTarget, setConfirmTarget] = useState(null)

  // 業務向け：未確認→調理中→提供待ち→完了（※完了は今回は消えるので実質使わない）
  const sortedOrders = useMemo(() => {
    const rank = { '未確認': 0, '調理中': 1, '提供待ち': 2, '完了': 3 }
    return [...orders].sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9))
  }, [orders])

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PER_PAGE))

  // ページが範囲外になったら自動調整（完了で消えた時に2ページ目が空になるのを防ぐ）
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const pageOrders = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return sortedOrders.slice(start, start + PER_PAGE)
  }, [sortedOrders, page])

  // 「完了」クリック → 確認ダイアログ表示
  const requestComplete = (order) => {
    setConfirmTarget(order)
  }

  // 確認OK → 注文を削除（=消える → 次が詰まって上に来る）
  const confirmComplete = () => {
    if (!confirmTarget) return
    const id = confirmTarget.id
    setOrders((prev) => prev.filter((o) => o.id !== id))
    setConfirmTarget(null)
  }

  const cancelComplete = () => setConfirmTarget(null)

  return (
    <section className="orders">
      <header className="ordersHeader">
        <h2 className="ordersTitle">注文管理</h2>
        <div className="ordersMeta">
          全 {sortedOrders.length} 件 / {page} / {totalPages}
        </div>
      </header>

      <div className="ordersList">
        {pageOrders.map((o) => (
          <article
            key={o.id}
            className={`orderCard status-${o.status} ${o.status === '未確認' ? 'isUrgent' : ''}`}
          >
            {/* 上段：卓・時間・状態 */}
            <div className="orderTop">
              <div className="orderMain">
                <div className="orderTable">{o.table}</div>
                <div className="orderTime">{o.time}</div>
              </div>

              <span className={`statusBadge status-${o.status}`}>{o.status}</span>
            </div>

            {/* 中段：商品一覧（最初から表示） */}
            <ul className="itemList">
              {o.items.map((it, idx) => (
                <li key={idx} className="itemRow">
                  <span className="itemName">{it.name}</span>
                  <span className="itemQty">× {it.qty}</span>
                </li>
              ))}
            </ul>

            {/* 下段：操作 */}
            <div className="orderActions">
              <button className="ghostBtn2" type="button">
                確認
              </button>

              <button
                className="primaryBtn2"
                type="button"
                onClick={() => requestComplete(o)}
              >
                完了
              </button>
            </div>
          </article>
        ))}

        {pageOrders.length === 0 && (
          <div className="emptyState">
            <p>このページには注文がありません。</p>
          </div>
        )}
      </div>

      {/* ページャー（8件単位） */}
      <nav className="pager" aria-label="ページ切り替え">
        <button
          className="pagerBtn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          type="button"
        >
          ←
        </button>

        <div className="pagerNums">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`pagerNum ${n === page ? 'active' : ''}`}
              onClick={() => setPage(n)}
              type="button"
            >
              {n}
            </button>
          ))}
        </div>

        <button
          className="pagerBtn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          type="button"
        >
          →
        </button>
      </nav>

      {/* ✅ 完了確認ダイアログ（誤タップ防止） */}
      {confirmTarget && (
        <>
          <div className="confirmOverlay" onClick={cancelComplete} />
          <div className="confirmModal" role="dialog" aria-modal="true">
            <h3 className="confirmTitle">完了にしますか？</h3>
            <p className="confirmText">
              <strong>{confirmTarget.table}</strong>（{confirmTarget.time}）の注文を完了にします。
              <br />
              完了にすると一覧から消えます。
            </p>

            <div className="confirmActions">
              <button className="ghostBtn2" onClick={cancelComplete} type="button">
                キャンセル
              </button>
              <button className="dangerBtn" onClick={confirmComplete} type="button">
                OK（完了）
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Orders