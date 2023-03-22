function UserProfile(props) {
  const config = props.config;
  const svg = props.svgAsset;
  return (
    <div class='w-full md:w-[36rem] mx-auto my-12 2xl:my-16 flex-grow'>
      <div className='flex flex-col-reverse mx-4 md:flex-row text-title-dark justify-between'>
        <div>
          <h1 className='leading-relaxed text-3xl md:text-4xl'>{config.name.base} <span className='font-sans md:text-xl'>{config.name.note}</span></h1>
          <p className='font-light'>{config.desc}</p>
        </div>
        <img className='h-24 w-24 rounded-full' src={config.avatar} alt="" />
      </div>
      <div className='mx-auto mt-24 2xl:mt-32 flex w-fit border-2 border-[#1A94BC] rounded-full px-4 py-2 bg-[#4cc6ee19]'>
        <img src={svg['mail']} class='mr-4' />
        <button className='text-title-dark text-xl'>{config.email}</button>
      </div>
    </div >
  );
}

export default UserProfile;
