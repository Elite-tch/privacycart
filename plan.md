# 🛒 PrivateCart - Frontend Implementation Plan

## 🏗️ Architecture Overview
The PrivateCart frontend is a **Next.js 14+ (App Router)** application designed for high performance and deep privacy integration. It acts as the secure interface between the user, the NEAR blockchain, and the TEE (Trusted Execution Environment) where AI logic resides.

### 1. Layered Architecture
*   **View Layer (React/CSS):** Modern, fluid UI using Semantic HTML and Vanilla CSS with a Custom Design System.
*   **State Management (Zustand + React Query):**
    *   **Zustand:** For global ephemeral states (Chat history, Wallet status, UI mode).
    *   **React Query:** For caching and syncing server state (Product searches, On-chain purchase history, Agent status).
*   **Service Layer (Utility Modules):**
    *   `NearService`: Handles RPC calls, contract interactions, and wallet signatures.
    *   `AIService`: Manages streaming connections to NEAR AI Private Cloud.
    *   `IntentService`: Wrapper for 1Click API (NEAR Intents) for payment execution.
    *   `CryptoService`: Browser-side encryption/decryption using user keys.

---

## 🎨 Design System & Aesthetics
**Theme:** *Obsidian Stealth* (Premium Dark Mode with Glassmorphism)

### Design Tokens
*   **Colors:**
    *   `Background`: `#0A0A0B` (Deepest Charcoal)
    *   `Surface`: `rgba(255, 255, 255, 0.03)` (Frosted Glass)
    *   `Primary`: `#8B5CF6` (Vibrant Violet / NEAR AI)
    *   `Success`: `#10B981` (Emerald / Transaction Success)
    *   `Warning/Intent`: `#F59E0B` (Amber / Active Swaps)
*   **Effects:**
    *   `Backdrop`: `blur(12px)`
    *   `Border`: `1px solid rgba(255, 255, 255, 0.1)`
    *   `Shadow`: Neon glows for active agents.

### Typography
*   Primary: **Outfit** (Geometric and friendly)
*   Monospace: **JetBrains Mono** (For transaction hashes and logs)

---

## 🛠️ Feature Implementation Roadmap

### Phase 1: Foundation & Design System (Days 1-2)
- [ ] Initialize Next.js project with App Router.
- [ ] Implement `index.css` with comprehensive CSS Variable system.
- [ ] Build shared UI components: `GlassCard`, `NeoButton`, `DynamicIcon`.
- [ ] Setup NEAR Wallet Selector integration shell.

### Phase 2: AI Shopping Interface (Days 3-5)
- [ ] **The Chat Engine:**
    *   Implementation of a streaming message bubble system.
    *   Special "Thinking" skeleton for TEE latency periods.
- [ ] **Rich Intent Cards:**
    *   Standardized product cards including: Price, Provider, Privacy Level, and Buy Now button.
- [ ] **AI Context Provider:**
    *   Logic to bundle user message + (encrypted) history before sending to TEE.

### Phase 3: Payment & Intent Execution (Days 8-10)
- [ ] **Intent Execution Flow:**
    *   Integration of NEAR Intents 1Click API.
    *   "Payment Pending" modal showing real-time cross-chain swap status (BTC -> USDC).
    *   Interactive fee breakdown and slippage toggle.
- [ ] **Success Sequence:**
    *   Confetti/Micro-animation upon successful hash generation.

### Phase 4: Privacy Dash & Shade Agents (Days 15-17)
- [ ] **Agent Control Center:**
    *   Live dashboard for active monitoring agents (Price/Shipping).
    *   Visual representation of "Encrypted Vaults" (Your purchase data).
- [ ] **On-Chain History Viewer:**
    *   Local decryption of purchase records using `near-api-js`.

---

## 🔒 Security & Privacy Strategy
1.  **No Leaky Storage:** Sensitive user data (decrypted history) never touches `localStorage`. It persists only in memory during the active session.
2.  **Client-Side Scoping:** All encryption happens in the browser before data hits the NEAR RPC or AI Cloud.
3.  **Attestation Feedback:** UI visually confirms "Verifying TEE Authenticity" when AI responses are received, building user trust.

---

## 🚀 Performance Optimization
*   **Image Optimization:** Next/Image for product assets.
*   **Streaming UI:** Using Suspense for AI responses to prevent the interface from feeling "stale" or "frozen."
*   **Bundle Size:** Tree-shaking heavy blockchain libraries (`near-api-js`, `ethers`) to keep initial load < 200kb.

---

## 🧪 Testing Strategy
*   **Playwright:** For end-to-end "Search-to-Purchase" flow testing.
*   **Unit Tests:** For critical `CryptoService` logic (Encryption/Decryption parity).
*   **Audit Tooling:** Lighthouse scoring (Aiming for 95+ in Performance/SEO).
