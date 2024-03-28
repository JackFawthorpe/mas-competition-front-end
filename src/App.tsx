import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageContainer from "./components/PageContainer";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
