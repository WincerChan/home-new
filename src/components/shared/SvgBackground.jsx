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
                <div className="bg-cover bg-top h-36 absolute bottom-0 w-full" style={style} />
            </Show>
            <Show when={position === "top"}>
                <div class="bg-cover bg-center h-52 2xl:h-64" style={style} />
            </Show>
        </>
    )
}
export default SvgBackground;