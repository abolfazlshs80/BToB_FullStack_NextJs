import Link from "next/link";

const products = [
  {
    id: 1,
    title: "Laptop",
  },
  {
    id: 2,
    title: "Mouse",
  },
  {
    id: 3,
    title: "Keyboard",
  },
];

export default function ProductsPage() {
  return (
    <main>
      <h1>محصولات</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>

          <Link href={`/products/${product.id}`}>
            مشاهده محصول
          </Link>
        </div>
      ))}
    </main>
  );
}