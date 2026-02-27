'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductsBrowser({ products }: { products: Product[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const category = sp.get('category') || '';
  const search = sp.get('search') || '';
  const categoryParam = category.toLowerCase();

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      let matchesCategory = true;
      let matchesSearch = true;

      if (category) {
        const pc = product.category.toLowerCase();
        if (categoryParam === 'fashion') {
          matchesCategory = pc === 'men' || pc === 'women';
        } else {
          matchesCategory = pc === categoryParam;
        }
      }

      if (search) {
        const s = search.toLowerCase();
        matchesSearch =
          product.name.toLowerCase().includes(s) ||
          product.description.toLowerCase().includes(s);
      }

      return matchesCategory && matchesSearch;
    });
  }, [products, category, categoryParam, search]);

  const setCategory = (cat?: string) => {
    const params = new URLSearchParams(sp.toString());
    if (!cat) {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="flex flex-col space-y-2">
            <Button
              variant={!category ? 'default' : 'ghost'}
              className="justify-start w-full"
              onClick={() => setCategory(undefined)}
            >
              All Categories
            </Button>
            {categories.map((cat) => {
              const isSelected =
                categoryParam === cat.toLowerCase() ||
                (categoryParam === 'fashion' &&
                  ['men', 'women'].includes(cat.toLowerCase()));
              return (
                <Button
                  key={cat}
                  variant={isSelected ? 'default' : 'ghost'}
                  className="justify-start w-full"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found.</p>
            <Link href="/products">
              <Button variant="link" className="mt-4">
                Clear Filters
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

