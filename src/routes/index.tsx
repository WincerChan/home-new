import {
    createEffect,
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
} from "solid-js";
import { isServer } from "solid-js/web";
import { createAsync, query } from "@solidjs/router";
import Plausible from "plausible-tracker";
import Footer from "../components/Footer";

const portfolio = [
    {
        title: "SolVanityCL",
        description: "GPU vanity address generator for Solana",
        url: "https://github.com/WincerChan/SolVanityCL",
    },
    {
        title: "TalkGPT",
        description: "CLI tool for voice conversation with ChatGPT",
        url: "https://github.com/WincerChan/TalkGPT",
    },
    {
        title: "QXRelayConv",
        description: "Quantumult X relay proxy conversion tool",
        url: "https://github.com/WincerChan/QXRelayConv",
    },
    {
        title: "Meme Generator",
        description: "Meme Generator for pure JavaScript",
        url: "https://github.com/WincerChan/Meme-Generator",
    },
];

const footprints = [
    {
        icon: "i-tabler-pencil",
        text: "Blog",
        url: "https://blog.itswincer.com",
    },
    {
        icon: "i-tabler-brand-github",
        text: "GitHub",
        url: "https://github.com/WincerChan",
    },
    {
        icon: "i-tabler-photo",
        text: "Moments",
        url: "https://moments.itswincer.com",
    },
    {
        icon: "i-tabler-microphone",
        text: "Podcast",
        url: "https://podcast.itswincer.com",
    },
];

type ApiPost = {
    title?: string;
    url?: string;
    category?: string;
    published_at?: string;
    updated_at?: string;
};

type ApiResponse = {
    total: number;
    hits?: ApiPost[];
};

type Post = {
    date: string;
    title: string;
    url: string;
    category: string;
};

const API_BASE = (
    import.meta.env.DEV
        ? "http://localhost:8080"
        : "https://inkstone.itswincer.com"
).replace(/\/$/, "");

const getPosts = query(async (): Promise<Post[]> => {
    const today = new Date().toLocaleDateString("en-CA");
    const response = await fetch(
        `${API_BASE}/v2/search?q=range:~${today}&limit=5&sort=latest`,
    );
    if (!response.ok) return [];
    const payload = (await response.json()) as ApiResponse;
    return (payload.hits ?? []).flatMap((post) => {
        if (!post.title || !post.url) return [];
        return [
            {
                title: post.title,
                url: post.url,
                category: post.category ?? "Uncategorized",
                date: post.published_at ?? post.updated_at ?? "",
            },
        ];
    });
}, "posts");

export const route = {
    preload: () => getPosts(),
};

