const NewGame = ({ showNewGame, setShowNewGame, ranking }) => {
  return (
    <>
      {showNewGame && (
        <>
          <div
            className="newGameBackground"
            onClick={() => setShowNewGame(false)}
          ></div>
          <form className="newGame">
            <div>
              Joueur preneur
              {ranking.players !== undefined &&
                ranking.players.map((player, i) => {
                  return (
                    <>
                      <input key={i} type="radio" id={i} value={player.name} />
                      {player.name}
                    </>
                  );
                })}
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default NewGame;
