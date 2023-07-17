import { Route, Routes } from "react-router-dom";
// import authChecker from "./utils/authChecker";
import { pages } from "./routes";
// authChecker();
const App = () => {
  return (
    <div>
      <Routes>
        {pages.map((page, index) => (
          <Route key={index} element={<page.element />}>
            {page.children.map((pg, indx) => (
              <Route key={indx} path={pg.path} element={<pg.element />} />
            ))}
          </Route>
        ))}

      </Routes>
    </div>
  );
}

export default App;
