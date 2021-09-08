import { useRef } from "react";
import CountryPopulateScale from "./country-population-scale";
import useContainerDimensions from "./hooks/use-container-dimensions";

const App = () => {
  const containerRef = useRef();
  const { width, height } = useContainerDimensions(containerRef);

  console.log(containerRef.current);
  return (
    <div ref={containerRef} style={{ margin: "50px", height: "500px" }}>
      {containerRef?.current?.offsetWidth && (
        <CountryPopulateScale height={height} width={width} />
      )}
    </div>
  );
};

export default App;
