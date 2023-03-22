import { For } from "solid-js";
import { adjustColor } from "../runtime_utils"


const Links = (props) => {
  let config = props.config;
  let svgAsset = props.svgAsset;
  return (
    <>
      <h2 className=" text-title-dark text-2xl leading-relaxed">Links</h2>
      <div className="flex justify-between leading-relaxed mt-3 text-title-dark">

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

const SecondPage = (props) => {
  const style = {
    'background-image': `url('${props.svgAsset.bgBottom}')`
  }

  return (
    <div className="bg-bgs-dark">
      <div className="bg-cover bg-top h-36 absolute bottom-0 w-full" style={style} />
      <div className="w-full md:w-[36rem] mx-auto">
        <Links {...props} />
      </div>
    </div>
  )

}

export default SecondPage;
