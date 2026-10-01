type Props = {
  params: Promise<{
    productId: string;
    reviewId: string;
  }>;
};

export default async function ReviewPage({ params }: Props) {
  const { productId, reviewId } = await params;

  return (
    <div>
      Product: {productId}
      <br />
      Review: {reviewId}
    </div>
  );
}
