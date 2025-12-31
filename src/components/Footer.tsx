import { A } from "@solidjs/router";

export default function Footer() {
    return (
        <footer class="mt-auto pt-8 text-center text-sm text-gray-500">
            <div class="flex flex-col items-center justify-center gap-2">
                <div class="flex items-center gap-1">
                    <i class="i-ph-copyright w-5 h-5 inline-block" />
                    2017 - {new Date().getFullYear()}{" "}
                    <i class="i-ph-heart-fill mx-1 w-5 h-5 text-[#f20c00] inline-block" />{" "}
                    Made by Wincer, all rights reversed.
                </div>
                <div class="flex gap-4">
                    <A
                        href="/privacy"
                        class="hover:text-[#2F4F4F] hover:underline"
                    >
                        Privacy
                    </A>
                    <A
                        href="/support"
                        class="hover:text-[#2F4F4F] hover:underline"
                    >
                        Support
                    </A>
                </div>
            </div>
        </footer>
    );
}
