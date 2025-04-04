import React, { useState } from "react";
import { Level } from "./types";

interface LevelSelectionProps {
    startGame: (level: Level) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ startGame }) => {
    const [nivelSeleccionado, setnivelSeleccionado] = useState<Level | null>(null);

    const levels: Level[] = [
        { id: 1, carriles: 4, velocidad: 3, tiempo: 30 },
        { id: 2, carriles: 3, velocidad: 5, tiempo: 45 },
        { id: 3, carriles: 3, velocidad: 8, tiempo: 60 },
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Seleccionar Nivel</h1>
            {levels.map((nivel) => (
                <button
                    key={nivel.id} onClick={() => setnivelSeleccionado(nivel)}
                    style={{
                        backgroundColor: nivelSeleccionado?.id === nivel.id ? "gold" : "white",
                        margin: "10px",
                        padding: "10px",
                        fontSize: "20px",
                    }}
                >
                    {nivel.id}
                </button>
            ))}
            <br />
            <button 
                onClick={() => nivelSeleccionado && startGame(nivelSeleccionado)}
                disabled={!nivelSeleccionado}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "20px",
                    backgroundColor:'#d3ed7c'
                }}
            >
                Jugar
            </button>
        </div>
    );
};

export default LevelSelection;
