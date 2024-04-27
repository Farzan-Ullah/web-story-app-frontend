import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import BookmarkPage from "./components/Bookmarks/BookmarkPage";
// import Home from "./Pages/Home";
// import LoginModal from "./components/LoginModal/LoginModal";
// import RegisterModal from "./components/RegisterModal/RegisterModal";
function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/userbookmarks" element={<BookmarkPage />} />
      </Routes> */}
      <Navbar />
      <Categories />
      {/* <LoginModal />
      <RegisterModal /> */}
    </Router>
  );
}

export default App;
