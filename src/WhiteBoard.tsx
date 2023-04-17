import { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import { type KonvaEventObject } from "konva/lib/Node";
import styled from "styled-components";

type DrawProp = {
  selectedTool: string;
  toolList: any[];
  onMouseDown: (event: KonvaEventObject<Event>) => void;
  onMouseMove: (event: KonvaEventObject<Event>) => void;
  onMouseUp: (event?: KonvaEventObject<Event>) => void;
};

const WhiteBoard = () => {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([{ points: [0, 0], tool }]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<Event>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<Event>) => {
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

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Wrapper>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
      </Wrapper>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

const Wrapper = styled.div`
  width: 100px;
  height: 50px;
  margin-top: 50px;
`;

export default WhiteBoard;
