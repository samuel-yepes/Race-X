import React, { useState } from "react";
import LevelSelection from "./SeleccionLevel";
import Game from "./Game";
import { Level } from "./types";

const App: React.FC = () => {
    const [Nivel, setLevel] = useState<Level | null>(null);

    return (
        <div>{Nivel ? (<Game level={Nivel} 
          endGame={() => setLevel(null)} />) : (<LevelSelection startGame={setLevel} />)}</div> 
    );
};

export default App;
