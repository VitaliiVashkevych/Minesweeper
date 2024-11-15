import { checkMinesAround, checkWin, startGame } from "../store/gameSlice/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks"

interface Props {
  cell: string,
  cellIndex: number,
  lineIndex: number
}

export const GameCell: React.FC<Props> = ({ cell, cellIndex, lineIndex }) => {
  const dispatch = useAppDispatch();
  const { isLose } = useAppSelector((state) => state.game);

  const handleClick = (e: React.SyntheticEvent) => {
    if (isLose) {
      return
    }

    dispatch(startGame({ cellIndex, lineIndex }));
    dispatch(checkWin({ cellIndex, lineIndex }));
    dispatch(checkMinesAround({ cellIndex, lineIndex }));
    e.currentTarget.className += " active";
  }

  const markBomb = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isLose) {
      return
    };

    if (e.currentTarget.className.includes("flag")) { 
      e.currentTarget.className = e.currentTarget.className.replace(" flag", "");
    } else {
      e.currentTarget.className += " flag";
    }
  }

  return (
    <div className="cell cover" onClick={(e) => handleClick(e)} onContextMenu={(e) => markBomb(e)} id={`${lineIndex}-${cellIndex}`}>{cell}</div>
  )
}