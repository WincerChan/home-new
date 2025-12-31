import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import Footer from "../components/Footer";

const CopyableAddress = (props: { label: string, address: string, icon: string, iconColor: string }) => {
    const [copied, setCopied] = createSignal(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(props.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            class="bg-white/50 p-5 flex flex-col gap-3 text-left w-full hover:bg-white transition-all border border-[#2F4F4F]/10 hover:border-[#2F4F4F]/30 rounded-xl group relative overflow-hidden"
            title="Click to copy address"
        >
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2 font-semibold text-lg text-[#2F4F4F]">
                    <span class={`${props.icon} w-6 h-6 ${props.iconColor}`} />
                    {props.label}
                </div>
                <div class="text-[#2F4F4F]/40 group-hover:text-[#2F4F4F] transition-colors">
                    <Show when={copied()} fallback={<i class="i-tabler-copy w-5 h-5" />}>
                        <i class="i-tabler-check w-5 h-5 text-green-600" />
                    </Show>
                </div>
            </div>

            <div class="w-full bg-[#F5F5F5] p-3 rounded-lg text-xs font-mono break-all text-gray-600 group-hover:bg-[#EFEFEF] transition-colors">
                {props.address}
            </div>

            <Show when={copied()}>
                <div class="absolute inset-0 bg-green-500/5 flex items-center justify-center pointer-events-none">
                     <span class="text-green-600 font-bold bg-white/95 px-3 py-1 rounded shadow-sm text-sm border border-green-100">Copied!</span>
                </div>
            </Show>
        </button>
    );
};

export default function Support() {
    return (
        <main class="bg-[#EFEFEF]">
            <Title>Support | Wincer</Title>
            <div class="max-w-3xl text-[#343041] font-headline sm:pt-18 sm:pb-8 py-8 mx-auto md:space-y-12 space-y-8 md:px-6 px-4 min-h-screen flex flex-col">
                 {/* Header */}
                 <div>
                     <div class="mb-8">
                        <A href="/" class="inline-flex items-center gap-2 text-[#2F4F4F] hover:underline">
                            <i class="i-tabler-arrow-left w-5 h-5" />
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
                <section>
                    <h2 class="text-3xl font-semibold mb-6 flex items-center gap-3">
                        <i class="i-tabler-brand-wechat text-[#2F4F4F] w-8 h-8" />
                        WeChat Pay
                    </h2>
                    <div class="bg-white/50 p-8 flex flex-col items-center justify-center border-2 border-dashed border-[#2F4F4F]/30 rounded-lg">
                         <div class="w-48 h-48 flex items-center justify-center mb-4">
                            <img
                                src="https://ae01.alicdn.com/kf/HTB1o49SQ9zqK1RjSZPx7634tVXaZ.png"
                                alt="WeChat Pay QR Code"
                                class="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <p class="text-sm text-gray-500">Scan to sponsor via WeChat</p>
                    </div>
                </section>

                {/* Crypto Support */}
                <section>
                    <h2 class="text-3xl font-semibold mb-6 flex items-center gap-3">
                        <i class="i-tabler-currency-bitcoin text-[#2F4F4F] w-8 h-8" />
                        Crypto
                    </h2>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <CopyableAddress 
                            label="Ethereum (ETH)"
                            address="0x8108003004784434355758338583453734488488"
                            icon="i-tabler-currency-ethereum"
                            iconColor="text-[#627EEA]"
                        />
                        <CopyableAddress 
                            label="Solana (SOL)"
                            address="PRM3ZUA5N2PRLKVBCL3SR3JS934M9TZKUZ7XTLUS223"
                            icon="i-tabler-currency-solana"
                            iconColor="text-[#9945FF]"
                        />
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
}