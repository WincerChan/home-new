import { For, createSignal, onCleanup, createEffect } from "solid-js";

const Project = (props) => {
    const { activeIndex, project, projectsSize, currIndex } = props;
    let style = {
        'background-image': `url('${project.cover}')`
    }
    return (
        <a href={project.url} target="_blank" className={`${(currIndex() % projectsSize) === (activeIndex() % projectsSize) ? '' : 'non-activate'} h-56 overflow-hidden w-[calc(100vw-3rem)] sm:w-[23rem] bg-[#fffefa] bg-opacity-50 rounded-3xl leading-relaxed transition-all duration-500`}>
            <div style={style}
                className="h-28 bg-cover bg-center"
            />
            <div className="py-4 px-6">

                <h3 className="text-lg text-heading-dark">{project.name}</h3>
                <p className="text-sm text-[#503e2a]">{project.desc}</p>
            </div>
        </a>
    )
}

const Paginate = (props) => {
    const { projects, setIndex, activeIndex, projectsSize } = props
    return (
        <div className="flex h-6 space-x-8 justify-center my-3">
            <For each={projects}>
                {(_item, i) => {
                    return <button onClick={() => setIndex(i())} className="p-2">
                        <div className={`h-[6px] w-[6px] rounded-full ${i() === activeIndex() % projectsSize ? 'bg-heading-dark' : 'bg-[#81776e]'}`}></div>
                    </button>
                }}
            </For>
        </div>
    )
}

const Portfolio = (props) => {
    let projects = props.config.Portfolio;
    const [activeIndex, setActiveIndex] = createSignal(0);
    const [showAnimate, setShowAnimate] = createSignal(true);
    const [timer, setTimer] = createSignal(null);
    let oneDistant;
    let portfolioElement;
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
        console.log("set index", activeIndex(), portfolioElement, oneDistant, showAnimate())
        setActiveIndex(idx)
    }
    const startTimer = () => {
        setTimer(setInterval(updateActiveIndex, props.interval * 1000));
    };
    const stopTimer = () => {
        clearInterval(timer());
    };
    createEffect(updateActiveIndex)

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
                    <For each={projects.concat(projects.slice(0, 2))}>
                        {(item, i) => <Project activeIndex={activeIndex} project={item} projectsSize={projects.length} currIndex={i} />}
                    </For>
                </div>
                <Paginate activeIndex={activeIndex} projects={projects} projectsSize={projects.length} setIndex={setIndex} />
            </div>
        </>
    )
}
export default Portfolio;