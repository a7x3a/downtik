import Hero from "./Componets/Hero";
import Navbar from "./Componets/Navbar";
const App = () => {
  return (
    <div className="max-w-full min-h-[100dvh] h-fit  pb-10  text-white font-poppins overflow-hidden">
      <Navbar />
      <Hero />
      <div className="background z-[-100] absolute">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
    </div>
  );
};

export default App;
