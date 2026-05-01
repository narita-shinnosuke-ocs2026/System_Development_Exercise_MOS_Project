import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// 顧客用画面コンポーネント
function CustomerPage() {
  return <div>お客様用画面</div>;
}

// スタッフ用画面コンポーネント
function StaffPage() {
  return <div>スタッフ用画面</div>;
}
function App() {

  return (
    <>
    <header>
        <h1>居酒屋みどり亭</h1>
      </header>
      <section id="center">
        <div>
          <h1>いらっしゃいませ</h1>
          <h2>ボタンをお選びください
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            className="costmer link"
            style={{ fontSize: '18px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
            onClick={() => setPage('customer')}>
            お客様用画面へ移行
          </button>
          <button
            className="stuff link"
            style={{position: 'absolute',bottom: '20px',right: '20px', fontSize: '18px', padding: '5px 10px', backgroundColor: '#fd5454', color: 'white', border: 'none', borderRadius: '5px' }}
            onClick={() => setPage('staff')}          >
            スタッフ用画面
          </button>
        </div>
      </section>
    </>
  )
}

export default App
