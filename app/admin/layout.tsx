'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    const sidebarItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <div className="h-16 flex items-center justify-center border-b">
                    <Link href="/" className="text-xl font-bold text-primary">
                        PakBazaar Admin
                    </Link>
                </div>
                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                                    <Icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                    <Link href="/admin/login">
                        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
