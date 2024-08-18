import Link from "next/link";
import { SVGProps } from "react";

export default function OrderSuccess() {
  return (
    <main className="container">
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <SuccessIcon className="w-20 h-20 text-gray-400" />
            <h2 className="text-2xl font-bold">Thank you for your order!</h2>
            <p className="text-gray-500 text-center max-w-md">
              Thank you for your purchase! Your order is now being processed and
              will be shipped soon.
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
    </main>
  );
}

function SuccessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000000"
        d="M512 64a448 448 0 110 896 448 448 0 010-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 10-54.336 54.336l126.72 126.72a38.272 38.272 0 0054.336 0l262.4-262.464a38.4 38.4 0 10-54.272-54.336L456.192 600.384z"
      />
    </svg>
  );
}
