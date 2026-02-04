"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { Product } from "@/types";

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cart: Product[];
    onRemoveItem: (index: number) => void;
    onCheckout: () => void;
}

export const DashboardSidebar = ({ isOpen, onClose, cart, onRemoveItem, onCheckout }: DashboardSidebarProps) => {
    const totalPrice = cart.reduce((acc, product) => {
        const price = parseFloat(product.price.split(' ')[0]);
        return acc + price;
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Sidebar Container */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0B] border-l border-white/5 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                                    <ShoppingCart className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold">Your Intent Cart</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Secure Vault Session</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-8 no-scrollbar space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 px-10">
                                    <ShoppingCart className="w-12 h-12 mb-4" />
                                    <h3 className="text-lg font-bold uppercase tracking-widest">Cart is Empty</h3>
                                    <p className="text-xs">Your secure intent sessions will appear here once you select products.</p>
                                </div>
                            ) : (
                                cart.map((item, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={`${item.id}-${idx}`}
                                        className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-4 hover:bg-white/[0.04] transition-all"
                                    >
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-sm font-bold truncate pr-8">{item.name}</h4>
                                            <p className="text-xs text-white/40 mb-2">{item.provider}</p>
                                            <div className="text-primary font-bold">{item.price}</div>
                                        </div>
                                        <button
                                            onClick={() => onRemoveItem(idx)}
                                            className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/0 hover:bg-red-500/10 text-white/10 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Summary */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-white/5 bg-black/40 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/40">Subtotal Intent Value</span>
                                        <span className="font-bold">{totalPrice.toFixed(2)} NEAR</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/40">Network Gas Fee</span>
                                        <span className="text-green-400">0.0001 NEAR</span>
                                    </div>
                                    <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">{(totalPrice + 0.0001).toFixed(4)} NEAR</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-primary/60">
                                    <ShieldCheck className="w-4 h-4" /> E2E Encrypted Intent Locked
                                </div>

                                <button
                                    onClick={onCheckout}
                                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-3 group"
                                >
                                    Proceed to TEE Checkout
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
