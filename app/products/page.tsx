type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const page = params.page;
  const search = params.search;
  const category = params.category;

  return (
    <main>
      <h1>محصولات</h1>

      <p>Page: {page}</p>

      <p>Search: {search}</p>
      <p>category: {category}</p>
    </main>
  );
}
