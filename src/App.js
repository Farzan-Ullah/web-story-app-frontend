import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import BookmarkPage from "./components/Bookmarks/BookmarkPage";
import ViewStory from "./components/ViewStory/ViewStory";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Categories}/>
        <Route path="/bookmarks" Component={BookmarkPage} />
        <Route path="/view_story/:id" Component={ViewStory} />
      </Routes>
    </Router>
  );
}

export default App;
