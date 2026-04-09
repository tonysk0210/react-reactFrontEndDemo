import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext(); // 從 MovieContext 中獲取 favorites 狀態，這個狀態包含了用戶收藏的電影列表

  // 如果 favorites 狀態中有電影，則渲染收藏電影列表；如果沒有電影，則顯示一個提示訊息告訴用戶還沒有收藏電影
  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {/* 使用 map 方法來遍歷 favorites 狀態中的電影列表，對每一部電影渲染一個 MovieCard 組件，並將電影物件作為 props 傳遞給 MovieCard 組件，這樣 MovieCard 組件就可以顯示電影的詳細資訊和收藏狀態 */}
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  // 如果 favorites 狀態中沒有電影，則顯示一個提示訊息告訴用戶還沒有收藏電影
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
