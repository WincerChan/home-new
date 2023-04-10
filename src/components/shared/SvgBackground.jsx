import { createSignal, onMount, Show } from "solid-js";

const PartTwoBackground = (props) => {
    const [potision, setPotision] = createSignal("top");

    const updatePositionByScrollTop = () => {
        if (document.documentElement.scrollTop == 0)
            setPotision("bottom")
        else
            setPotision("top")
    }

    onMount(() => {
        updatePositionByScrollTop()
        document.addEventListener('scroll', updatePositionByScrollTop)
    });




    return (

        <div
            bg="cover top shadow"
            className="h-[146px] 2xl:h-48 absolute -mb-1px flex justify-center items-end bottom-0 z-20 w-full" style={props.style} >

            <svg className={`animate-bounce text-darkBrown transition-opacity ease-in duration-300 mb-8 ${potision() === "bottom" ? "opacity-100" : "opacity-0"}`} width="52" height="28" viewBox="0 0 52 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        'background-image': `url('${svgBg}')`,
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