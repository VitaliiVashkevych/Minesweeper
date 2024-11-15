import { resetGame } from "../store/gameSlice/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { GameLine } from "./GameLine";

export const GameField = () => {
  const { board } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Minesweeper</h1>

      <label htmlFor="difficulty">Choose difficulty:</label>
      <select name="difficulty" id="difficulty" defaultValue={"easy"} onChange={() => dispatch(resetGame())}>
        <option value="easy" defaultChecked>Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div id="board">
        {board &&
          board.map((line, index) => {
            return (
              <div key={index} className="gameField">
                <GameLine line={line as string[]} lineIndex={index} />
              </div>
            );
          })}
      </div>

      <button onClick={() => dispatch(resetGame())}>Reset game</button>
    </>
  );
};
