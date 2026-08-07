export const ScoreBoard = ({ score }) => {
  return (
    <div className="score-row">
      <span>
        Player: <strong id="score-player" aria-label="Player score">{score.player}</strong>
      </span>
      <span>
        CPU: <strong id="score-cpu" aria-label="CPU score">{score.cpu}</strong>
      </span>
      <span>
        Ties: <strong id="score-ties" aria-label="Ties score">{score.ties}</strong>
      </span>
    </div>
  );
};
