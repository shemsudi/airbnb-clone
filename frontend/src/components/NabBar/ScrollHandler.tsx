import { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

const ScrollHandler = ({
  setIsAtTop,
}: {
  setIsAtTop: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isAtTop, setAtTop] = useState(true);

  const handleScroll = useMemo(
    () =>
      debounce(() => {
        const isTop = window.scrollY === 0;
        if (isTop !== isAtTop) {
          setAtTop(isTop);
          setIsAtTop(isTop); // Update parent component's state
        }
      }, 100),
    [isAtTop, setIsAtTop]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return null;
};

export default ScrollHandler;
