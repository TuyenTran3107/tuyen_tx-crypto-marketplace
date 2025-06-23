const API_BASE = "https://api.coingecko.com/api/v3/";
export const getData = async (path) => {
  const res = await fetch(API_BASE + path);
  const data = await res.json();
  return data;
}