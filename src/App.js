import Face from "./Face";

const width = 960;
const height = 500;

const App = () => {
  return (
    <Face
      width={width}
      height={height}
      strokeWidth={10}
      eyeOffsetX={90}
      eyeOffsetY={100}
      eyeRadius={50}
      centerX={width / 2}
      centerY={height / 2}
      mouthWidth={20}
      mouthRadius={140}
    />
  );
};

export default App;
