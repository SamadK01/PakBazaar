import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductDetailActions from './ProductDetailActions';
import type { Product } from '@/lib/data';

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: ProductPageProps) {
    const res = await fetch(`${process.env.AUTH_URL || ''}/api/products/${params.slug}`, { cache: 'no-store' });
    if (!res.ok) {
        notFound();
    }
    const product: Product = await res.json();
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                    Rs. {product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>
                    <div className="border-t pt-6 mt-auto">
                        <ProductDetailActions product={product} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-secondary/20 rounded-lg">
                            <span className="font-bold block mb-1">Authentic</span>
                            100% genuine products
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-lg">
                            <span className="font-bold block mb-1">Secure</span>
                            Safe payments & data
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: ProductPageProps) {
    const res = await fetch(`${process.env.AUTH_URL || ''}/api/products/${params.slug}`, { cache: 'no-store' });
    if (!res.ok) return {};
    const product: Product = await res.json();
    return { title: product.name };
}
