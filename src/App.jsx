import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"; // 引入 Routes 和 Route 以定義路由
import { MovieProvider } from "./contexts/MovieContext"; // 引入 MovieProvider 以提供電影相關的狀態和函式給整個應用使用
import NavBar from "./components/NavBar";

function App() {
  return (
    // MovieProvider 用來包裹整個應用，提供電影相關的狀態和函式給整個應用中的組件使用
    // children 是 MovieProvider 的子組件，這裡是 NavBar 和 Routes 組件，這些組件都可以使用 MovieContext 中提供的狀態和函式
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        {/* Routes 是用來包裹所有 Route 的組件，而 Route 則定義了不同路徑對應的組件 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
