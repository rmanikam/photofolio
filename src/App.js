import AlbumsList from "./AlbumsList/AlbumsList";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <AlbumsList />
      <ToastContainer />
    </div>
  );
}

export default App;
