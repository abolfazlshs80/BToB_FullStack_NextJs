type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>جزئیات محصول</h1>

      <p>Product ID: {id}</p>
    </main>
  );
}