import { loadSettings } from "../logic/settings";
import { GameSection } from '../components/rps-game/GameSection';
import { HighScoresSection } from '../components/rps-game/HighScoresSection';
import { PlayerInfoCard } from '../components/rps-game/PlayerInfoCard';

export function RPSGamePage() {
  const settings = loadSettings();
  const playerName = settings?.name || 'Player';
  const playerAvatar = settings?.avatar;
  const difficulty = settings?.difficulty || 'Normal';

  const handleBackToSettings = () => {
    console.log(`going back to the settings view`);
  };
  console.log(playerAvatar);
  return (
    <main>
      <header>
        <h2>Rock Paper Scissors</h2>
        <nav>
          <a onClick={handleBackToSettings} className="nav-link">
            ← Back to Settings
          </a>
        </nav>
      </header>
      <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar} />
      <GameSection difficulty={difficulty} />
      <HighScoresSection />
    </main>
  );
}
