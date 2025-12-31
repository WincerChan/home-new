import { For } from "solid-js";
import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import Footer from "../components/Footer";

const privacyServices = [
    {
        name: "Kudos",
        desc: "Requires cookie. Backend generates a random 16-byte identifier to track if the user has liked the current path (article/gallery/podcast). Currently used in Blog.",
        tag: "Cookie Required",
    },
    {
        name: "Pulse",
        desc: "Statistics. Uses HMAC (user 16-byte identifier + daily timestamp). Does not track users across days.",
        tag: "No Tracking Cookie",
    },
];

export default function Privacy() {
    return (
        <main class="bg-[#EFEFEF]">
            <Title>Privacy | Wincer</Title>
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
                        Privacy
                    </h1>
                    <p class="md:text-xl text-lg leading-relaxed">
                        I value transparency. Here is how my self-hosted services handle your data.
                    </p>
                </div>

                {/* Content */}
                <section class="space-y-8">
                    <div class="grid gap-6">
                        <For each={privacyServices}>
                            {(item) => (
                                <div class="bg-white/50 border-l-4 border-[#2F4F4F] p-6">
                                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                        <h2 class="text-2xl font-semibold text-[#2F4F4F]">
                                            {item.name}
                                        </h2>
                                        <span class="px-3 py-1 bg-[#2F4F4F] text-[#EFEFEF] text-sm font-mono w-fit">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <p class="text-lg text-gray-700 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            )}
                        </For>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
}
