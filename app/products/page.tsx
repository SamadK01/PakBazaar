import ProductsBrowser from '@/components/ProductsBrowser';
import type { Product } from '@/lib/data';
import productsData from '@/data/products.json';
import { Suspense } from 'react';

interface ProductsPageProps {
    searchParams: {
        category?: string;
        search?: string;
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const products = (productsData as Product[]) ?? [];

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
