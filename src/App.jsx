import { BrowserRouter, Route, Routes } from "react-router-dom";

import EditUser from "./components/EditUser/index";
import EditJob from "./components/EditJob/index";
import CreateUser from "./components/CreateUser/index";
import ListUser from "./components/ListUser/index";
import CreateJob from "./components/CreateJob/index";
import ListJobs from "./components/ListJobs/index";

import "./styles/global.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/CreateUser" element={<CreateUser />}></Route>
          <Route path="/editUser/:id" element={<EditUser />}></Route>
          <Route path="/editJob/:id" element={<EditJob />}></Route>
          <Route path="/ListUser" element={<ListUser />}></Route>
          <Route path="/CreateJob" element={<CreateJob />}></Route>
          <Route path="/ListJobs" element={<ListJobs />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
