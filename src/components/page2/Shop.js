import React from "react";
import ShopBanner from "./ShopBanner";
import ProductDisplay from "./ProductDisplay";

export default function Shop() {
  return (
    <main className="dark:bg-black dark:text-white ">
      <ShopBanner/>
      <ProductDisplay/>
    </main>
  );
}
