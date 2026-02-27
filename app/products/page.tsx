import ProductsBrowser from '@/components/ProductsBrowser';
import type { Product } from '@/lib/data';

interface ProductsPageProps {
    searchParams: {
        category?: string;
        search?: string;
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const res = await fetch(`${process.env.AUTH_URL || ''}/api/products`, { cache: 'no-store' });
    const products: Product[] = await res.json();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                Products
            </h1>
            <ProductsBrowser products={products} />
        </div>
    );
}
