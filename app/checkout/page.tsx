'use client';

import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCart();
    const router = useRouter();
    const { data: session } = useSession();
    const total = getCartTotal();

    const [step, setStep] = useState<'auth' | 'details'>('auth');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
    });

    useEffect(() => {
        if (session?.user) {
            setStep('details');
            const [first, ...last] = (session.user.name || '').split(' ');
            setFormData(prev => ({
                ...prev,
                firstName: first || '',
                lastName: last.join(' ') || '',
                email: session.user?.email || '',
            }));
        }
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const orderId = Math.floor(100000 + Math.random() * 900000).toString();
        // Simulate order placement
        console.log('Order placed:', {
            ...formData,
            items,
            total,
            userId: session?.user?.email || 'guest',
            orderId
        });

        // Here you would send data to backend API

        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-success?orderId=${orderId}`);
    };

    if (items.length === 0) {
        // Avoid redirect loop if hydration mismatch, using effect or better check
        // For now returning null and effect redirect is safer but keeping simple for now
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Cart is empty</h1>
                <Button onClick={() => router.push('/products')}>Go Shopping</Button>
            </div>
        );
    }

    if (step === 'auth' && !session) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkout as Guest</CardTitle>
                            <CardDescription>No account required. Quick and easy.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                You'll have a chance to create an account later if you want.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => setStep('details')} variant="outline">
                                Continue as Guest
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sign in with Google</CardTitle>
                            <CardDescription>Save time and track your order easily.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Use your Google account to log in and autofill your details.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => signIn('google', { callbackUrl: '/checkout' })}>
                                Sign in with Google
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                            {session && <CardDescription>Logged in as {session.user?.email}</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} required onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} required onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} required onChange={handleChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" type="tel" value={formData.phone} required onChange={handleChange} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" value={formData.address} required onChange={handleChange} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} required onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input id="zip" name="zip" value={formData.zip} required onChange={handleChange} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 border p-4 rounded-lg bg-secondary/10">
                                <input type="radio" id="cod" name="payment" defaultChecked className="h-4 w-4" />
                                <Label htmlFor="cod" className="font-medium">Cash on Delivery (COD)</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}

                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>Rs. {total.toLocaleString()}</span>
                            </div>

                            <Button type="submit" size="lg" className="w-full mt-4">
                                Place Order
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
