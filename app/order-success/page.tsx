'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
            <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            {orderId && (
                <p className="text-2xl font-semibold mb-4 text-primary">
                    Order #{orderId}
                </p>
            )}
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Thank you for your purchase. Your order has been received and will be processed shortly.
            </p>
            <Link href="/">
                <Button size="lg">Continue Shopping</Button>
            </Link>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
