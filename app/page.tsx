import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/data";
import productsData from "@/data/products.json";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Clock } from "lucide-react";

export default async function Home() {
  const products = (productsData as Product[]) ?? [];
  const featuredProducts = products.filter((product) => product.featured);
  const categories = Array.from(new Set(products.map((p) => p.category))).slice(0, 6);

  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4 md:py-32">
        <div className="container mx-auto flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover Quality.<br /> Experience Luxury.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Shop the latest trends in fashion, electronics, and home essentials.
            Delivered straight to your doorstep across Pakistan.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <Button size="lg" className="rounded-full text-lg h-12 px-8">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products?category=Fashion">
              <Button size="lg" variant="outline" className="rounded-full text-lg h-12 px-8 text-black bg-white hover:bg-gray-100 border-none">
                Explore Fashion
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 bg-secondary/20 rounded-lg">
          <Truck className="h-10 w-10 mb-4 text-primary" />
          <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
          <p className="text-muted-foreground">Quick and reliable shipping all over Pakistan.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-secondary/20 rounded-lg">
          <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
          <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
          <p className="text-muted-foreground">Cash on Delivery and secure online payment options.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-secondary/20 rounded-lg">
          <Clock className="h-10 w-10 mb-4 text-primary" />
          <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
          <p className="text-muted-foreground">Our support team is always ready to help you.</p>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat} href={`/products?category=${cat}`} className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              {/* Placeholder images for categories if I had them, or just text */}
              <span className="relative z-20 text-white font-bold text-xl">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
