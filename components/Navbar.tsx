"use client";

import { User, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Market", href: "/products" },
        { name: "My Private", href: "/my-private" },
        { name: "Agents", href: "/#agents" },
        { name: "Proof", href: "/#proof" },
    ];

    return (
        <div className="fixed top-4 md:top-10 inset-x-0 z-[100] flex justify-center px-4 md:px-10 pointer-events-none">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="premium-glass pointer-events-auto flex items-center justify-between px-5 md:px-10 py-3 md:py-5 rounded-full w-full max-w-6xl border-white/20 border shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/60 backdrop-blur-3xl relative"
            >
                <div className="flex items-center gap-4">
                    {/* MOBILE MENU TOGGLE */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white/70 hover:text-white"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-2 md:gap-4 cursor-pointer"
                        >
                            <div className="relative flex items-center justify-center p-2 rounded-xl md:rounded-2xl border border-primary/10">
                                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                <motion.div
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 bg-primary/40 focus:blur-xl rounded-xl md:rounded-2xl"
                                />
                            </div>
                            <span className="text-sm md:text-xl font-heading font-black tracking-tighter glow-text uppercase">
                                PrivateCart
                            </span>
                        </motion.div>
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-full">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/5 hover:text-white transition-all"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-6">
                    <div className="hidden sm:flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-secondary/5 border border-secondary/10 rounded-full">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-accent rounded-full animate-pulse" />
                        <span className="text-[7px] md:text-[9px] font-black text-accent uppercase tracking-widest italic">Node Verified</span>
                    </div>

                    <div className="hidden sm:block w-[1px] h-4 bg-white/10" />

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 bg-white/[0.03] border border-white/10 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white transition-all shadow-inner"
                    >
                        <User className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="inline">Identity</span>
                    </motion.button>
                </div>

                {/* MOBILE MENU OVERLAY */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 mt-4 p-6 premium-glass rounded-[2rem] border border-white/10 bg-black/90 backdrop-blur-sm lg:hidden flex flex-col gap-4"
                        >
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/5"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
};
