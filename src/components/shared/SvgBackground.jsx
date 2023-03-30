import smoothscroll from 'smoothscroll-polyfill';
import { createEffect, createSignal, onMount, Show } from "solid-js";

const PartTwoBackground = (props) => {
    const [scrollDirection, setScrollDirection] = createSignal('down');
    const [potision, setPotision] = createSignal("bottom");
    let startX, startY;
    const handleMobileScroll = (e) => {
        const deltaY = e.changedTouches[0].clientY - startY;
        e.preventDefault();

        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        console.log(scrollHeight - clientHeight, deltaY)
        if (deltaY < 0) {
            window.scroll({
                top: scrollHeight - clientHeight,
                behavior: "smooth",
            });
            setPotision("top")
        } else {
            window.scroll({
                top: 0,
                behavior: "smooth",
            });
            setPotision("bottom")
        }
    };
    onMount(() => {
        smoothscroll.polyfill();
        document.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            console.log(startX, startY)
        }, false);
        document.addEventListener('touchend', handleMobileScroll, { passive: false });
    })
    createEffect(() => {
        document.addEventListener('wheel', handleScroll, { passive: false })

        return () => {
            document.removeEventListener('whell', handleScroll, { passive: false });
        };
    });


    const handleScroll = (event) => {
        console.log(event)
        event.preventDefault();

        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;


        if (event.deltaY > 0) {
            // 向下滚动
            window.scroll({
                top: scrollHeight - clientHeight,
                behavior: "smooth",
            });
            setPotision("top")
        } else {
            // 向上滚动
            window.scroll({
                top: 0,
                behavior: "smooth",
            });
            setPotision("bottom")
        }

    };



    return (

        <div className="bg-cover bg-top h-[146px] 2xl:h-48 absolute flex justify-center items-end bottom-0 z-20 w-full" style={props.style} >

            <svg className={`animate-bounce text-heading-dark transition-opacity ease-in duration-300 mb-8 ${potision() === "bottom" ? "opacity-100" : "opacity-0"}`} width="52" height="28" viewBox="0 0 52 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51 1.24995L26 26.5L1 1.24995" stroke="currentColor" />
            </svg>


        </div>
    );

}

const SvgBackground = (props) => {
    const { position, svgAsset } = props;

    let svgBg;
    if (position === "top")
        svgBg = svgAsset.bgTop;
    else
        svgBg = svgAsset.bgBottom;
    const style = {
        'background-image': `url('${svgBg}')`
    }
    return (
        <>
            <Show when={position === "bottom"}>
                <PartTwoBackground style={style} />
            </Show>
            <Show when={position === "top"}>
                <div class="bg-cover w-full bg-center h-36 sm:h-52 2xl:h-64" style={style} />
            </Show>
        </>
    )
}
export default SvgBackground;