import { useEffect, useCallback, useState } from "react";

const useContainerDimensions = (myRef) => {
  const getDimensions = useCallback(
    () => ({
      width: myRef?.current?.offsetWidth ?? null,
      height: myRef?.current?.offsetHeight ?? null,
    }),
    [myRef]
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getDimensions, myRef]);

  return dimensions;
};

export default useContainerDimensions;
