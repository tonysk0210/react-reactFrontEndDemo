import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api"; // 引入從 api.js 定義的函式來獲取電影資料
import "../css/Home.css";

function Home() {
  // useState 用來管理搜尋關鍵字、電影列表、錯誤訊息和載入狀態
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋輸入的文字
  const [movies, setMovies] = useState([]); // 存儲從 API 獲取的電影資料
  const [error, setError] = useState(null); // 用來存儲錯誤訊息，如果獲取資料失敗會顯示這個訊息
  const [loading, setLoading] = useState(true); // 用來表示是否正在載入資料

  // useEffect 用來在組件掛載時獲取熱門電影資料，並在搜尋時更新電影列表
  // react 會先去確認 useEffect 的依賴陣列，如果是空的，就只會在組件首次掛載時執行一次，才會呼叫 loadPopularMovies 函式來獲取熱門電影資料·
  useEffect(() => {
    // 1. 定義一個異步函式來獲取熱門電影資料，並處理載入狀態和錯誤
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies); // a. 將獲取到的熱門電影資料存儲到 movies 狀態中，這樣組件就會重新渲染並顯示這些電影
      } catch (err) {
        console.log(err);
        setError("Failed to load movies..."); // b. 如果獲取資料失敗，將錯誤訊息存儲到 error 狀態中，這樣組件就會顯示這個錯誤訊息
      } finally {
        setLoading(false); // c. 無論獲取資料成功還是失敗，都將載入狀態設置為 false，這樣組件就會停止顯示載入中的提示
      }
    };

    loadPopularMovies(); // 2. 呼叫函式來獲取熱門電影資料
  }, []); // 空依賴陣列表示這個 useEffect 只會在組件首次掛載時執行一次

  // handleSearch 函式用來處理搜尋表單的提交事件，從 API 獲取搜尋結果並更新電影列表
  const handleSearch = async (e) => {
    e.preventDefault(); // 阻止表單提交的默認行為
    if (!searchQuery.trim()) return; // 如果搜尋輸入為空，則不進行搜尋
    if (loading) return; // 如果正在載入資料，則不進行搜尋

    setLoading(true); // 在開始搜尋之前將載入狀態設置為 true，這樣組件就會顯示載入中的提示
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults); // a. 將獲取到的搜尋結果存儲到 movies 狀態中，這樣組件就會重新渲染並顯示這些電影
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies..."); // b. 如果獲取資料失敗，將錯誤訊息存儲到 error 狀態中，這樣組件就會顯示這個錯誤訊息
    } finally {
      setLoading(false); // c. 無論獲取資料成功還是失敗，都將載入狀態設置為 false，這樣組件就會停止顯示載入中的提示
    }
  };

  return (
    <div className="home">
      {/* 這是搜尋表單 */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery} // 搜尋輸入框的值綁定到 searchQuery 狀態
          onChange={(e) => setSearchQuery(e.target.value)} // 當輸入框內容改變時更新 searchQuery 狀態
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* 這裡是錯誤訊息的區域，如果 error 狀態有值，就會顯示這個錯誤訊息 */}
      {error && <div className="error-message">{error}</div>}

      {/* 這裡是根據載入狀態來顯示不同的內容，如果正在載入就顯示 Loading...，否則顯示電影列表 */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        // 這裡是電影列表的區域，會根據搜尋結果或熱門電影來顯示
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
