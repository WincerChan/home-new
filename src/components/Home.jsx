import UserProfile from "./Profile";
import SecondPage from './Second'


const TopBackground = (props) => {
  const style = {
    'background-image': `url('${props.svgAsset.bgTop}')`
  }

  return (
    <div class="bg-cover bg-center h-52  2xl:h-64" style={style} />
  )
}


const Home = (props) => {
  return (
    <>
      <div className="flex w-full sticky top-0 left-0 flex-col h-screen">
        <TopBackground svgAsset={props.svgAsset} />
        <UserProfile {...props} />
      </div>
      <SecondPage {...props} />
    </>
  )
}

export default Home;
