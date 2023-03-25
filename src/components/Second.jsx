import { createSignal, For, onCleanup, onMount } from "solid-js";
import { adjustColor } from "../runtime_utils"


const Links = (props) => {
    let config = props.config;
    let svgAsset = props.svgAsset;
    return (
        <>
            <h2 className=" text-heading-dark text-2xl mb-3 leading-relaxed">Footprint</h2>
            <div className="grid gap-6 sm:grid-cols-3 leading-relaxed text-heading-dark">

                <For each={config.links}>
                    {(item, _i) => {
                        let gradColor = adjustColor(item.color, 0);
                        let style = {
                            "background-color": `${gradColor}`
                        };
                        return (
                            <a href={item.url} target="_blank">
                                <button title={item.name} className="w-full p-4 rounded-full flex" style={style}>
                                    <img className="mr-4" src={svgAsset[item.name]} />
                                    <span>
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
    let portfolioElement;
    let oneDistant;
    const [activeIndex, setActiveIndex] = createSignal(0);
    const [showAnimate, setShowAnimate] = createSignal(true);
    const [timer, setTimer] = createSignal(null);
    const updateActiveIndex = () => {
        oneDistant = portfolioElement.childNodes[1].getBoundingClientRect().x - portfolioElement.childNodes[0].getBoundingClientRect().x;
        setActiveIndex((index) => {
            if (index == 0)
                setShowAnimate(true)
            // last element
            if (index === projects.length - 1) {
                setTimeout(resetIndex, props.interval * 1000)
                return projects.length
            }
            return (index + 1) % projects.length
        })
    }
    const resetIndex = () => {
        setShowAnimate(false);
        setActiveIndex(0)
    }
    const setIndex = (idx) => {
        setActiveIndex(idx)
    }
    const startTimer = () => {
        setTimer(setInterval(updateActiveIndex, props.interval * 1000));
    };
    const stopTimer = () => {
        clearInterval(timer());
    };

    onCleanup(() => {
        setActiveIndex(0);
        setShowAnimate(true)
        stopTimer();
    });

    startTimer()
    return (
        <>
            <h2 className=" text-heading-dark mb-3 text-2xl mt-10 leading-relaxed">Portfolio</h2>
            <div className="overflow-x-hidden w-full"
                onMouseEnter={stopTimer}
                onMouseLeave={startTimer}
            >

                <div className={`inline-flex ${showAnimate() ? 'duration-500' : ''} space-x-14`}
                    ref={portfolioElement}
                    style={`transform: translate3d(-${activeIndex() * oneDistant}px, 0px, 0px); `}
                >
                    <For each={projects.concat(projects.slice(0, 2))} >
                        {(item, i) => {
                            return (
                                <a href={item.url} target="_blank" className={`${(i() % projects.length) === (activeIndex() % projects.length) ? '' : 'non-activate'} h-56 overflow-hidden w-[calc(100vw-3rem)] sm:w-[23rem] bg-[#fffefa] bg-opacity-50 rounded-3xl leading-relaxed transition-all duration-500`}
                                >
                                    <div className="h-28 bg-cover bg-center"
                                        style={`background-image: url('${item.cover}'); `}
                                    >
                                    </div>
                                    <div className="py-4 px-6">
                                        <h3 className="text-lg text-heading-dark">{item.name}</h3>
                                        <p className="text-sm text-[#503e2a]">{item.desc}</p>
                                    </div>
                                </a>
                            )
                        }}
                    </For>
                </div >
                <div className="flex h-6 space-x-8 justify-center my-3">
                    <For each={projects}>
                        {(item, i) => {
                            return <button onClick={() => setIndex(i())} className="p-2">
                                <div className={`h-[6px] w-[6px] rounded-full ${i() === activeIndex() % projects.length ? 'bg-heading-dark' : 'bg-[#81776e]'}`}></div>
                            </button>
                        }}
                    </For>
                </div>
            </div>
        </>
    )
}

const Footer = () => {
    return (
        <footer className="text-center py-6">
            <span className="text-sm text-footer-dark">©2017 - {new Date().getFullYear()} <span className=" font-sans text-[#ff3860]">♥</span> Made by Wincer.</span>
        </footer>
    )
}

const SecondPage = (props) => {
    const style = {
        'background-image': `url('${props.svgAsset.bgBottom}')`
    }

    return (
        <div className="bg-bgs-dark z-10">
            <div className="bg-cover bg-top h-36 absolute bottom-0 w-full" style={style} />
            <div
                style="transform: translateZ(0)"
                className="w-full px-6 sm:px-0 overflow-x-hidden md:w-[40rem] lg:w-[56rem] lg:px-32 bg-bgs-dark mx-auto">
                <Links {...props} />
                <Portfolio {...props} interval={5} />
                <Footer />
            </div>
        </div>
    )

}

export default SecondPage;
