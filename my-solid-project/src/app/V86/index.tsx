import { JSX } from "solid-js/jsx-runtime";
import useV86 from "./useV86";

const V86 = (): JSX.Element => {
  let screenRef: HTMLDivElement;

  const { emulator, lockMouse } = useV86(url, screenRef);
  const txtStyle = useV86ScreenSize(id, emulator());
  return (
    <StyledV86 ref={screenRef} onClick={lockMouse}>
      <div style={txtStyle} />
      <canvas />
    </StyledV86>
  );
};
export default V86;