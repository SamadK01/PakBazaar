export interface Product {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    description: string;
    image: string;
    stock: number;
    featured?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        slug: 'wireless-noise-cancelling-headphones',
        name: 'ProBass Wireless Headphones',
        category: 'Electronics',
        price: 8500,
        originalPrice: 12000,
        description: 'Experience premium sound quality with ProBass noise-cancelling headphones. Up to 30 hours of battery life and ultra-comfortable ear cushions.',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        stock: 25,
        featured: true,
    },
    {
        id: '2',
        slug: 'smart-fitness-watch-v2',
        name: 'FitTrack Smart Watch V2',
        category: 'Electronics',
        price: 4500,
        originalPrice: 6000,
        description: 'Track your fitness goals with precision. Features heart rate monitoring, sleep tracking, and IP68 water resistance.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
        stock: 50,
        featured: true,
    },
    {
        id: '3',
        slug: 'premium-leather-wallet-men',
        name: 'Classic Leather Wallet',
        category: 'Men',
        price: 1800,
        description: 'Handcrafted from genuine leather. Sleek design with multiple card slots and a coin pocket. Perfect for everyday use.',
        image: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&w=800&q=80',
        stock: 100,
    },
    {
        id: '4',
        slug: 'organic-cotton-tshirt',
        name: 'Organic Cotton Basic Tee',
        category: 'Men',
        price: 1200,
        originalPrice: 1500,
        description: 'Soft, breathable, and sustainable. Made with 100% organic cotton for ultimate comfort.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        stock: 75,
        featured: true,
    },
    {
        id: '5',
        slug: 'elegant-summer-dress',
        name: 'Floral Summer Maxi Dress',
        category: 'Women',
        price: 3500,
        originalPrice: 4200,
        description: 'Beautiful floral print maxi dress, perfect for summer outings. Lightweight fabric with a flattering fit.',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
        stock: 30,
        featured: true,
    },
    {
        id: '6',
        slug: 'designer-handbag',
        name: 'Luxury Tote Bag',
        category: 'Women',
        price: 6500,
        description: 'Spacious and stylish tote bag for all your essentials. High-quality faux leather with gold-tone hardware.',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        stock: 20,
    },
    {
        id: '7',
        slug: 'ceramic-coffee-mug-set',
        name: 'Minimalist Ceramic Mug Set',
        category: 'Home',
        price: 2200,
        description: 'Set of 4 handcrafted ceramic mugs. Minimalist design, microwave and dishwasher safe.',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80',
        stock: 40,
    },
    {
        id: '8',
        slug: 'bamboo-plant-pot',
        name: 'Indoor Bamboo Plant Stand',
        category: 'Home',
        price: 1500,
        description: 'Add a touch of nature to your home with this elegant bamboo plant stand. Includes a ceramic pot.',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
        stock: 15,
    },
    {
        id: '9',
        slug: 'vitamin-c-serum',
        name: 'Radiance Vitamin C Serum',
        category: 'Beauty',
        price: 1950,
        description: 'Brightening serum with 20% Vitamin C and Hyaluronic Acid. Promotes glowing, youthful skin.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        stock: 60,
        featured: true,
    },
    {
        id: '10',
        slug: 'hydrating-face-moisturizer',
        name: 'Daily Hydrating Moisturizer',
        category: 'Beauty',
        price: 1250,
        description: 'Lightweight, non-greasy moisturizer for all skin types. Provides 24-hour hydration.',
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80',
        stock: 80,
    }
];
