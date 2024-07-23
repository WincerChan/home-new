import { createSignal, onMount } from "solid-js";

const Footer = function () {
    const [thisYear, setThisYear] = createSignal(2023);
    onMount(() => {
        setThisYear(new Date().getFullYear());
    })
    return (
        <footer class="text-center py-6">
            <p class="text-sm 2xl:text-base text-rosyBrown">
                <span>@2017 - {thisYear()}</span>
                <span class="font-sans text-[#ff3860]"> ♥ </span>
                Made by Wincer.
            </p>
        </footer>
    )
}

export default Footer;
