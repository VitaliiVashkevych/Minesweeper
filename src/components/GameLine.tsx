import { GameCell } from "./GameCell";

interface Props {
  line: string[],
  lineIndex: number
}

export const GameLine: React.FC<Props> = ({ line, lineIndex }) => {
  return (
    <>
      {line.map((cell, index) => {
        return (
          <GameCell cell={cell} key={index} cellIndex={index} lineIndex={lineIndex}/>
        )
      })}
    </>
  )
}