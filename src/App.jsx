import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";

//pages
import { EmailIndex } from "./pages/EmailIndex";
import { About } from "./pages/About";

export function App() {
  return (
    <section className="main-app">
      <Router>
        <main className="app">
          <Routes>
            <Route path="/" element={<EmailIndex />} />
            <Route path="/about" element={<About />} />
            <Route path="/email/:folderId?" element={<EmailIndex />}>
              <Route
                path="/email/:folderId/:emailId"
              />
            </Route>
          <Route path="*" element={<Navigate to="/email" replace/>}/>
          </Routes>
          {/* <UserMsg /> */}
        </main>
      </Router>
    </section>
  );
}

//////////////
{
  /* <Router>
<main className="app">
  <Routes>
    <Route path="/" element={<About />} />
    <Route path="/about" element={<About />} />
    <Route path="/email/:folderId?" element={<EmailIndex />}>
      <Route
        path="/email/:folderId/:emailId"
        element={<EmailDetails />}
      />
    </Route>
  </Routes>
  <UserMsg />
</main>
</Router> */
}
