"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Search,
    Cpu,
    Globe,
    ArrowRight,
    Lock,
    ShoppingCart,
    History,
    Wallet,
    Zap,
    CheckCircle,
    Clock,
    Fingerprint,
    EyeOff,
    Server,
    Star,
    Info,
    X,
    CreditCard,
    RefreshCcw,
    User,
    Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- TYPES ---
import { Product } from "@/types";

// --- MOCK DATA ---
const PRODUCTS: Product[] = [
    {
        id: "p1",
        name: "Quantum Sound X-1",
        price: "0.24 NEAR",
        provider: "SoundSphere Labs",
        privacyLevel: "Verified",
        image: "/quantum_sound_x1_1770176846243.png",
        description: "Next-gen spatial audio headphones with local neural processing.",
        details: ["40h Battery Life", "Active Zero-Noise", "Client-Side EQ Store"]
    },
    {
        id: "p2",
        name: "Nebula Ultralight Tablet",
        price: "154.5 NEAR",
        provider: "Orbit Digital",
        privacyLevel: "High",
        image: "/nebula_tablet_1770176859877.png",
        description: "Privacy-first OS with hardware-level encryption toggles.",
        details: ["12.9\" OLED Display", "2TB Encrypted Storage", "Iris Biometric Auth"]
    },
    {
        id: "p3",
        name: "Titan Crypto Wallet H3",
        price: "89.0 NEAR",
        provider: "SecureVault",
        privacyLevel: "Verified",
        image: "/titan_wallet_h3_1770176875785.png",
        description: "Military-grade hardware wallet with air-gapped signature support.",
        details: ["FIPS 140-2 Level 3", "Bluetooth 5.0 LE", "Custom Secure Element"]
    },
    {
        id: "p4",
        name: "Nova Smart Watch",
        price: "45.2 NEAR",
        provider: "Aura Metrics",
        privacyLevel: "High",
        image: "/nova_smart_watch_1770176890215.png",
        description: "Health tracking that nevers uploads raw data to centralized clouds.",
        details: ["ECG Monitoring", "50m Water Resistance", "On-Device AI Health"]
    },
    {
        id: "p5",
        name: "Synapse Neural Keyboard",
        price: "0.08 NEAR",
        provider: "ThoughtFlow",
        privacyLevel: "Verified",
        image: "/synapse_keyboard_1770176905653.png",
        description: "Mechanical keyboard with encrypted keystroke transmission.",
        details: ["Hotswap PCB", "Gasket Mount", "Local Macro Storage"]
    },
    {
        id: "p6",
        name: "Vertex AR Glasses",
        price: "245.0 NEAR",
        provider: "RealityMesh",
        privacyLevel: "Verified",
        image: "/vertex_ar_glasses_1770176920348.png",
        description: "Augmented reality with spatial privacy zones.",
        details: ["8K Dual Displays", "LiDAR Mapping", "Privacy Eye Blocker"]
    }
];

const AGENTS = [
    { name: "Price Watcher", status: "Active", icon: Clock },
    { name: "Inventory Guard", status: "Monitoring", icon: Shield },
    { name: "Privacy Auditor", status: "Secured", icon: Lock },
];

// --- COMPONENTS ---

const PrivacyBadge = ({ level }: { level: Product["privacyLevel"] }) => (
    <div className={cn(
        "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
        level === "Verified" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
    )}>
        <Shield className="w-3 h-3" />
        {level}
    </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-heading font-bold mb-4">{title}</h2>
        <p className="text-white/50 max-w-2xl">{subtitle}</p>
    </div>
);

// --- MAIN PAGE ---

