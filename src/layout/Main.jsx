import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useDarkMode from "../hooks/useDarkMode";

const Main = () => {
  const { fullLoading } = useAuth();
  const { darkMode } = useDarkMode();

  if (fullLoading) {
    return <LoadingSpinner fullScreen={true}></LoadingSpinner>;
  }

  return (
    <div className={darkMode ? "bg-black" : ""}>
      
        <NavBar></NavBar>
        <div className="w-[95%] md:w-[80%] mx-auto">
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
      
    </div>
  );
};

export default Main;
