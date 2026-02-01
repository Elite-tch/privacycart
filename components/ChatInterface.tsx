"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Zap, ShieldCheck, Search, Image as ImageIcon, Sparkles, Command, Cpu, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message, Product, INITIAL_MESSAGES, MOCK_PRODUCTS } from "@/data/mock-data";

const springTransition = { type: "spring", stiffness: 400, damping: 40 };

export const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response with "Computational" stages
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Analysis complete. I've successfully routed your query through the Near AI Private Enclave. Your data remained encrypted throughout the search across decentralized inventory nodes.`,
                products: MOCK_PRODUCTS.slice(0, 3),
                timestamp: new Date(),
                status: 'verifying'
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col h-[750px] w-full max-w-5xl mx-auto rounded-[3rem] overflow-hidden premium-glass border-white/5 relative group shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            {/* 1. TOP SECURE HEADER */}
            <div className="absolute top-0 left-0 right-0 p-8 z-30 flex items-center justify-between pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 bg-black/40 backdrop-blur-3xl px-5 py-2 rounded-full border border-white/10 pointer-events-auto"
                >
                    <div className="relative">
                        <Cpu className="w-3.5 h-3.5 text-primary" />
                        <span className="absolute inset-0 bg-primary blur-md opacity-30 animate-pulse" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] italic text-white/60">Enclave Secure Session</span>
                </motion.div>

                <div className="flex items-center gap-6 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-secondary rounded-full animate-ping" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary">Live Node</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <button className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">
                        End Trace
                    </button>
                </div>
            </div>

            {/* 2. MAIN CONVERSATION ENGINE */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-10 pt-28 space-y-16 scrollbar-hide bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.03)_0%,transparent_50%)]"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "flex flex-col gap-4 w-full",
                                msg.role === 'user' ? "items-end" : "items-start"
                            )}
                        >
                            {msg.role === 'assistant' && (
                                <div className="flex items-center gap-3 ml-2">
                                    <Terminal className="w-3 h-3 text-white/20" />
                                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] font-mono">Agent.v1 // Oracle</span>
                                </div>
                            )}

                            <div className={cn(
                                "relative max-w-[85%] px-8 py-5 rounded-[2.5rem] text-[0.95rem] font-medium leading-[1.6] transition-all",
                                msg.role === 'user'
                                    ? "bg-white text-black rounded-tr-none shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                    : "bg-white/[0.03] border border-white/10 text-white/90 rounded-tl-none shadow-inner"
                            )}>
                                {msg.content}
                            </div>

                            {msg.products && (
                                <div className="flex gap-8 mt-6 w-full overflow-x-auto pb-10 px-2 snap-x scrollbar-hide">
                                    {msg.products.map((product, pIdx) => (
                                        <PremiumProductCard key={product.id} product={product} delay={pIdx * 0.1} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-3 ml-2">
                            <Cpu className="w-3 h-3 text-primary animate-spin-slow" />
                            <span className="text-[9px] font-bold text-primary/60 uppercase tracking-[0.3em]">Processing Secure Intent</span>
                        </div>
                        <div className="px-8 py-5 rounded-[2.5rem] bg-white/[0.03] border border-white/10 border-dashed w-fit flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" />
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse [animation-delay:0.4s]" />
                            <span className="text-xs text-white/20 ml-2 font-mono italic">await near_ai.compute()...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* 3. INPUT ARCHITECTURE */}
            <div className="p-10 pt-2 bg-gradient-to-t from-black to-transparent">
                <motion.div
                    className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-5 pr-5 shadow-inner group-focus-within:border-primary/40 group-focus-within:bg-black/40 transition-all"
                >
                    <div className="pl-3 pr-6 border-r border-white/10">
                        <Command className="w-5 h-5 text-white/20" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(e as any)}
                        placeholder="Query the enclave... e.g. 'Find premium coffee beans, budget $30'"
                        className="flex-1 bg-transparent border-none focus:ring-0 px-6 text-sm font-medium placeholder:text-white/10 text-white"
                    />
                    <div className="flex items-center gap-4">
                        <button type="button" className="text-white/20 hover:text-white transition-colors">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="bg-white text-black h-14 w-14 rounded-[1.25rem] flex items-center justify-center transition-all hover:bg-primary hover:text-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] disabled:opacity-20 flex-shrink-0"
                        >
                            <Send className="w-6 h-6" />
                        </motion.button>
                    </div>
                </motion.div>

                <div className="flex items-center justify-center gap-12 mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/10">
                    <span className="flex items-center gap-2 italic hover:text-white/30 cursor-help transition-colors"><ShieldCheck className="w-3 h-3" /> FIPS 140-2 Level 3</span>
                    <span className="flex items-center gap-2 italic hover:text-white/30 cursor-help transition-colors"><Zap className="w-3 h-3" /> Defuse Fast-Bridge</span>
                    <span className="flex items-center gap-2 italic hover:text-white/30 cursor-help transition-colors"><Sparkles className="w-3 h-3" /> Near AI v1.5</span>
                </div>
            </div>
        </div>
    );
};

const PremiumProductCard = ({ product, delay }: { product: Product, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay }}
            whileHover={{ y: -15, scale: 1.02 }}
            className="flex-shrink-0 w-[320px] bg-white/[0.04] border border-white/5 rounded-[3rem] p-8 group hover:border-primary/40 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.4)] snap-center"
        >
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-black/40 border border-white/5 flex items-center justify-center">
                <Search className="w-16 h-16 text-white/5" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                {product.ecoFriendly && (
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-secondary/10 backdrop-blur-3xl border border-secondary/20 rounded-full text-[9px] font-black text-secondary uppercase tracking-[0.2em] shadow-2xl">
                        Authentic
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{product.provider}</span>
                    <h4 className="text-xl font-heading font-black tracking-tight leading-none group-hover:text-primary transition-colors">{product.name}</h4>
                </div>

                <p className="text-[0.8rem] text-white/30 leading-relaxed line-clamp-2">
                    "{product.description}"
                </p>

                <div className="pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[7px] font-bold text-white/20 uppercase tracking-[0.4em] mb-1">Index Price</span>
                        <span className="text-2xl font-black tracking-tighter">${product.price}</span>
                    </div>
                    <button className="bg-white text-black h-14 w-14 rounded-full flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-90 shadow-xl">
                        <Zap className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
