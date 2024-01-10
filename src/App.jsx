// 1. Router
// 2. move from full size to mobile size
// 3. EmailList is not spreading up
// 4. EmailFilter is not spreading up - move out from form to components only
// 5. back img in EmailDetails

import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";

//pages
import { EmailIndex } from "./pages/EmailIndex";
import { About } from "./pages/About";
import { EmailDetails } from "./pages/EmailDetails";
import { EmailCompose } from "./pages/EmailCompose";

export function App() {
  return (
    <section className="main-app">
      <Router>
        <main className="app">
          <Routes>
            <Route path="/" element={<Navigate replace to="/inbox" />} />
            {/* <Route path="/:folder" element={<EmailIndex />} /> */}

            <Route path="/:folder" element={<EmailIndex />}>
              <Route path="/:folder/edit" element={<EmailCompose />} />
            </Route>

            <Route path="/email/:emailId" element={<EmailDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate replace to="/inbox" />} />
          </Routes>
          {/* <UserMsg /> */}
        </main>
      </Router>
    </section>
  );
}

//////////////
{
  // return (
  //   <section className="main-app">
  //     <Router>
  //       <main className="app">
  //         <Routes>
  //           <Route path="/" element={<EmailIndex />} />
  //           <Route path="/about" element={<About />} />
  //           <Route path="/email/:emailId" element={<EmailDetails/>}/>
  //           {/* <Route path="*" element={<Navigate to="/email" replace />} /> */}
  //         </Routes>
  //         {/* <UserMsg /> */}
  //       </main>
  //     </Router>
  //   </section>
  // );
}
