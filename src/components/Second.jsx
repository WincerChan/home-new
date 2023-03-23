import { createSignal, For } from "solid-js";
import { adjustColor } from "../runtime_utils"


const Links = (props) => {
    let config = props.config;
    let svgAsset = props.svgAsset;
    return (
        <>
            <h2 className=" text-heading-dark text-2xl mb-3 leading-relaxed">Links</h2>
            <div className="flex justify-between leading-relaxed text-heading-dark">

                <For each={config.links}>
                    {(item, _i) => {
                        let gradColor = adjustColor(item.color, 50);
                        let style = {
                            'border-color': `${item.color}`,
                            "background-color": `${gradColor}`
                        };
                        return (
                            <a href={item.url}>
                                <button title={item.name} className="border px-2 rounded-full flex py-[6px]" style={style}>
                                    <img className="mr-2" src={svgAsset[item.name]} />
                                    <span className="mx-1">
                                        {item.title}
                                    </span>
                                </button>
                            </a>
                        )
                    }}
                </For>
            </div >
        </>
    )
}

const Portfolio = (props) => {
    let projects = props.config.Portfolio;
    const [activeIndex, setActiveIndex] = createSignal(0);
    const resetIndex = () => {
        setActiveIndex((index) => 0)
    }
    const prevProj = () => {
        setActiveIndex((index) => index - 1)
    }
    const nextProj = () => {
        setActiveIndex((index) => index + 1)
    }
    // setInterval(() => {
    //     setActiveIndex((index) => {
    //         // last element
    //         if (index === projects.length - 1) {
    //             setTimeout(resetIndex, props.interval * 1000)
    //             return projects.length
    //         }
    //         return (index + 1) % projects.length
    //     })
    // }, props.interval * 1000)
    return (
        <>
            <h2 className=" text-heading-dark mb-3 text-2xl mt-12 leading-relaxed">Portfolio</h2>
            <button onClick={prevProj}>prev</button>
            <button onClick={nextProj}>next</button>
            <div className={`inline-flex duration-[500ms] space-x-16`}
                style={`transform: translate3d(-${activeIndex() * 28}rem, 0px, 0px); `}
            >
                <For each={projects.concat(projects.slice(0, 2))} >
                    {(item, i) => {
                        return (
                            <div className={`h-72 w-96 bg-[#fffefa] rounded-3xl transition-all ${activeIndex() === 0 ? '' : 'duration-[500ms]'}`}
                                style={`${(i() % projects.length) === (activeIndex() % projects.length) ? '' : 'transform: scale(0.8); transform-origin: 0 100%'};`}
                            >
                                <h3 className="text-xl">{item.name}</h3>
                                <p>{item.desc}</p>
                            </div>
                        )
                    }}
                </For>
            </div >
        </>
    )
}

const SecondPage = (props) => {
    const style = {
        'background-image': `url('${props.svgAsset.bgBottom}')`
    }

    return (
        <div className="bg-bgs-dark z-10">
            <div className="bg-cover bg-top h-36 absolute bottom-0 w-full" style={style} />
            <div className="w-full overflow-x-hidden md:w-[36rem] bg-bgs-dark mx-auto">
                <Links {...props} />
                <Portfolio {...props} interval={2} />
            </div>
        </div>
    )

}

export default SecondPage;
