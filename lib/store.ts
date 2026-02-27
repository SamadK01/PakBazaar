import type { Product } from "@/lib/data";
import productsData from "@/data/products.json";
import { getSupabaseServerClient } from "@/lib/supabase";
import { create } from "zustand";

export async function listProducts(): Promise<Product[]> {
  const sb = getSupabaseServerClient();
  if (sb) {
    const { data, error } = await sb.from("products").select("*").order("id");
    if (!error && Array.isArray(data)) {
      return data as Product[];
    }
  }
  return (productsData as Product[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const sb = getSupabaseServerClient();
  if (sb) {
    const { data, error } = await sb.from("products").select("*").eq("slug", slug).maybeSingle();
    if (!error && data) return data as Product;
  }
  const list = (productsData as Product[]) ?? [];
  return list.find((p) => p.slug === slug);
}

export async function createProduct(product: Product): Promise<Product> {
  const sb = getSupabaseServerClient();
  if (!sb) {
    throw new Error("Read-only in production: database not configured");
  }
  const { data, error } = await sb.from("products").insert(product).select().maybeSingle();
  if (error || !data) {
    throw new Error(error?.message || "Failed to insert");
  }
  return data as Product;
}

export async function updateProduct(product: Product): Promise<Product> {
  const sb = getSupabaseServerClient();
  if (!sb) {
    throw new Error("Read-only in production: database not configured");
  }
  const { data, error } = await sb.from("products").update(product).eq("id", product.id).select().maybeSingle();
  if (error || !data) {
    throw new Error(error?.message || "Failed to update");
  }
  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const sb = getSupabaseServerClient();
  if (!sb) {
    throw new Error("Read-only in production: database not configured");
  }
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === product.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  getCartTotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
