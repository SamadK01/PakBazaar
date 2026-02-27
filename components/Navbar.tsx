'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/UserNav';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const cart = useCart();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const cartItemCount = cart.getItemCount();

    return (
        <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>PakBazaar</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-8">
                            <Link href="/" className="text-lg font-medium hover:text-primary">
                                Home
                            </Link>
                            <Link href="/products" className="text-lg font-medium hover:text-primary">
                                All Products
                            </Link>
                            <Link href="/products?category=Electronics" className="text-lg font-medium hover:text-primary">
                                Electronics
                            </Link>
                            <Link href="/products?category=Fashion" className="text-lg font-medium hover:text-primary">
                                Fashion
                            </Link>
                            <Link href="/admin/login" className="text-lg font-medium hover:text-primary">
                                Admin
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary shrink-0">
                    PakBazaar
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/products" className="hover:text-primary transition-colors">
                        Shop
                    </Link>
                    <Link href="/products?category=Electronics" className="hover:text-primary transition-colors">
                        Electronics
                    </Link>
                    <Link href="/products?category=Fashion" className="hover:text-primary transition-colors">
                        Fashion
                    </Link>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm relative">
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push('/products')}>
                        <Search className="h-5 w-5" />
                    </Button>

                    <UserNav />

                    <Link href="/cart">
                        <Button variant="outline" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {mounted && cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
