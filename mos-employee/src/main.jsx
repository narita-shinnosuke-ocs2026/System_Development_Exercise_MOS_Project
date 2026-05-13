import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Employee from './Employee.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import StaffLayout from './StaffLayout.jsx'

import Orders from './pages/Orders.jsx'
import Seats from './pages/Seats.jsx'
import Store from './pages/Store.jsx'

import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ログイン */}
        <Route path="/" element={<App />} />

        {/* ログイン後（ガード付き） */}
        <Route element={<ProtectedRoute />}>
          <Route element={<StaffLayout />}>
            <Route path="/employee" element={<Employee />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/store" element={<Store />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
