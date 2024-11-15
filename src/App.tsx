import "./App.css";
import { GameField } from "./components/GameField";
import { LoseModal } from "./components/LoseModal";
import { useAppSelector } from "./store/hooks";

function App() {
  const { isLose } = useAppSelector((state) => state.game);
  const loseAudio1 = new Audio("/sounds/HaHa.mp3");
  const loseAudio2 = new Audio("/sounds/SkillIssue.mp3");

  if (isLose) {
    if (Math.random() < 0.5) {
      loseAudio1.play();
    } else {
      loseAudio2.play();
    }
  }

  return (
    <>
      <GameField />
      {isLose && <LoseModal />}
    </>
  );
}

export default App;
