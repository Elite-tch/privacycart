"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

import { Product } from "@/types";

interface ProductDetailsModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

const PrivacyBadge = ({ level }: { level: Product["privacyLevel"] }) => (
    <div className={cn(
        "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
        level === "Verified" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
    )}>
        <Shield className="w-3 h-3" />
        {level}
    </div>
);

export const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart }: ProductDetailsModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && product && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        layoutId={`product-${product.id}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#1A1A1E] border border-white/5 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-20 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                            <div className="relative aspect-video md:aspect-auto bg-black flex items-center justify-center">
                                <img src={product.image} className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1E] via-transparent to-transparent md:hidden" />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col">
                                <div className="flex gap-2 mb-6">
                                    <PrivacyBadge level={product.privacyLevel} />
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        TEE SECURED
                                    </div>
                                </div>

                                <h2 className="md:text-4xl text-2xl font-heading font-bold mb-4">{product.name}</h2>
                                <p className="text-white/80 mb-8 leading-relaxed">{product.description}</p>

                                <div className="space-y-4 mb-10">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Technical Context</h4>
                                    {product.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-white/80">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            {detail}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-white/5 flex md:items-center gap-4 md:flex-row flex-col justify-between">
                                    <div>
                                        <p className="text-xs text-white/80 font-bold uppercase mb-1">Total Intent Value</p>
                                        <div className="md:text-3xl text-lg font-bold">{product.price}</div>
                                    </div>
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        className="px-5 py-4 bg-white text-black rounded-3xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
