import { useState } from 'react'
import './App.css'

function CustomerPage({ onBack }) {
  return (
    <div className="page-content">
      <h2>お客様用画面</h2>
      <p>こちらからメニューやご注文の確認・操作ができます。</p>
      <button className="nav-button back-button" onClick={onBack}>トップへ戻る</button>
    </div>
  );
}

function StaffPage({ onBack }) {
  return (
    <div className="page-content">
      <h2>スタッフ用画面</h2>
      <p>スタッフ専用の管理機能へアクセスします。</p>
      <button className="nav-button back-button" onClick={onBack}>トップへ戻る</button>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app-main">
      <header className="site-header">
        <h1>居酒屋みどり亭</h1>
      </header>

      <main className="home-section">
        {page === 'home' ? (
          <>
            <div className="welcome-text">
              <h1>いらっしゃいませ</h1>
              <h2>ボタンをお選びください</h2>
            </div>
            <div className="button-row">
              <button className="nav-button customer-button" onClick={() => setPage('customer')}>
                お客様用画面へ移行
              </button>
              <button className="nav-button staff-button" onClick={() => setPage('staff')}>
                スタッフ用画面
              </button>
            </div>
          </>
        ) : page === 'customer' ? (
          <CustomerPage onBack={() => setPage('home')} />
        ) : (
          <StaffPage onBack={() => setPage('home')} />
        )}
      </main>
    </div>
  )
}

export default App
