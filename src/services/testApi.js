const url = "https://fakestoreapi.com/products";

export async function testApi() {
  const res = await fetch(url);
  if (!res.ok) throw Error("Failed to fetch data from fake api");
  const data = await res.json();
  return data;
}