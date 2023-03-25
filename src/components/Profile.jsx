function UserProfile(props) {
  const config = props.config;
  const svg = props.svgAsset;
  const obfsEmail = config.email.slice(0, 5) + '<span style="display: none">youcantsee</span>' + config.email.slice(5)
  return (
    <div class='w-full md:w-[40rem] leading-relaxed mx-auto my-12 2xl:my-20 flex-grow'>
      <div className='flex flex-col-reverse mx-6 sm:mx-0 md:flex-row text-title-dark justify-between'>
        <div>
          <h1 className='text-3xl my-2 md:text-4xl'>{config.name.base} <span className='font-sans md:text-xl'>{config.name.note}</span></h1>
          <p className='font-light'>{config.desc}</p>
        </div>
        <img className='h-24 w-24 rounded-full' src={config.avatar} alt="" />
      </div>
      <div href={`mailto:${config.email}`} className='mx-auto mt-24 2xl:mt-32 flex w-fit  border-[#1A94BC] rounded-full p-4 bg-[#4cc6ee19]'>
        <img src={svg['mail']} class='mr-4' />
        <p className='text-title-dark' innerHTML={obfsEmail}></p>
      </div>
    </div >
  );
}

export default UserProfile;
