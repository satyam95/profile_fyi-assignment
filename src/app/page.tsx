import ProductCard from "@/components/ProductCard";
import { products } from "@/constants/products";

export default function Home() {
  return (
    <main className="container">
      <div className="py-16 md:p-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              productPrice={product.productPrice}
              productImage={product.productImage}
              productCategory={product.productCategory}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
