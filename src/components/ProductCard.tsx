"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ProductType } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({
  productId,
  productName,
  productPrice,
  productImage,
  productCategory,
}: ProductType) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const product = {
      productId,
      productName,
      productPrice,
      productImage,
      productCategory,
      quantity: 1,
    };
    dispatch(addItem(product));
    toast.success(`${productName} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Image
        alt={productName || "Product Image"}
        className="w-full h-60 object-cover"
        height={300}
        src={productImage || "/placeholder.svg"}
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
        width={400}
      />

      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-base md:text-lg font-semibold">{productName}</h3>
          <div className="text-gray-500 dark:text-gray-400 text-sm md:text-sm">
            {productCategory}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between">
          <span className="font-semibold text-base md:text-lg">
            ₹ {productPrice}
          </span>
          <Button size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
