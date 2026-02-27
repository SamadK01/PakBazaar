'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { Product } from '@/lib/data';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProductDetailActions({ product }: { product: Product }) {
    const addToCart = useCart((state) => state.addToCart);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        toast.success(`${product.name} added to cart`);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4">
            <Button
                size="lg"
                className="w-full md:w-auto text-lg h-12"
                onClick={handleAddToCart}
                disabled={isAdded}
            >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <p className="text-sm text-muted-foreground">
                Order now and get it within 3-5 business days.
            </p>
        </div>
    );
}
