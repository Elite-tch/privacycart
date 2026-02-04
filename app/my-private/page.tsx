"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Lock,
    Zap,
    History,
    Cpu,
    Fingerprint,
    Key,
    Activity,
    EyeOff,
    CheckCircle,
    ChevronRight,
    Search,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const ENCRYPTED_HISTORY = [
    { id: "tx_01", date: "2026-02-04 04:22", hash: "0x7a2...F39e", status: "Secured", product: "Quantum Sound X-1", value: "0.24 NEAR" },
    { id: "tx_02", date: "2026-02-03 18:12", hash: "0xbc1...eE21", status: "Secured", product: "Nova Smart Watch", value: "45.2 NEAR" },
    { id: "tx_03", date: "2026-02-02 21:05", hash: "0xfe8...28ab", status: "Secured", product: "Titan Wallet H3", value: "89.0 NEAR" },
];

const AGENTS = [
    { name: "Price Watcher", status: "Active", type: "Monitoring", uptime: "99.9%", icon: Activity },
    { name: "Privacy Auditor", status: "Active", type: "Security", uptime: "100%", icon: Shield },
    { name: "Intent Guard", status: "Idle", type: "Execution", uptime: "98.5%", icon: Zap },
];

// --- COMPONENTS ---

const DashboardCard = ({ children, title, icon: Icon, className }: { children: React.ReactNode, title: string, icon: any, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.03] transition-all", className)}
    >
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold">{title}</h3>
            </div>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </div>
        {children}
    </motion.div>
);

export default function VaultPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className="relative min-h-screen bg-[#0A0A0B] text-white selection:bg-primary/30 font-sans pb-40">
            {/* Background Grain */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            <div className="max-w-[1440px] mx-auto px-6 pt-40">
                {/* HEADER AREA */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Node: Verified Secure
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
                                TEE: Active
                            </div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-4"
                        >
                            Identity Vault
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-white/50 max-w-2xl"
                        >
                            Your sovereign command center. Manage encrypted purchase records, autonomous AI agents, and holographic identity proofs.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 bg-white/5 p-2 rounded-3xl border border-white/10"
                    >
                        <button className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                            Export Keys
                        </button>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Key className="w-5 h-5 text-primary" />
                        </div>
                    </motion.div>
                </div>

                {/* DASHBOARD GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 1. ENCRYPTED HISTORY (THE VAULT) */}
                    <DashboardCard title="Encrypted History" icon={History} className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-6 bg-white/[0.02] border border-white/5 rounded-2xl px-4 py-2">
                            <Search className="w-4 h-4 text-white/20" />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                className="bg-transparent border-none outline-none text-sm w-full py-2"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="space-y-4">
                            {ENCRYPTED_HISTORY.map((log) => (
                                <div key={log.id} className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl border border-white/5 hover:border-primary/30 hover:bg-white/[0.02] transition-all bg-black/40">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center font-mono text-white/20">
                                            {log.id.split('_')[1]}
                                        </div>
                                        <div>
                                            <div className="font-bold mb-1">{log.product}</div>
                                            <div className="font-mono text-[10px] text-white/40 flex items-center gap-2 uppercase tracking-widest">
                                                <Lock className="w-3 h-3" /> Hash: {log.hash}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-12">
                                        <div className="text-right">
                                            <div className="text-sm font-bold">{log.value}</div>
                                            <div className="text-[10px] text-white/30">{log.date}</div>
                                        </div>
                                        <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:text-primary transition-all opacity-0 group-hover:opacity-100">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>

                    {/* 2. AGENT COMMAND CENTER */}
                    <div className="space-y-8">
                        <DashboardCard title="Active Agents" icon={Zap}>
                            <div className="space-y-4">
                                {AGENTS.map((agent) => (
                                    <div key={agent.name} className="p-5 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <agent.icon className="w-5 h-5 text-primary" />
                                                <span className="font-bold text-sm">{agent.name}</span>
                                            </div>
                                            <div className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded uppercase tracking-tighter">
                                                {agent.status}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                            <span>Type: {agent.type}</span>
                                            <span>Uptime: {agent.uptime}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-4 border border-dashed border-white/10 rounded-3xl text-xs font-bold text-white/30 hover:text-white hover:border-white/30 transition-all uppercase tracking-widest bg-white/[0.01]">
                                    + Deploy New Agent
                                </button>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Privacy Proofs" icon={Fingerprint}>
                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-black border border-white/5">
                                    <div className="text-[10px] font-mono text-white/30 uppercase mb-4">Live Attestation Node</div>
                                    <div className="flex flex-col gap-2">
                                        {[
                                            { label: "TEE Integrity", status: "Verified" },
                                            { label: "Hardware Isolation", status: "Verified" },
                                            { label: "TLS 1.3 Encryption", status: "Active" }
                                        ].map(s => (
                                            <div key={s.label} className="flex justify-between items-center text-xs">
                                                <span className="text-white/40">{s.label}</span>
                                                <span className="text-green-400 flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> {s.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[10px] text-white/30 leading-relaxed italic">
                                    *All proofs are verifiable on-chain via NEAR 1Click Intent signatures and Intel TDX attestation reports.
                                </p>
                            </div>
                        </DashboardCard>
                    </div>
                </div>

                {/* FOOTER STATS */}
                <div className="mt-32 grid md:grid-cols-4 gap-12 border-t border-white/5 py-16">
                    <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Network Connectivity</div>
                        <div className="flex items-center gap-2 text-2xl font-bold font-heading">
                            <Activity className="w-5 h-5 text-primary" />
                            94.8 ms
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Total Assets Protected</div>
                        <div className="text-2xl font-bold font-heading">$4,281.00</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Privacy Rating</div>
                        <div className="text-2xl font-bold font-heading">SSS+</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Encryption Layer</div>
                        <div className="text-2xl font-bold font-heading">AES-256-GCM</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