const PersonalWebsite = () => {
    const posts = createAsync(() => getPosts());
    const [currentIndex, setCurrentIndex] = createSignal(0);
    const formatPostDate = (date: string) => (date ? date.split("T")[0] : "N/A");
    const safePosts = () => posts() ?? [];
    let carouselRef: HTMLDivElement;
    let scrollDistance = 0;
    onMount(() => {
        if (isServer) return;
        const { enableAutoPageviews } = Plausible({
            domain: "itswincer.com",
            hashMode: true,
            apiHost: "https://track.itswincer.com",
            trackLocalhost: true,
        });
        enableAutoPageviews();
        const setScrollDistance = () => {
            setCurrentIndex(0);
            if (window.innerWidth < 640)
                scrollDistance = window.innerWidth - 32 + 48;
            else scrollDistance = 28 * 16;
        };
        setScrollDistance();
        window.addEventListener("resize", setScrollDistance);
        onCleanup(() =>
            window.removeEventListener("resize", setScrollDistance),
        );
    });
    createEffect(() => {
        carouselRef.scrollLeft = currentIndex() * scrollDistance;
    });
    const scroll = (event: UIEvent) => {
        const target = event.target as HTMLElement;
        // console.log(target.scrollLeft, target.scrollWidth);
        if (target.scrollLeft === target.scrollWidth - target.clientWidth)
            setCurrentIndex(portfolio.length - 1);
        if (target.scrollLeft === 0) setCurrentIndex(0);
    };

    return (
        <main class="bg-[#EFEFEF]">
            <style>
                {`
          .cursor {
              animation: cursor-blink 1.2s steps(1) infinite;
          }
          @keyframes cursor-blink {
              from {
                  opacity: 1;
              }
              50% {
                  opacity: 0;
              }
          }
          .scroll-container::-webkit-scrollbar {
            width: 4px;
            display: none;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: #2F4F4F; /* 滑块的颜色 */
            border-radius: 4px;
          }
          .scroll-container {
            scrollbar-color: #2F4F4F transparent; /* 滑块颜色 轨道颜色 */
            scrollbar-width: thin;
          }
          `}
            </style>
            <div class="max-w-3xl text-[#343041] font-headline sm:pt-18 sm:pb-8 py-8 mx-auto md:space-y-12 space-y-8 md:px-6 px-4 min-h-screen flex flex-col">
                {/* Header with gradient stripes */}
                <div class="">
                    <div class="sm:mb-0.5 scale-y-60 -mb-7 sm:scale-100">
                        <For each={[...Array(11)]}>
                            {(_, idx) => (
                                <div
                                    class="bg-[#2F4F4F]"
                                    style={{
                                        height: `${idx()}px`,
                                        "margin-bottom": `${15 - idx() * 1.37}px`,
                                    }}
                                />
                            )}
                        </For>
                    </div>
                    <h1 class=" flex flex-col z-10 justify-end md:h-32 h-16vw bg-[#2F4F4F] ">
                        <span class="md:text-[96px] text-12vw font-headline md:leading-[70.1px] leading-[8.76vw] font-semibold text-[#EFEFEF] md:-ml-[6.3px] -ml-[0.75vw]">
                            <span class="cursor">I</span>
                            'm Wincer
                        </span>
                    </h1>
                    <h2 class="">
                        <span class="md:text-[96px] text-12vw font-headline md:leading-[70.1px] leading-[8.76vw] font-semibold md:-ml-[6.3px] -ml-[0.75vw]">
                            <span class="cursor">I</span>T craftsman
                        </span>
                    </h2>
                    <p class="font-semibold leading-loose md:text-[32px] text-6vw md:-ml-0.5">
                        Developer, Designer, Blogger
                    </p>
                </div>

                {/* Footprints section */}
                <section class="">
                    <div class="relative">
                        <a
                            href="#footprints"
                            class="md:inline-block hover:text-[#2F4F4F] w-6 h-6 i-tabler-link absolute md:top-1.3rem top-2.5vw md:-left-2.2rem hidden "
                        />
                        <h3
                            id="footprints"
                            class="md:text-[32px] text-6vw mb-4 -ml-0.5 leading-loose"
                        >
                            Footprints
                        </h3>
                    </div>
                    <div class="flex gap-4 md:gap-6 flex-wrap">
                        <For each={footprints}>
                            {(item) => (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    class="inline-flex items-center gap-2 py-1 px-3 bg-[#2F4F4F] text-[#EFEFEF]"
                                >
                                    <i
                                        class={`inline-block ${item.icon} w-6 h-6`}
                                    />
                                    <span class="md:text-xl">{item.text}</span>
                                </a>
                            )}
                        </For>
                    </div>
                </section>

                {/* Writings section */}
                <section class="">
                    <div class="relative">
                        <a
                            href="#writings"
                            class="md:inline-block hover:text-[#2F4F4F] w-6 h-6 i-tabler-link absolute md:top-1.3rem top-2.5vw md:-left-2.2rem hidden "
                        />
                        <h3
                            id="writings"
                            class="md:text-[32px] text-6vw mb-4 -ml-0.5 leading-loose"
                        >
                            Writings
                        </h3>
                    </div>
                    <div class="space-y-4">
                        <For each={safePosts()}>
                            {(post) => (
                                <div class="flex md:gap-8 gap-6 items-center">
                                    <div>
                                        <div class="text-gray-500 font-mono text-sm whitespace-nowrap">
                                            {formatPostDate(post.date)}
                                        </div>
                                        <div class="text-gray-500 flex items-center justify-end text-sm whitespace-nowrap">
                                            <i class="i-tabler-bookmark w-4 h-4 inline-block" />
                                            <span class="inline-block text-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href={post.url}
                                        class="hover:text-[#2F4F4F] md:text-[22px] text-lg leading-relaxed hover:underline"
                                    >
                                        {post.title}
                                    </a>
                                </div>
                            )}
                        </For>
                    </div>
                </section>

                {/* Portfolio section */}
                <section class="">
                    <div class="relative">
                        <a
                            href="#portfolio"
                            class="md:inline-block hover:text-[#2F4F4F] w-6 h-6 i-tabler-link absolute md:top-1.3rem top-2.5vw md:-left-2.2rem hidden "
                        />
                        <h3
                            id="portfolio"
                            class="md:text-[32px] text-6vw mb-4 -ml-0.5 leading-loose"
                        >
                            Portfolio
                        </h3>
                    </div>
                    <div class=" relative w-full">
                        <Show when={currentIndex() !== 0}>
                            <button
                                onclick={() =>
                                    setCurrentIndex((prev) => prev - 1)
                                }
                                class="absolute z-10 -left-4  top-[calc(50%-1rem)] w-8 h-8 bg-[#E8F5E9]  border-l-2 border-[#2F4F4F] "
                            >
                                <i class="text-[#343041] block mx-auto i-tabler-arrow-left w-5 h-5" />
                            </button>
                        </Show>

                        <Show when={currentIndex() !== portfolio.length - 1}>
                            <button
                                onclick={() =>
                                    setCurrentIndex((prev) => prev + 1)
                                }
                                class="absolute z-10 -right-4 top-[calc(50%-1rem)] w-8 h-8 bg-[#E8F5E9] border-r-2  border-[#2F4F4F] "
                            >
                                <i class="text-[#343041] block mx-auto i-tabler-arrow-right w-5 h-5" />
                            </button>
                        </Show>
                        <div
                            ref={(el) => (carouselRef = el)}
                            onscroll={scroll}
                            class="overflow-x-auto w-full relative scroll-smooth scroll-container"
                        >
                            <div class="gap-12 w-fit flex transition-transform duration-500">
                                <For each={portfolio}>
                                    {(item) => (
                                        <div class="bg-[#E8F5E9] md:p-8 p-6 sm:w-100 w-[calc(100vw-2rem)] h-56 inline-flex flex-col">
                                            <h4 class="text-2xl font-semibold mb-2">
                                                {item.title}
                                            </h4>
                                            <p class="text-lg text-gray-600 mb-4">
                                                {item.description}
                                            </p>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                class="inline-flex mt-auto ml-auto bg-[#2F4F4F] items-center gap-1 text-[#EFEFEF] px-3 py-1 hover:underline"
                                            >
                                                <span>Learn more</span>
                                                <i class=" w-6 h-6 block i-tabler-arrow-up-right" />
                                            </a>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
};

export default PersonalWebsite;
