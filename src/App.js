import { useRef } from "react";
import FlowersScale from "./flowers";
import useContainerDimensions from "./hooks/use-container-dimensions";

const App = () => {
  const containerRef = useRef();
  const { width, height } = useContainerDimensions(containerRef);

  return (
    <div ref={containerRef} style={{ margin: "50px", height: "500px" }}>
      {containerRef?.current?.offsetWidth && (
        <FlowersScale height={height} width={width} />
      )}
    </div>
  );
};

export default App;
