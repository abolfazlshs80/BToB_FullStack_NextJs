"use client";

import { useState } from "react";

type ProductFilterProps = {
  onSearch: (value: string) => void;
};

export default function ProductFilter({
  onSearch,
}: ProductFilterProps) {
  const [search, setSearch] = useState("");

  function handleChange(value: string) {
    setSearch(value);
    onSearch(value);
  }

  return (
    <div>
      <input
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="جستجوی محصول..."
      />
    </div>
  );
}