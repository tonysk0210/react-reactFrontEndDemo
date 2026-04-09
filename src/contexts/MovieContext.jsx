import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext(); // 1. 創建一個 MovieContext，這個上下文將用來在整個應用中共享電影相關的狀態和函式

export const useMovieContext = () => useContext(MovieContext); // 2. 匯出一個自定義的 hook，讓其他組件可以方便地使用 MovieContext 中的值和函式

// 3. 定義 MovieProvider 組件，這個組件將包裹在 App 組件的外層，提供電影相關的狀態和函式給整個應用
// children 是 MovieProvider 的子組件，這些子組件都可以使用 MovieContext 中提供的狀態和函式
export const MovieProvider = ({ children }) => {
  // 3.0 定義一個 favorites 狀態，這個狀態用來存儲用戶收藏的電影列表，
  // 初始值從 localStorage 中獲取，如果 localStorage 中沒有收藏電影列表，則使用空陣列作為初始值
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // 當 favorites 狀態改變時，將其保存到 localStorage 中，這樣用戶的收藏電影列表就會被持久化，即使刷新頁面也不會丟失
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 3.1 定義一些函式來添加、移除和檢查收藏電影，這些函式將會被提供給 MovieProvider 的子組件使用
  const addToFavorites = (movie) => {
    // 將新的電影添加到 favorites 狀態中，使用展開運算符 ...prev 來保留之前的收藏電影，然後添加新的電影，這樣組件就會重新渲染並顯示更新後的收藏電影列表
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    // 從 favorites 狀態中移除指定 ID 的電影，使用 filter 方法來創建一個新的陣列，這個陣列包含了所有 ID 不等於 movieId 的電影，然後將這個新的陣列設置到 favorites 狀態中，這樣組件就會重新渲染並顯示更新後的收藏電影列表
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    // 檢查 favorites 狀態中是否有指定 ID 的電影，使用 some 方法來檢查 favorites 陣列中是否有任何一個電影的 ID 等於 movieId，如果有就返回 true，否則返回 false，這樣組件就可以根據這個函式的返回值來顯示電影是否被收藏
    // .some() : 找到就停，回傳 true/false
    // .find() : 找到就停，回傳找到的元素或 undefined
    return favorites.some((movie) => movie.id === movieId);
  };

  // 4. 定義一個 value 物件，這個物件包含了 favorites 狀態和 addToFavorites、removeFromFavorites、isFavorite
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    // a. {children} 是 MovieProvider 的子組件，這些子組件都可以使用 MovieContext 中提供的狀態和函式
    // b. {value} 是 MovieContext 中提供的值，這裡包含了 favorites 狀態和 addToFavorites、removeFromFavorites、isFavorite 這些函式，
    // 這些值和函式將會被提供給 MovieProvider 的子組件使用
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
