"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Zap,
  Fingerprint,
  ArrowRight,
  EyeOff,
  Cpu,
  Globe,
  Server,
  Layers,
  Database,
  Terminal,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- REUSABLE COMPONENTS ---

const SectionHeader = ({ title, subtitle, className }: { title: string, subtitle: string, className?: string }) => (
  <div className={cn("mb-16", className)}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-lg text-white/80 max-w-2xl leading-relaxed"
    >
      {subtitle}
    </motion.p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }: { icon: any, title: string, desc: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 premium-glass rounded-3xl group border-white/5 hover:border-primary/20 transition-all duration-500 hover:bg-white/[0.03]"
  >
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-inner border border-white/5">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
    <p className="text-white/80 leading-relaxed text-sm group-hover:text-white/60 transition-colors">
      {desc}
    </p>
  </motion.div>
);

const StepCard = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="flex gap-6 items-start group">
    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm text-white/40 group-hover:border-primary/50 group-hover:text-primary transition-colors bg-white/[0.02]">
      {number}
    </div>
    <div className="pt-2">
      <h4 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-purple-500/30 overflow-x-hidden font-sans">

      {/* PLAIN BLACK BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#0A0A0B]" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ top: '10%', right: '10%' }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-violet-600/10 rounded-full filter blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ bottom: '10%', left: '10%' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-[10px] md:text-sm pt-4 md:pt-20 font-medium tracking-wider uppercase mb-4 md:mb-6 block">Privacy First Commerce</span>
            <h1 className="font-outfit text-3xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Private AI Powered Shopping
            </h1>
            <p className="text-base sm:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              PrivateCart is a privacy-first AI shopping assistant powered by NEAR blockchain and Trusted Execution Environments. Your shopping data stays yours.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/products" className="px-8 py-4 bg-gradient-to-r from-accent to-violet-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-accent/50 transition-all flex items-center gap-2 group">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/#architecture" className="px-8 py-4 border border-accent/50 text-foreground rounded-full font-medium hover:bg-accent/10 transition-all">
              View Architecture
            </Link>
          </motion.div>


        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="relative z-10 py-12 px-6 max-w-[1440px] mx-auto border-t border-white/5" id="features">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader title="The Privacy Crisis" subtitle="Traditional AI shopping assistants are surveillance engines. Every search, click, and purchase is tracked, stored, and sold." className="mb-6" />
            <ul className="space-y-4">
              {[
                "Your financial data is exposed to centralized servers.",
                "AI models are trained on your personal shopping habits.",
                "Payment intent is visible to every intermediary."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-auto  h-full min-h-[400px]   border border-red-500/10 p-4 flex flex-col justify-center items-center text-center "
          >
            <div className="absolute inset-0 blur-3xl rounded-full opacity-20 animate-pulse" />
            <EyeOff className="w-24 h-24 text-red-500 mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-red-700 relative z-10 font-heading">DATA LEAKAGE DETECTED</h3>
            <p className="text-red-500 text-sm font-mono mt-4 relative z-10 bg-red-950/30 px-4 py-2 rounded-lg border border-red-500/10">
              LOG: USER_INTENT_EXPOSED <br /> IP: 192.168.1.X TRACKED
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="relative z-10 py-12 px-6 max-w-[1440px] mx-auto" id="how-it-works">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionHeader title="The Secure Bridge" subtitle="PrivateCart mediates your interaction with the digital economy. Your intent is encrypted client-side, processed in a TEE, and settled on-chain." className="mb-0" />
        </div>

        {/* Solution Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto p-6 md:p-12 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/20 blur-[60px] md:blur-[100px] rounded-full opacity-50" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            {/* Client */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors shadow-lg">
                <Globe className="w-8 h-8 text-white/60 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-bold">Client</p>
                <p className="text-xs text-white/40 font-mono">ENCRYPTED INPUT</p>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex flex-1 h-[2px] bg-gradient-to-r from-white/10 via-primary/50 to-white/10 items-center justify-center relative">
              <div className="absolute -top-10  text-[10px] font-mono text-white/80 bg-[#0A0A0B] px-2 py-1 rounded border border-white/5">TLS 1.3 CHANNEL</div>
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <ArrowRight className="w-4 h-4 text-primary" />
              </motion.div>
            </div>

            {/* TEE */}
            <div className="flex flex-col items-center gap-4 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse opacity-50" />
                <div className="w-24 h-24 rounded-2xl bg-[#0A0A0B] flex items-center justify-center border border-primary/50 relative z-10 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <Cpu className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-primary">Secure Enclave</p>
                <p className="text-xs text-primary/60 font-mono">INTEL TDX INFRA</p>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex flex-1 h-[2px] bg-gradient-to-r from-white/10 via-secondary/50 to-white/10 items-center justify-center relative">
              <div className="absolute -top-10 text-[10px] font-mono text-white/80 bg-[#0A0A0B] px-2 py-1 rounded border border-white/5">SIGNED INTENT</div>
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              >
                <ArrowRight className="w-4 h-4 text-secondary" />
              </motion.div>
            </div>

            {/* Blockchain */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-secondary/50 transition-colors shadow-lg">
                <Server className="w-8 h-8 text-white/60 group-hover:text-secondary transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-bold">Blockchain</p>
                <p className="text-xs text-white/40 font-mono">SETTLEMENT</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. KEY FEATURES */}
      <section className="relative z-10 py-12 px-6 max-w-[1440px] mx-auto">
        <SectionHeader title="System Capabilities" subtitle="Built for the sovereign individual. Combining the best of AI intelligence with rigorous cryptographic guarantees." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Fingerprint}
            title="Privacy by Default"
            desc="Client-side encryption ensures your raw data never leaves your device in plaintext. Only the TEE sees the decryption key."
          />
          <FeatureCard
            icon={Cpu}
            title="AI TEE Assistant"
            desc="LLaMA 3.1 running inside Intel TDX enclaves. Verifiable computation that proves no data logs were kept."
            delay={0.1}
          />
          <FeatureCard
            icon={Zap}
            title="NEAR Intents"
            desc="One-click cross-chain swaps. Pay with BTC or ETH, settle in USDC. Abstracted away via Chain Signatures."
            delay={0.2}
          />
          <FeatureCard
            icon={Layers}
            title="Obsidian Stealth UI"
            desc="A distracting-free, professional interface designed for high-focus commerce operations."
            delay={0.3}
          />
          <FeatureCard
            icon={Database}
            title="Encrypted History"
            desc="Your purchase history is stored on-chain but encrypted with your key. You own your data, literally."
            delay={0.4}
          />
          <FeatureCard
            icon={Terminal}
            title="Shade Agents"
            desc="Autonomous background workers that monitor prices and inventory without revealing your IP or intent."
            delay={0.5}
          />
        </div>
      </section>


      {/* 6. SECURITY & PRIVACY */}
      <section className="relative z-10 py-12 px-6 max-w-[1440px] mx-auto" id="security">
        <div className="rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-6 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-30" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Zero Data Leakage.</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              We don't trust servers. We verify hardware. Every transaction is backed by cryptographic proofs and hardware isolation guarantees.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["AES-256 Client Encryption", "Intel SGX/TDX", "FIPS 140-2 Compliant", "Non-Custodial keys"].map(badge => (
                <span key={badge} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-white/60">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/10 bg-black text-center">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-40">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-4 h-4" />
            <span className="font-heading font-bold tracking-widest text-xs">PRIVACYCART</span>
          </div>
          <p className="font-mono text-[10px]">BUILT FOR THE NEAR AI HACKATHON 2026</p>
        </div>
      </footer>
    </main>
  );
}
