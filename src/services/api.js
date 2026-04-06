const API_KEY = "fd07ee365070017319b556c0ad42479f"; // 替換為你的 TMDB API 金鑰
const BASE_URL = "https://api.themoviedb.org/3";

// 這是 name export 的函式，可以在其他檔案中使用 import { getPopularMovies } from './services/api' 來引入

// getPopularMovies 函式用來從 TMDB API 獲取熱門電影的資料，並返回一個包含電影列表的陣列
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// searchMovies 函式用來從 TMDB API 搜尋電影，接受一個 query 參數，並返回符合搜尋條件的電影列表
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}`,
  );
  const data = await response.json();
  return data.results;
};
