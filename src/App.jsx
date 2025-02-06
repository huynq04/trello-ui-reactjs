import { Routes, Navigate, Route } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/boards/1' replace={true} />} />

      {/* board detail */}
      <Route path='/boards/:boardId' element={<Board />} />

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification/:id/:hash' element={<AccountVerification />} />

      {/* 404 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
