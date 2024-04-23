import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
// import LoginModal from "./components/LoginModal/LoginModal";
// import RegisterModal from "./components/RegisterModal/RegisterModal";
function App() {
  return (
    <Router>
      <Navbar />
      <Categories />
      {/* <LoginModal />
      <RegisterModal /> */}
    </Router>
  );
}

export default App;
