'use client';

import { useEffect, useMemo, useState } from 'react';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [dbStatus, setDbStatus] = useState<{ configured: boolean; canConnect: boolean; error?: string } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/products', { cache: 'no-store' });
            const data = await res.json();
            setProducts(data);
        };
        const checkDb = async () => {
            try {
                const r = await fetch('/api/db/status', { cache: 'no-store' });
                if (r.ok) {
                    const j = await r.json();
                    setDbStatus(j);
                    if (!j.canConnect) {
                        console.warn('DB not connected:', j.error);
                    }
                }
            } catch {}
        };
        load().then(checkDb);
    }, []);

    const canSave = useMemo(() => {
        return Boolean(
            currentProduct.name &&
            currentProduct.slug &&
            currentProduct.category &&
            typeof currentProduct.price === 'number' &&
            currentProduct.description &&
            currentProduct.image &&
            typeof currentProduct.stock === 'number'
        );
    }, [currentProduct]);

    const handleDelete = (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        fetch('/api/products', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id }),
        }).then(async (r) => {
            if (!r.ok) {
                toast.message('Deleted locally (not persisted)');
            } else {
                toast.success('Product deleted');
            }
            setProducts(products.filter((p) => p.id !== id));
        });
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleAddNew = () => {
        setCurrentProduct({
            id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
            stock: 0,
            price: 0,
            name: '',
            category: '',
            slug: '',
            description: '',
            image: '',
        });
        setIsEditing(false);
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (isEditing) {
            fetch('/api/products', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(currentProduct),
            }).then(async (r) => {
                if (r.ok) {
                    const updated = await r.json();
                    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
                    toast.success('Product updated');
                } else {
                    // Local-only fallback
                    try {
                        const err = await r.json();
                        toast.error(err?.error || 'Update failed');
                    } catch {
                        toast.error('Update failed');
                    }
                    setProducts(products.map((p) => (p.id === currentProduct.id ? (currentProduct as Product) : p)));
                    toast.message('Updated locally (not persisted)');
                }
            });
        } else {
            fetch('/api/products', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(currentProduct),
            }).then(async (r) => {
                if (r.ok) {
                    const created = await r.json();
                    setProducts([...products, created]);
                    toast.success('Product added');
                } else {
                    // Local-only fallback
                    try {
                        const err = await r.json();
                        toast.error(err?.error || 'Add failed');
                    } catch {
                        toast.error('Add failed');
                    }
                    setProducts([...products, currentProduct as Product]);
                    toast.message('Added locally (not persisted)');
                }
            });
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button onClick={handleAddNew}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            {!dbStatus?.canConnect && (
                <div className="p-3 border rounded-md bg-amber-50 text-amber-900 flex items-center justify-between">
                    <span>Database not configured. Changes won’t persist until you add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and create the table.</span>
                    <a href="/admin/db-setup">
                        <Button variant="outline" size="sm">Open Setup</Button>
                    </a>
                </div>
            )}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>Rs. {product.price.toLocaleString()}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(product.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="name" className="md:text-right">Name</Label>
                            <Input id="name" placeholder="e.g., ProBass Headphones" value={currentProduct.name || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value, slug: (e.target.value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="slug" className="md:text-right">Slug</Label>
                            <Input id="slug" placeholder="auto-generated from name" value={currentProduct.slug || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="category" className="md:text-right">Category</Label>
                            <Input id="category" placeholder="e.g., Electronics" value={currentProduct.category || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="price" className="md:text-right">Price</Label>
                            <Input id="price" type="number" min="0" step="1" placeholder="e.g., 8500" value={currentProduct.price ?? 0} onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="originalPrice" className="md:text-right">Original Price</Label>
                            <Input id="originalPrice" type="number" min="0" step="1" placeholder="optional" value={currentProduct.originalPrice ?? 0} onChange={(e) => setCurrentProduct({ ...currentProduct, originalPrice: Number(e.target.value) || undefined })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="stock" className="md:text-right">Stock</Label>
                            <Input id="stock" type="number" min="0" step="1" placeholder="e.g., 25" value={currentProduct.stock ?? 0} onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="image" className="md:text-right">Image URL</Label>
                            <Input id="image" placeholder="https://..." value={currentProduct.image || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })} className="md:col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-4">
                            <Label htmlFor="description" className="md:text-right pt-2">Description</Label>
                            <textarea id="description" placeholder="Short product description" value={currentProduct.description || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="md:col-span-3 border rounded-md p-2 h-24" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <Label htmlFor="featured" className="md:text-right">Featured</Label>
                            <div className="md:col-span-3">
                                <input id="featured" type="checkbox" checked={!!currentProduct.featured} onChange={(e) => setCurrentProduct({ ...currentProduct, featured: e.target.checked })} className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!canSave} onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
