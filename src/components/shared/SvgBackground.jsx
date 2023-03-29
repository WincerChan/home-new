import { createEffect, createSignal, Show } from "solid-js";

const PartTwoBackground = (props) => {
    const [scrollDirection, setScrollDirection] = createSignal('down');
    let lastScrollTop = 0;


    createEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop > lastScrollTop) {
            window.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: "smooth"
            })
            // 向下滚动
            setScrollDirection('down');
        } else {
            // 向上滚动
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            setScrollDirection('up');
        }
        lastScrollTop = scrollTop
    };

    return (
        <div className="bg-cover bg-top h-[146px] 2xl:h-48 absolute bottom-0 z-20 w-full" style={props.style} />
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