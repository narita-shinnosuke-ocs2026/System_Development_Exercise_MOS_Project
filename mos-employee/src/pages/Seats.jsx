
import './Seats.css'

const STATUS = {
  empty: { label: '空', color: 'green' },
  using: { label: '使用中', color: 'red' },
  paid: { label: '会計済', color: 'yellow' },
  stop: { label: '停止中', color: 'black' },
}

const seats = [
  { id: 'T101', status: 'empty', time: '00:00:00' },
  { id: 'T102', status: 'empty', time: '00:00:00' },
  { id: 'T103', status: 'using', time: '00:12:40' },
  { id: 'T104', status: 'paid', time: '01:05:10' },
  { id: 'T105', status: 'stop', time: '00:00:00' },
]

function Seats() {
  return (
    <div className="page">
      <h3>座席管理</h3>

      <div className="seatList">
        {seats.map((seat) => (
          <button key={seat.id} className="seatCard" onClick={() => {}}>
            <div className={`seatStatus ${STATUS[seat.status].color}`} />
            <div className="seatMain">
              <div className="seatId">{seat.id}</div>
              <div className="seatTime">{seat.time}</div>
            </div>
            <div className="seatLabel">{STATUS[seat.status].label}</div>
          </button>
        ))}
      </div>

      <div className="pager">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <span key={n} className={`pageDot ${n === 1 ? 'active' : ''}`}>
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Seats
