import React, { useState, useEffect } from "react";
import { Level } from "./types";
import "./App.css";

interface GameProps {
    level: Level;
    endGame: (message: string) => void;
}

const Game: React.FC<GameProps> = ({ level, endGame }) => {
    const [TiempoRestante, setTiempoRestante] = useState<number>(level.tiempo);
    const [PosicionJugador, setPosicionJugador] = useState<number>(0);
    const [obstaculos, setObstaculos] = useState<{ carrilObstaculo: number; y: number }[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    function cantidadCarriles(level: Level): number {
        return level.id == 1 ? 4 : 3;
    }

    const lineasCarriles = cantidadCarriles(level);

    useEffect(() => {
        const timer = setInterval(() => {
            setTiempoRestante((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (TiempoRestante === 0) {
            endGame("¡Ganaste!");
        }
    }, [TiempoRestante, endGame]);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            setObstaculos((prev) => {
                const nuevoObstaculo = prev.map((obstacle) => ({ ...obstacle, y: obstacle.y + level.velocidad, }));

                if (nuevoObstaculo.some((o) => o.carrilObstaculo === PosicionJugador && o.y >= 90)) {
                    setGameOver(true);
                    clearInterval(gameLoop);
                    endGame("¡Perdiste! Chocaste con un auto.");
                }

                return nuevoObstaculo.filter((o) => o.y < 100);
            });

            if (Math.random() < 0.3) {
                setObstaculos((prev) => [...prev, { carrilObstaculo: Math.floor(Math.random() * lineasCarriles), y: 0 },]);
            }
        }, 300);

        return () => clearInterval(gameLoop);
    }, [level, PosicionJugador, endGame]);
    
    useEffect(() => {
        const teclado = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                moveLeft();
            } else if (e.key === "ArrowRight") {
                moveRight();
            }
        };

        window.addEventListener("keydown", teclado);

        return () => {
            window.removeEventListener("keydown", teclado);
        };
    }, []);


    const moveLeft = () => {
        setPosicionJugador((prev) => Math.max(0, prev - 1));
    };

    const moveRight = () => {
        setPosicionJugador((prev) => Math.min(lineasCarriles - 1, prev + 1));
    };

    return (
        <div className="game-container">
            <h1>Tiempo: {TiempoRestante}</h1>
            <div className="road" style={{ gridTemplateColumns: `repeat(${lineasCarriles}, 8fr)` }}>
                {Array.from({ length: lineasCarriles }).map((_, i) => (
                    <div key={i} className="lane" />
                ))}
                {obstaculos.map((obstacle, index) => (
                    <div
                        key={index}
                        className="obstaculo"
                        style={{ left: `${(100 / lineasCarriles) * obstacle.carrilObstaculo}%`, top: `${obstacle.y}%`, }}
                    />
                ))}

                <div className="carro-jugador"
                    style={{ left: `${(100 / lineasCarriles) * PosicionJugador}%` }}
                ></div>

            </div>
            <div className="controles">
                <p>Muevase con las telcas de izquierda y derecha del teclado</p>
                <p>👈🏻👉🏻</p>
            </div>
        </div>
    );
};

export default Game;
