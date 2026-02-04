"use client";

import { User, ShoppingCart, } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
    return (
        <div className="fixed top-6 md:top-10 left-0 right-0 z-50 flex justify-center px-4 md:px-10 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.1 }}
                className="premium-glass pointer-events-auto flex items-center justify-between px-6 md:px-10 py-3 md:py-5 rounded-full w-full max-w-6xl border-white/20 border shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-3xl"
            >
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
                        <span className="text-base md:text-xl font-heading font-black tracking-tighter glow-text uppercase">
                            PrivateCart
                        </span>
                    </motion.div>
                </Link>

                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-full">
                    {["Market", "My Private", "Agents", "Proof"].map((item) => (
                        <Link
                            key={item}
                            href={
                                item === "Market" ? "/products" :
                                    item === "My Private" ? "/my-private" :
                                        `/#${item.toLowerCase()}`
                            }
                            className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/5 hover:text-white transition-all"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden sm:flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-secondary/5 border border-secondary/10 rounded-full">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-accent rounded-full animate-pulse" />
                        <span className="text-[7px] md:text-[9px] font-black text-accent uppercase tracking-widest italic">Node Verified</span>
                    </div>

                    <div className="hidden xs:block w-[1px] h-4 bg-white/10" />

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 bg-white/[0.03] border border-white/10 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white transition-all shadow-inner"
                    >
                        <User className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden xs:inline">Identity</span>
                    </motion.button>
                </div>
            </motion.nav>
        </div>
    );
};
