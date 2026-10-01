import Image from "next/image";
import Home1 from "./home";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>داشبورد B2B</h1>

      <nav>
        <Link href="/products">محصولات</Link>

        <Link href="/users">کاربران</Link>

        <Link href="/reports">گزارشات</Link>
      </nav>
    </main>
  );
}
