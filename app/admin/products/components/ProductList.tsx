type Product = {
  id: number;
  title: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    title: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    title: "Mouse",
    price: 1000,
  },
  {
    id: 3,
    title: "Keyboard",
    price: 2000,
  },
];

export default function ProductList() {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>

          <p>
            قیمت: {product.price}
          </p>
        </div>
      ))}
    </div>
  );
}