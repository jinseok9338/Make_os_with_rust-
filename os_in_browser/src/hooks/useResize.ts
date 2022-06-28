import { createSignal } from "solid-js";
import { useProcess } from "../context/processDirectory";
import { Dimension } from "../types/processDirectory";

const useResize = (
  id: string,
  dimension: Dimension,
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined
) => {
  const [mouseX, setMouseX] = createSignal(0);
  const [mouseY, setMouseY] = createSignal(0);
  const [state, { changeProcessDimension }] = useProcess();
  const MINIMUM_HEIGHT = 200;
  const MINIMUM_WIDTH = 200;
  const { heigth, left, top, width } = dimension;

  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("MouseDown");
    e.preventDefault();
    window.removeEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const mouseX = e.pageX;
    const mouseY = e.pageY;
    setMouseX(mouseX);
    setMouseY(mouseY);
  };

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!ref) {
      console.log("ref is not defined yet");
      return;
    }

    let classList = (ref as HTMLDivElement).classList;
    console.log("mouseMove");
    if (classList.contains("right-top")) {
      const newWidth = width + (e.pageX - mouseX());
      const newHeight = heigth - (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          heigth: newHeight,
          width: newWidth,
          top: top + (e.pageY - mouseY()),
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
      console.log("right-top");
    }

    if (classList.contains("right")) {
      const newWidth = width + (e.pageX - mouseX());

      if (newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          heigth,
          width: newWidth,
          top,
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
      console.log("right");
    }

    if (classList.contains("right-bottom")) {
      e.preventDefault();
      console.log("right-bottom");
      const newWidth = width + (e.pageX - mouseX());
      const newHeight = heigth + (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          heigth: newHeight,
          width: newWidth,
          top,
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("top")) {
      const newHeight = heigth - (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT) {
        const newDimension = {
          heigth: newHeight,
          width,
          top: top + (e.pageY - mouseY()),
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
      console.log("top");
    }

    if (classList.contains("left-top")) {
      const newWidth = width - (e.pageX - mouseX());
      const newHeight = heigth - (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          heigth: newHeight,
          width: newWidth,
          top: top + (e.pageY - mouseY()),
          left: left + (e.pageX - mouseX()),
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }

      console.log("left-top");
    }

    if (classList.contains("left-bottom")) {
      console.log("left-bottom");
      const newWidth = width - (e.pageX - mouseX());
      const newHeight = heigth + (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          heigth: newHeight,
          width: newWidth,
          top,
          left: left + (e.pageX - mouseX()),
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("left")) {
      const newWidth = width - (e.pageX - mouseX());

      if (newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          heigth,
          width: newWidth,
          top,
          left: left + (e.pageX - mouseX()),
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
      console.log("left");
    }

    if (classList.contains("bottom")) {
      const newHeight = heigth + (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT) {
        const newDimension = {
          heigth: newHeight,
          width,
          top,
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }

      console.log("bottom");
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    console.log("MouseUp");
    window.removeEventListener("mousemove", onMouseMove);
  };

  return { onMouseDown };
};

export default useResize;