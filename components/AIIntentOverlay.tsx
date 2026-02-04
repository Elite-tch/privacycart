"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Send,
    LockKeyhole,
    RefreshCcw,
    Shield,
    Binary
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface AIIntentOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    initialQuery: string;
    onSelectProduct: (product: Product) => void;
}

const AI_SUGGESTIONS: Product[] = [
    {
        id: "p-ai-1",
        name: "Titan Crypto Vault H3",
        price: "124.0 NEAR",
        provider: "Titan Security",
        privacyLevel: "Verified",
        image: "/titan_wallet_h3_1770176875785.png",
        description: "Military-grade hardware wallet with air-gapped signing. The ultimate gift for secure asset management.",
        details: ["Air-gapped", "Biometric", "Self-Custody"]
    },
    {
        id: "p-ai-2",
        name: "Nebula Privacy Tablet",
        price: "85.0 NEAR",
        provider: "Nebula Labs",
        privacyLevel: "High",
        image: "/nebula_tablet_1770176859877.png",
        description: "Hardware-level kill switches for camera and mic. Pre-loaded with secure node software.",
        details: ["Kill switches", "E-Ink mode", "Decentralized OS"]
    }
];

export const AIIntentOverlay = ({ isOpen, onClose, initialQuery, onSelectProduct }: AIIntentOverlayProps) => {
    const [step, setStep] = useState<"loading" | "intent">("loading");
    const [chatInput, setChatInput] = useState("");
    const [dialogue, setDialogue] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            runEnclaveSequence();
        } else {
            setStep("loading");
            setDialogue([]);
        }
    }, [isOpen]);

    const runEnclaveSequence = async () => {
        // 1. Initial Loading Pause
        await new Promise(r => setTimeout(r, 2000));

        // 2. Set the ONLY text the user wants
        setDialogue([{
            role: 'ai',
            content: "Accessing Encrypted Vault Record #0x42A. All personal metadata is being processed locally within the enclave. No raw data is visible to external servers."
        }]);

        // 3. Wait before revealing products
        await new Promise(r => setTimeout(r, 2500));

        // Final reasoning update to bridge to products
        setDialogue(prev => [...prev, {
            role: 'ai',
            content: "Matched with 'Secure Gift' criteria from your historical vault data. I have curated these hardware-verified devices for your consideration."
        }]);

        setStep("intent");
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        const msg = chatInput;
        setChatInput("");
        setDialogue(prev => [...prev, { role: 'user', content: msg }]);

        setTimeout(() => {
            setDialogue(prev => [...prev, {
                role: 'ai',
                content: "Refining parameters within the secure enclave... Results updated."
            }]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* MAIN SLIDING TERMINAL - SUPER SLOW SLIDE */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 50, // Higher damping for extreme smoothness
                            stiffness: 70, // Lower stiffness for slower movement
                            mass: 1.5
                        }}
                        className="relative w-full md:max-w-[85%] h-full bg-[#050505] border-l border-white/5 shadow-[-50px_0_150px_rgba(0,0,0,1)] flex flex-col"
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* MINIMAL CONTENT AREA */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-24 no-scrollbar">
                            <div className="max-w-4xl mx-auto space-y-16">

                                {/* USER QUERY HEADING */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border-b border-white/5 pb-8"
                                >
                                    <h2 className="text-2xl md:text-4xl font-heading font-medium italic text-white/90 leading-tight">
                                        "{initialQuery}"
                                    </h2>
                                </motion.div>

                                {/* DIALOGUE SECTION (ONLY THE REQUESTED TEXT) */}
                                <div className="space-y-12 ">
                                    {dialogue.map((d, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1.2 }}
                                            className="flex gap-8 items-start"
                                        >
                                            <div className="w-12 h-12 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                                <LockKeyhole className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xl md:text-2xl font-medium text-white/90 leading-tight tracking-tight">
                                                    {d.content}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* INITIAL LOADING STATE */}
                                    {dialogue.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-40 gap-8">
                                            <RefreshCcw className="w-12 h-12 text-primary animate-spin-slow opacity-40" />
                                            <div className="text-xs font-black uppercase tracking-[0.5em] text-white/20">Initialising Enclave Secure Context</div>
                                        </div>
                                    )}

                                    {/* PRODUCT GRID (THE "RESPONDS") */}
                                    {step === "intent" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12"
                                        >
                                            {AI_SUGGESTIONS.map((product, idx) => (
                                                <div
                                                    key={product.id}
                                                    className="group bg-white/[0.02] border border-white/5 rounded-lg p-6 hover:bg-white/[0.04] transition-all duration-700 shadow-2xl"
                                                >
                                                    <div className="aspect-[16/10] rounded-lg overflow-hidden mb-10 bg-black shadow-inner">
                                                        <img
                                                            src={product.image}
                                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 "
                                                        />
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="text-3xl font-heading font-bold">{product.name}</h3>
                                                            <div className="text-2xl font-bold text-primary">{product.price}</div>
                                                        </div>
                                                        <p className="text-base text-white/40 leading-relaxed font-medium">
                                                            {product.description}
                                                        </p>
                                                        <div className="flex gap-4  pt-6">

                                                            <button
                                                                onClick={() => onSelectProduct(product)}
                                                                className="flex-1 py-3  rounded-[1.5rem] bg-primary text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-[1.02] transition-all"
                                                            >
                                                                Select
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SUBTLE COMMAND BAR AT THE BOTTOM */}
                        <div className="p-12 pt-0">
                            <form
                                onSubmit={handleSendMessage}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-2 pl-10 focus-within:border-primary/50 transition-all backdrop-blur-3xl">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Refine constraints..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm md:text-lg py-4 md:py-6 placeholder:text-white/10"
                                    />
                                    <button
                                        type="submit"
                                        className="p-6 rounded-[2rem] bg-primary text-white ml-4 hover:scale-105 transition-all shadow-xl"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
