import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-muted mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">PakBazaar</h3>
                        <p className="text-muted-foreground text-sm">
                            Your one-stop shop for everything. Quality products, best prices, and fast delivery across Pakistan.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary">Home</Link></li>
                            <li><Link href="/products" className="hover:text-primary">Shop All</Link></li>
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary">Returns & Exchanges</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
                        <div className="flex gap-4 mb-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to get special offers and updates.
                        </p>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} PakBazaar. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
