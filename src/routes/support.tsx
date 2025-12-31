import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Title } from "@solidjs/meta";
import Footer from "../components/Footer";

export default function Support() {
    return (
        <main class="bg-[#EFEFEF]">
            <Title>Support | Wincer</Title>
            <div class="max-w-3xl text-[#343041] font-headline sm:pt-18 sm:pb-8 py-8 mx-auto md:space-y-12 space-y-8 md:px-6 px-4 min-h-screen flex flex-col">
                 {/* Header */}
                 <div>
                     <div class="mb-8">
                        <A href="/" class="inline-flex items-center gap-2 text-[#2F4F4F] hover:underline">
                            <i class="i-ph-arrow-left w-5 h-5" />
                            Back to Home
                        </A>
                    </div>

                    <h1 class="md:text-[64px] text-10vw font-headline font-semibold text-[#2F4F4F] leading-tight mb-4">
                        Support
                    </h1>
                    <p class="md:text-xl text-lg leading-relaxed">
                        If you enjoy my content across my blog, moments, or podcast, consider supporting my work.
                    </p>
                </div>

                {/* WeChat Support */}
                <section class="">
                    <h2 class="text-3xl font-semibold mb-6 flex items-center gap-3">
                        <i class="i-ph-wechat-logo-duotone text-[#2F4F4F] w-8 h-8" />
                        WeChat Pay
                    </h2>
                    <div class="bg-white/50 p-8 flex flex-col items-center justify-center border-2 border-dashed border-[#2F4F4F]/30 rounded-lg">
                         <div class="w-48 h-48 bg-[#2F4F4F]/10 flex items-center justify-center mb-4">
                            <span class="text-[#2F4F4F] font-mono text-sm">QR Code Placeholder</span>
                        </div>
                        <p class="text-sm text-gray-500">Scan to sponsor via WeChat</p>
                    </div>
                </section>

                {/* Crypto Support */}
                <section class="">
                    <h2 class="text-3xl font-semibold mb-6 flex items-center gap-3">
                        <i class="i-ph-currency-eth-duotone text-[#2F4F4F] w-8 h-8" />
                        Crypto
                    </h2>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        {/* ETH */}
                        <div class="bg-white/50 p-6 flex flex-col gap-4">
                            <div class="flex items-center gap-2 font-semibold text-lg">
                                <span class="i-ph-currency-eth w-6 h-6 text-[#627EEA]" />
                                Ethereum (ETH)
                            </div>
                            <div class="aspect-square bg-[#2F4F4F]/10 flex items-center justify-center">
                                 <span class="text-[#2F4F4F] font-mono text-xs">ETH QR Placeholder</span>
                            </div>
                            <div class="bg-gray-100 p-2 text-xs font-mono break-all text-center select-all cursor-pointer hover:bg-gray-200 transition-colors">
                                0x0000000000000000000000000000000000000000
                            </div>
                        </div>

                        {/* SOL */}
                        <div class="bg-white/50 p-6 flex flex-col gap-4">
                            <div class="flex items-center gap-2 font-semibold text-lg">
                                {/* Using a placeholder icon if solana isn't in phosphor or unocss preset default, fallback to circle */}
                                <span class="i-ph-currency-btc w-6 h-6 text-[#9945FF]" /> 
                                Solana (SOL)
                            </div>
                             <div class="aspect-square bg-[#2F4F4F]/10 flex items-center justify-center">
                                 <span class="text-[#2F4F4F] font-mono text-xs">SOL QR Placeholder</span>
                            </div>
                             <div class="bg-gray-100 p-2 text-xs font-mono break-all text-center select-all cursor-pointer hover:bg-gray-200 transition-colors">
                                Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
}
