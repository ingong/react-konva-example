import Draw from "./Draw";
import Fireworks from "./Fireworks";
import { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import { type KonvaEventObject } from "konva/lib/Node";
import styled from "styled-components";

//

const App = () => {
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [lines, setLines] = useState([{ points: [0, 0], tool }]);
  const isDrawing = useRef(false);

  const onMouseDown = (e: KonvaEventObject<Event>) => {
    switch (tool) {
      case "pen":
        return handleMouseDownPen(e);
      case "eraser":
        return;
    }
  };

  const onMouseMove = (e: KonvaEventObject<Event>) => {
    switch (tool) {
      case "pen":
        return handleMouseMovePen(e);
      case "eraser":
        return;
    }
  };

  const onMouseUp = () => {
    switch (tool) {
      case "pen":
        return handleMouseUpPen();
      case "eraser":
        return;
    }
  };

  const handleMouseDownPen = (e: KonvaEventObject<Event>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMovePen = (e: KonvaEventObject<Event>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const point = e.target.getStage()?.getPointerPosition();
    if (point) {
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUpPen = () => {
    isDrawing.current = false;
  };

  const toolList = [{ id: "Pen", data: lines }];

  return (
    <Draw
      handleMouseMove={onMouseMove}
      handleMouseDown={onMouseDown}
      handleMouseUp={onMouseUp}
      toolList={toolList}
    />
  );
};

export default App;
