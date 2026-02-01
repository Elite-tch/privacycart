"use client";

import React from "react";
import { Shield, User, Globe, Activity, Lock } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
    return (
        <div className="fixed top-10 left-0 right-0 z-50 flex justify-center px-10 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.1 }}
                className="premium-glass pointer-events-auto flex items-center justify-between px-10 py-5 rounded-full w-full max-w-6xl border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-3xl"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 cursor-pointer"
                >
                    <div className="relative flex items-center justify-center p-2.5 bg-primary/20 rounded-2xl border border-primary/30">
                        <Shield className="w-5 h-5 text-primary" />
                        <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/40 focus:blur-xl rounded-2xl"
                        />
                    </div>
                    <span className="text-xl font-heading font-black tracking-tighter glow-text uppercase">
                        PrivateCart
                    </span>
                </motion.div>

                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-full">
                    {["Market", "Vault", "Agents", "Proof"].map((item) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#fff" }}
                            className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 transition-all"
                        >
                            {item}
                        </motion.a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-secondary/5 border border-secondary/10 rounded-full">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-secondary uppercase tracking-widest italic">Node Verified</span>
                    </div>

                    <div className="w-[1px] h-4 bg-white/10" />

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-3 bg-white/[0.03] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all shadow-inner"
                    >
                        <User className="w-4 h-4" />
                        Identity
                    </motion.button>
                </div>
            </motion.nav>
        </div>
    );
};
