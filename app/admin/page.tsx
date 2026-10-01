"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  function gotoProduct() {
    router.push("/admin/products");
  }
  return (
    <div>
      <h1>داشبورد مدیریت</h1>

      <p>به پنل مدیریت خوش آمدید.</p>

      <a onClick={gotoProduct}>مح=خصوالا</a>
    </div>
  );
}
