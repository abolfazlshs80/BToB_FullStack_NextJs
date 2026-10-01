"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>خطایی رخ داده است</h2>

      <button onClick={() => reset()}>
        تلاش مجدد
      </button>
    </div>
  );
}