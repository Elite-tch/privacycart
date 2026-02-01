"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Sparkles, Zap, Fingerprint, Target, Cpu, Globe, ArrowRight } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#020203] text-white selection:bg-primary/30 overflow-x-hidden font-sans">
      {/* 1. LAYERED BACKGROUND ARCHITECTURE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Mesh Gradients */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-primary/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary/10 blur-[140px] rounded-full"
        />

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />

        {/* Central Radial Focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.05)_0%,transparent_60%)]" />
      </div>

      <Navbar />

      {/* 2. HERO SECTION (THE HOOK) */}
      <section className="relative z-10 pt-48 pb-20 px-6 max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-8 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Powered by Near AI Enclave</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-heading font-black tracking-tight leading-[0.9] glow-text max-w-4xl"
          >
            Sovereign Shopping <br />
            <span className="italic text-primary">Zero Trace</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-lg text-white/40 max-w-2xl font-medium uppercase tracking-[0.1em] leading-relaxed"
          >
            The world's most advanced privacy-native shopping agent. <br />
            Encrypted in TEE. Settled on Chain. Managed by You.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6 pt-4"
          >
            <button className="px-8 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Start Shopping
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              Learn Protocol <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>



        {/* 4. FOOTER DIAGNOSTICS */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-5 gap-12 pt-16 border-t border-white/5">
          {[
            { label: "Protocol", value: "NEAR_v1.2", icon: Globe },
            { label: "Compute", value: "TEE_INTEL_TDX", icon: Cpu },
            { label: "Signatures", value: "NEAR_MPC", icon: Shield },
            { label: "Settlement", value: "DEFUSE_PROTO", icon: Zap },
            { label: "Privacy", value: "ZERO_TRACE", icon: Fingerprint },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + (i * 0.1) }}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <item.icon className="w-5 h-5 text-white/10 group-hover:text-primary transition-colors" />
              <div>
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 block">
                  {item.label}
                </span>
                <span className="text-sm font-black text-white/60 font-heading">
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extreme Visual Polish: Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [Math.random() * 1000, Math.random() * 1000],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </main>
  );
}
