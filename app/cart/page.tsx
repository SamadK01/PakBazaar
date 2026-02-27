'use client';

import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const total = getCartTotal();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/products">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                            <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.category}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive/90"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button variant="ghost" className="text-destructive w-full justify-start pl-0" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>

                {/* Order Summary */}
                <div className="bg-muted/30 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>Rs. {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>Rs. {total.toLocaleString()}</span>
                        </div>
                    </div>
                    <Link href="/checkout" className="w-full">
                        <Button size="lg" className="w-full">Proceed to Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
