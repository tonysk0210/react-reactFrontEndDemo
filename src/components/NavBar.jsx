import { Link } from "react-router-dom"; // 引入 Link 以便在 NavBar 中使用導航連結
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        {/*  Link 組件用於創建導航連結，to 屬性指定了導航的路徑，className 用於添加 CSS 類以便樣式化 */}
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