import { AIIntentOverlay } from "@/components/AIIntentOverlay";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";
import { CheckoutOverlay } from "@/components/CheckoutOverlay";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isAIOverlayOpen, setIsAIOverlayOpen] = useState(false);
    const [aiQuery, setAiQuery] = useState("");
    const [checkoutStep, setCheckoutStep] = useState<"review" | "processing" | "success">("review");
    const [cart, setCart] = useState<Product[]>([]);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);

    const handleAISearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (aiQuery.trim()) {
            setIsAIOverlayOpen(true);
        }
    };

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
        setSelectedProduct(null);
    };

    const startCheckout = () => {
        setIsCheckoutOpen(true);
        setCheckoutStep("review");
    };

    const handlePayment = () => {
        setCheckoutStep("processing");
        setTimeout(() => {
            setCheckoutStep("success");
        }, 4000);
    };

    // BODY SCROLL LOCK
    useEffect(() => {
        const isAnyOverlayOpen = !!selectedProduct || isCheckoutOpen || isAIOverlayOpen || isDashboardOpen;
        if (isAnyOverlayOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedProduct, isCheckoutOpen, isAIOverlayOpen, isDashboardOpen]);

    const removeFromCart = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    return (
        <main className="relative min-h-screen bg-[#0A0A0B] text-white selection:bg-primary/30 font-sans">


            {/* DASHBOARD TRIGGER (Top Corner) */}
            <div className="fixed top-28 md:top-32 right-4 md:right-10 z-30">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDashboardOpen(true)}
                    className="relative p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-[#1A1A1E] border border-white/5 shadow-2xl group cursor-pointer pointer-events-auto"
                >
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-primary transition-colors" />
                    {cart.length > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                            {cart.length}
                        </span>
                    )}
                </motion.button>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 pt-40 pb-20">

                {/* SEARCH & FILTERS */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
                    <SectionHeader
                        title="Sovereign Marketplace"
                        subtitle="Explore products through your private AI assistant. No tracking, no data leakage, pure commerce."
                    />
                    <div className="relative w-full lg:w-96 group">
                        <form onSubmit={handleAISearch} className="w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/30 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="Ask AI to find products..."
                                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 focus:border-primary/50 focus:bg-white/[0.04] outline-none transition-all text-xs md:text-sm font-medium"
                            />
                        </form>
                    </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-5 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
                            </div>

                            <div className="relative z-10">
                                <div className="aspect-[4/3] rounded overflow-hidden mb-6 bg-black">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover  transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                    />
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold mb-1">{product.name}</h3>
                                        <p className="text-sm text-white/80 font-medium">{product.provider}</p>
                                    </div>
                                    <PrivacyBadge level={product.privacyLevel} />
                                </div>

                                <div className="flex items-center justify-between mt-8">
                                    <div className="text-xl font-bold text-white tracking-tight">{product.price}</div>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 transition-all text-white font-bold  "
                                    >
                                        Quick Buy
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* SECURITY REASSURANCE SECTION */}
                <section className="mt-32 py-14 border-y border-white/5">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group cursor-default">
                                <Lock className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Encrypted Vault</h4>
                            <p className="text-white/80 text-sm">Purchase history is encrypted on-chain. Decryptable only with your non-custodial keys.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20 group cursor-default">
                                <Cpu className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">TEE Attestation</h4>
                            <p className="text-white/80 text-sm">AI reasoning occurs within hardware-isolated enclaves, preventing any provider access to raw intent data.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group cursor-default">
                                <Fingerprint className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Zero Local Leaks</h4>
                            <p className="text-white/80 text-sm">We store zero sensitive session data. Every interaction is ephemeral or cryptographically secured.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- MODALS & OVERLAYS --- */}
            <ProductDetailsModal
                isOpen={!!selectedProduct}
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />

            <CheckoutOverlay
                isOpen={isCheckoutOpen}
                step={checkoutStep}
                cartItemsCount={cart.length}
                onClose={() => setIsCheckoutOpen(false)}
                onPayment={handlePayment}
                onReturnToMarket={() => {
                    setIsCheckoutOpen(false);
                    setIsDashboardOpen(false);
                    setCart([]);
                    setCheckoutStep("review");
                }}
            />

            {/* 4. AI INTENT OVERLAY (THE TAKEOVER) */}
            <AIIntentOverlay
                isOpen={isAIOverlayOpen}
                onClose={() => {
                    setIsAIOverlayOpen(false);
                    setAiQuery(""); // Reset query on close
                }}
                initialQuery={aiQuery}
                onSelectProduct={(product) => {
                    setSelectedProduct(product);
                    setIsAIOverlayOpen(false); // Close overlay to show the details modal
                }}
            />

            {/* 5. DASHBOARD SIDEBAR (CART) */}
            <DashboardSidebar
                isOpen={isDashboardOpen}
                onClose={() => setIsDashboardOpen(false)}
                cart={cart}
                onRemoveItem={removeFromCart}
                onCheckout={() => {
                    setIsDashboardOpen(false);
                    startCheckout();
                }}
            />

            {/* FOOTER STATS */}
            <footer className="py-10 border-t border-white/5 opacity-40">
                <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center font-mono">
                    <div>
                        <div className="text-2xl font-bold mb-2">100%</div>
                        <div className="text-[10px] tracking-widest uppercase">Privacy Rate</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold mb-2">&lt; 2s</div>
                        <div className="text-[10px] tracking-widest uppercase">TEE Settlement</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold mb-2">0</div>
                        <div className="text-[10px] tracking-widest uppercase">Data Leaks</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold mb-2">NEAR</div>
                        <div className="text-[10px] tracking-widest uppercase">Infrastructure</div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
