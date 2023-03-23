import { createSignal, onCleanup } from "solid-js";

const PortfolioCarousel = (props) => {
    const { projects, interval } = props;
    const projectWidth = '24rem'
    const [activeIndex, setActiveIndex] = createSignal(0);
    const [timer, setTimer] = createSignal(null);

    const nextProject = () => {
        console.log("next")
        setActiveIndex((index) => (index + 1) % projects.length);
    };

    const prevProject = () => {
        setActiveIndex((index) => (index - 1 + projects.length) % projects.length);
    };

    const startTimer = () => {
        setTimer(setTimeout(() => nextProject(), 1000));
    };

    const stopTimer = () => {
        clearTimeout(timer());
    };

    onCleanup(() => {
        stopTimer();
    });

    startTimer();

    return (
        <>
            <h2 className=" text-title-dark mb-3 text-2xl mt-12 leading-relaxed">Portfolio</h2>
            <div
                class="relative h-80 flex space-x-4 items-center w-full overflow-hidden"
            >
                {projects.map((project, index) => (
                    <div
                        class={`${index === activeIndex() ? "scale-100" : "scale-80"
                            } absolute bg-white transition-all duration-500 h-72 ease-in-out`}
                        style={`width: ${projectWidth}; left: ${index === activeIndex() ? 0 : projectWidth
                            };`}
                    >
                        {project.name} {project.desc}
                    </div>
                ))}
                <button
                    class="absolute top-1/2 -translate-y-1/2 z-10 px-4 py-2 bg-transparent border-none text-2xl cursor-pointer"
                    onClick={prevProject}
                >
                    {"<"}
                </button>
                <button
                    class="absolute top-1/2 -translate-y-1/2 right-0 z-10 px-4 py-2 bg-transparent border-none text-2xl cursor-pointer"
                    onClick={nextProject}
                >
                    {">"}
                </button>
            </div>
        </>
    );
};

export default PortfolioCarousel;
