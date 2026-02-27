'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/lib/store';
import { toast } from 'sonner';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCart((state) => state.addToCart);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        setIsAdded(true);
        toast.success(`${product.name} added to cart`);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Card className="overflow-hidden group h-full flex flex-col">
            <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                        Featured
                    </span>
                )}
            </Link>
            <CardContent className="p-4 flex-1">
                <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                <Link href={`/products/${product.slug}`} className="font-semibold hover:underline line-clamp-2 mb-2">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-lg">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    variant={isAdded ? "secondary" : "default"}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isAdded ? 'Added' : 'Add to Cart'}
                </Button>
            </CardFooter>
        </Card>
    );
}
