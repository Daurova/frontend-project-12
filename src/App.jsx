import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './app/routes'
import './App.css'
import HomePage from './pages/home/HomePage'
import LogInPage from './pages/login/LoginPage'
import NotFoundPage from './pages/notFound/NotFoundPage'
import ProtectedRoute from './shared/ui/ProtectedRoute'

function App({socket}) {

  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<ProtectedRoute><HomePage socket  = {socket}/></ProtectedRoute>} />
        <Route path={ROUTES.LOGIN} element={<LogInPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
