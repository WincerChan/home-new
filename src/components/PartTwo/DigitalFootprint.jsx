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
            <button title={link.name} className="w-full lg:p-4 p-3 rounded-full flex 2xl:text-xl text-lg" style={style}>
                <img className="mr-3 lg:mr-4" src={svgAsset[link.name]} />
                <span>{link.title}</span>
            </button>
        </a>
    )
}

const Footprint = (props) => {
    const { config, svgAsset } = props;
    return (
        <>
            <h2 className=" text-darkBrown 2xl:text-3xl text-2xl mb-3 2xl:mb-6 mt-1 2xl:mt-2 leading-loose">Footprint</h2>
            <div className="grid sm:gap-6 gap-4 sm:grid-cols-3 leading-relaxed text-darkBrown 2xl:mb-12 xl:mb-8 mb-6">
                <For each={config.links}>
                    {(link, _i) => <Link link={link} svgAsset={svgAsset} />}
                </For>
            </div>
        </>
    )
}

export default Footprint;