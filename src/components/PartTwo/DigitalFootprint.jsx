import { For } from "solid-js";
import { adjustColor } from "../../runtime_utils";

const Link = (props) => {
    const { link, svgAsset } = props;
    let gradColor = adjustColor(link.color, 0);
    let style = {
        "background-color": `${gradColor}`
    };
    return (
        <a href={link.url} target="_blank">
            <button title={link.name} className="w-full p-4 rounded-full flex" style={style}>
                <img className="mr-4" src={svgAsset[link.name]} />
                <span>{link.title}</span>
            </button>
        </a>
    )
}

const Footprint = (props) => {
    const { config, svgAsset } = props;
    return (
        <>
            <h2 className=" text-heading-dark text-2xl mb-3 leading-relaxed">Footprint</h2>
            <div className="grid gap-6 sm:grid-cols-3 leading-relaxed text-heading-dark">
                <For each={config.links}>
                    {(link, _i) => <Link link={link} svgAsset={svgAsset} />}
                </For>
            </div>
        </>
    )
}

export default Footprint;