import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
// import Home from "./Pages/Home";
// import LoginModal from "./components/LoginModal/LoginModal";
// import RegisterModal from "./components/RegisterModal/RegisterModal";
function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/categories" element={<Categories />} />
      </Routes> */}
      <Navbar />
      <Categories />
      {/* <LoginModal />
      <RegisterModal /> */}
    </Router>
  );
}

export default App;
