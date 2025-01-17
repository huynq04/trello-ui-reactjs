import { Routes, Navigate, Route } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/boards/678a3584fb0fff1488a4df74' replace={true} />} />

      {/* board detail */}
      <Route path='/boards/:boardId' element={<Board />} />

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      {/* 404 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
