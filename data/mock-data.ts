export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    ecoFriendly: boolean;
    provider: string;
}

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    products?: Product[];
    timestamp: Date;
    status?: 'sent' | 'thinking' | 'verifying';
}

export interface ShadeAgent {
    id: string;
    type: 'price' | 'shipping' | 'restock';
    item: string;
    status: 'active' | 'success' | 'alert';
    details: string;
    lastUpdate: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Allbirds Tree Dashers',
        description: 'Responsive, everyday running shoe made with FSC®-certified eucalyptus tree fiber.',
        price: 98,
        image: '/products/allbirds.webp',
        category: 'Footwear',
        rating: 4.8,
        ecoFriendly: true,
        provider: 'Allbirds Store'
    },
    {
        id: 'p2',
        name: 'Veja V-10 Sneakers',
        description: 'Sustainably made sneakers in Brazil with organic cotton and wild rubber.',
        price: 115,
        image: '/products/veja.webp',
        category: 'Footwear',
        rating: 4.7,
        ecoFriendly: true,
        provider: 'EcoMarket'
    },
    {
        id: 'p3',
        name: 'Patagonia Nano Puff Jacket',
        description: 'Warm, windproof, water-resistant—the Nano Puff® Jacket uses incredibly lightweight and highly compressible insulation.',
        price: 199,
        image: '/products/patagonia.webp',
        category: 'Apparel',
        rating: 4.9,
        ecoFriendly: true,
        provider: 'Patagonia'
    },
    {
        id: 'p4',
        name: 'Terracotta Planter Set',
        description: 'Hand-fired terracotta pots with optimized drainage for indoor succulents.',
        price: 48,
        image: '/products/planter.webp',
        category: 'Gardening',
        rating: 4.6,
        ecoFriendly: false,
        provider: 'Artisan Goods'
    }
];

export const INITIAL_MESSAGES: Message[] = [
    {
        id: 'm1',
        role: 'assistant',
        content: "Hello! I'm your PrivateCart agent. I can help you find products privately and execute cross-chain purchases. What are you looking for today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
];

export const ACTIVE_AGENTS: ShadeAgent[] = [
    {
        id: 'a1',
        type: 'price',
        item: 'Sony WH-1000XM5',
        status: 'active',
        details: 'Target: < $299 | Current: $348',
        lastUpdate: '2 mins ago'
    },
    {
        id: 'a2',
        type: 'shipping',
        item: 'Mechanical Keyboard',
        status: 'active',
        details: 'Out for delivery via UPS',
        lastUpdate: '1 hour ago'
    },
    {
        id: 'a3',
        type: 'restock',
        item: 'NVIDIA RTX 5080',
        status: 'alert',
        details: 'In Stock at BestBuy!',
        lastUpdate: 'Just now'
    }
];
