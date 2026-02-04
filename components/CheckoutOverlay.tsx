"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, RefreshCcw, Cpu, CheckCircle } from "lucide-react";

interface CheckoutOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    step: "review" | "processing" | "success";
    cartItemsCount: number;
    onPayment: () => void;
    onReturnToMarket: () => void;
}

export const CheckoutOverlay = ({
    isOpen,
    onClose,
    step,
    cartItemsCount,
    onPayment,
    onReturnToMarket
}: CheckoutOverlayProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-xl bg-[#0A0A0B] border border-white/5 rounded-2xl md:rounded-[3rem] p-8 md:p-12 text-center shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
                    >
                        <div className="absolute top-6 right-6 md:top-8 md:right-8">
                            <button onClick={onClose} className="text-white/20 hover:text-white p-2"><X className="w-5 h-5" /></button>
                        </div>

                        {step === "review" && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-heading font-bold">NEAR 1Click Intent</h2>
                                <p className="text-white/80">Review your payment intent. This transaction is secured via TEE and settled on NEAR blockchain.</p>

                                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-left space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white">Items ({cartItemsCount})</span>
                                        <span>{cartItemsCount > 0 ? "Multiple" : "Empty"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/80">Network Fee</span>
                                        <span className="text-green-400">0.0001 NEAR</span>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between font-bold">
                                        <span>Estimated Total</span>
                                        <span className="text-primary tracking-tight">Calculating...</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 justify-center p-4 bg-primary/5 border border-primary/10 rounded-2xl text-[10px] font-mono text-primary/60 uppercase">
                                    <Shield className="w-3 h-3" /> Client-Side Encryption Scope: ACTIVE
                                </div>

                                <button
                                    onClick={onPayment}
                                    className="w-full py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform active:scale-95"
                                >
                                    Confirm & Execute Payment
                                </button>
                            </div>
                        )}

                        {step === "processing" && (
                            <div className="py-20 flex flex-col items-center">
                                <div className="relative mb-12">
                                    <RefreshCcw className="w-24 h-24 text-primary animate-spin-slow opacity-20" />
                                    <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-heading font-bold mb-4">Securing Hardware Enclave</h2>
                                <div className="space-y-4 max-w-sm mx-auto">
                                    {[
                                        { l: "Initializing Intel TDX Enclave", s: "done" },
                                        { l: "Establishing TLS 1.3 Channel", s: "done" },
                                        { l: "Broadcasting Signed Intent via NEAR", s: "loading" },
                                    ].map((stepItem, i) => (
                                        <div key={i} className="flex items-center justify-between text-[11px] font-mono">
                                            <span className="text-white/80">{stepItem.l}</span>
                                            {stepItem.s === "done" ? <CheckCircle className="w-3 h-3 text-green-500" /> : <RefreshCcw className="w-3 h-3 text-primary animate-spin ml-10" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === "success" && (
                            <div className="space-y-8 py-12">
                                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-10 border border-green-500/30">
                                    <CheckCircle className="w-12 h-12 text-green-400" />
                                </div>
                                <h2 className="text-4xl font-heading font-bold">Purchase Successful</h2>
                                <p className="text-white/80 max-w-sm mx-auto">
                                    Your intent was successfully settled. Receipt encrypted and stored in your vault.
                                </p>
                                <div className="pt-8">
                                    <button
                                        onClick={onReturnToMarket}
                                        className="px-12 py-5 bg-white/5 border border-white/10 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
                                    >
                                        Back to Marketplace
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
