import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
// import authChecker from "./utils/authChecker";
import { pages } from './routes'
import ScrollToTop from './hook/ScrollToTop'
// authChecker();
const App = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div>
      <Routes>
        <ScrollToTop>
          {pages.map((page, index) => (
            <Route key={index} element={<page.element />}>
              {page.children.map((pg, indx) => (
                <Route key={indx} path={pg.path} element={<pg.element />} />
              ))}
            </Route>
          ))}
        </ScrollToTop>
      </Routes>
    </div>
  )
}

export default App
