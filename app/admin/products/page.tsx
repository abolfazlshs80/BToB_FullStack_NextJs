async function getProducts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>

      {products.map((product: any) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
