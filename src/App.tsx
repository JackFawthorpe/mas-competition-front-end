import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./apis/pages/Login";
import Home from "./apis/pages/Home";
import PageContainer from "./apis/components/PageContainer";

function App() {

  const isLoggedIn = false;

  return (
    <PageContainer>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={isLoggedIn ? <Home/> : <Login/>}/>
          </Routes>
        </BrowserRouter>
    </PageContainer>
  );
}

export default App;
