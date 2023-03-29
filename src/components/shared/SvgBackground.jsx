import { Show } from "solid-js";

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
                <div className="bg-cover bg-top h-[146px] 2xl:h-48 absolute bottom-0 z-20 w-full" style={style} />
            </Show>
            <Show when={position === "top"}>
                <div class="bg-cover bg-center h-36 sm:h-52 2xl:h-64" style={style} />
            </Show>
        </>
    )
}
export default SvgBackground;