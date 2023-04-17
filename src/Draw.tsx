import { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import { type KonvaEventObject } from "konva/lib/Node";
import styled from "styled-components";

type Data = {
  id: string;
  data: any;
};

type DrawProps = {
  toolList: Array<Data>;
  handleMouseDown: (event: KonvaEventObject<Event>) => void;
  handleMouseMove: (event: KonvaEventObject<Event>) => void;
  handleMouseUp: (event?: KonvaEventObject<Event>) => void;
};

const Draw = ({ toolList, handleMouseDown, handleMouseMove, handleMouseUp }: DrawProps) => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      {toolList.map(({ id, data }) => {
        if (id === "Pen") {
          return <Pen lines={data.lines} />;
        }
      })}
    </Stage>
  );
};

type PenProps = {
  lines: any[];
};

const Pen = ({ lines }: PenProps) => {
  return (
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
  );
};

const Wrapper = styled.div`
  width: 100px;
  height: 50px;
  margin-top: 50px;
`;

export default Draw;
