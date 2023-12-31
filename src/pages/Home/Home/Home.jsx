import { Helmet } from "react-helmet-async";
import Slider from "../Slider/Slider";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import ContactUs from "../ContactUs/ContactUs";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import GetReady from "../GetReady/GetReady";
import { useLocation } from "react-router-dom";
import useScrollTop from "../../../hooks/useScrollTop";
import Hero from "../Hero/Hero";
import Hero2 from "../Hero/Hero2";
import Counter from "../Counter/Counter";
import EndSection from "../endSection/EndSection";

const Home = () => {
  // Custom hook
  const { pathname } = useLocation();
  useScrollTop(pathname);

  return (
    <>
      <Helmet>
        <title>FightingSpirit - Home</title>
      </Helmet>
      <div>
        <Slider></Slider>
        <WhoWeAre></WhoWeAre>
        <PopularClasses></PopularClasses>
        <PopularInstructors></PopularInstructors>
        <Hero></Hero>
        <GetReady></GetReady>
        <Counter></Counter>
        <Hero2></Hero2>
        <ContactUs></ContactUs>
        <EndSection></EndSection>
      </div>
    </>
  );
};

export default Home;
