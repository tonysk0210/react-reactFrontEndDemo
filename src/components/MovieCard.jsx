import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
// 引入 useMovieContext 以使用 MovieContext 中提供的狀態和函式

function MovieCard({ movie }) {
  // 1. 從 MovieContext 中獲取 isFavorite、addToFavorites 和 removeFromFavorites 這些函式，這些函式用來檢查電影是否被收藏、添加電影到收藏和從收藏中移除電影
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id); // 2. 使用 isFavorite 函式來檢查這部電影是否已經被收藏，傳入電影的 ID 作為參數，將返回的布林值存儲在 favorite 變數中

  // 3. 定義 onFavoriteClick 函式，這個函式用來處理當用戶點擊收藏按鈕時的行為，如果電影已經被收藏，則調用 removeFromFavorites 函式來從收藏中移除這部電影，傳入電影的 ID 作為參數；如果電影尚未被收藏，則調用 addToFavorites 函式來添加這部電影到收藏中，傳入整個電影物件作為參數
  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite)
      removeFromFavorites(movie.id); // 如果電影已經被收藏，則調用 removeFromFavorites 函式來從收藏中移除這部電影，傳入電影的 ID 作為參數
    else addToFavorites(movie); // 如果電影尚未被收藏，則調用 addToFavorites 函式來添加這部電影到收藏中，傳入整個電影物件作為參數
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 從 TMDB API 獲取電影海報的 URL，使用 w500 的尺寸
          alt={movie.title}
        />
        {/* 這裡是電影卡片上的覆蓋層，包含一個按鈕用來添加或移除收藏 */}
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>{" "}
        {/* 顯示電影的發行年份，使用 split 方法從 release_date 中提取年份 */}
      </div>
    </div>
  );
}

export default MovieCard;
