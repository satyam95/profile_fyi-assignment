"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  removeItem,
  updateQuantity,
} from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SVGProps, useEffect, useState } from "react";

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items);
  const productCount = useAppSelector((state) => state.cart.productNumber);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<
    "fixed" | "percentage" | null
  >(null);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleApplyFixedDiscount = () => {
    if (discountType === "fixed") {
      setDiscountType(null);
      setDiscount(0);
    } else {
      setDiscountType("fixed");
      setDiscount(10);
    }
  };

  const handleApplyPercentageDiscount = () => {
    if (discountType === "percentage") {
      setDiscountType(null);
      setDiscount(0);
    } else {
      setDiscountType("percentage");
      setDiscount((subtotal * 10) / 100);
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    router.push("/order-success");
  };

  const subtotal = items.reduce(
    (total, item) => total + Number(item.productPrice) * item.quantity,
    0
  );

  const total =
    discountType === "percentage" ? subtotal - discount : subtotal - discount;

  return (
    <main className="container">
      {isMounted && items.length > 0 ? (
        <section className="container mx-auto px-4 md:px-6 py-16">
          <div className="mb-6">
            <div className="flex items-center justify-between ">
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <Button size="sm" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="grow grid gap-6">
              <div className="grid gap-6">
                {items.length > 0 &&
                  items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex md:grid md:grid-cols-[80px_1fr_80px_80px] items-center gap-4 rounded-lg border p-4"
                    >
                      <Image
                        alt={item.productName}
                        className="rounded-md object-cover"
                        height={80}
                        src={item.productImage}
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover",
                        }}
                        width={80}
                      />
                      <div className="grid gap-1">
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.productCategory}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            className="h-8 w-8"
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            className="h-8 w-8"
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="font-medium">₹ {item.productPrice}</div>
                      <Button
                        className="h-8 w-8 text-red-600"
                        size="icon"
                        variant="outline"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-80 flex flex-col h-fit gap-4 rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              <div className="grid gap-2">
                <>
                  <div className="flex items-center justify-between">
                    <p>
                      Subtotal(
                      {productCount === 1
                        ? `${productCount} item`
                        : `${productCount} items`}
                      )
                    </p>
                    <p className="font-medium">₹ {subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Shipping</p>
                    <p className="font-medium">₹ 0.00</p>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <p>Discount</p>
                      <p className="font-medium">-₹ {discount.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    {subtotal > 100 && (
                      <Badge
                        variant={
                          discountType === "fixed" ? "default" : "outline"
                        }
                        className="rounded-sm cursor-pointer"
                        onClick={handleApplyFixedDiscount}
                      >
                        ₹10 Discount
                      </Badge>
                    )}
                    {subtotal > 500 ? (
                      <Badge
                        variant={
                          discountType === "percentage" ? "default" : "outline"
                        }
                        className="rounded-sm cursor-pointer"
                        onClick={handleApplyPercentageDiscount}
                      >
                        10% Discount
                      </Badge>
                    ) : (
                      <p className="text-xs text-gray-500">
                        {subtotal < 100
                          ? "Shop more than $100 to get a flat $10 off! or more than $500 to get 10% off!"
                          : "Shop more than $500 to get 10% off!"}
                      </p>
                    )}
                  </div>
                </>
                <Separator />
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Total</h3>
                  <p className="text-lg font-bold">₹ {total.toFixed(2)}</p>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 md:px-6 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 md:px-6">
            <div className="flex flex-col items-center gap-4">
              <ShoppingCartIcon className="w-20 h-20 text-gray-400" />
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-gray-500 text-center max-w-md">
                It looks like you haven&apos;t added any items to your cart yet.
                Start browsing our products and add some items to your cart.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShoppingCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5L19 12H7.37671M20 16H8L6 3H3M11.5 7L13.5 9M13.5 9L15.5 7M13.5 9V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
