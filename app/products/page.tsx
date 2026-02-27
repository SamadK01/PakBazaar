import ProductsBrowser from '@/components/ProductsBrowser';
import type { Product } from '@/lib/data';
import { Suspense } from 'react';

interface ProductsPageProps {
    searchParams: {
        category?: string;
        search?: string;
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    let products: Product[] = [];
    try {
        const res = await fetch(`/api/products`, { cache: 'no-store' });
        if (res.ok) {
            products = await res.json();
        }
    } catch {
        products = [];
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                Products
            </h1>
            <Suspense fallback={<div>Loading filters…</div>}>
                <ProductsBrowser products={products} />
            </Suspense>
        </div>
    );
}
