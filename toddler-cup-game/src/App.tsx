/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Howl } from 'howler';
import './App.css'

// Define the cup and saucer colors and matches
const cupSaucerData = [
  { color: 'bg-pink-400', match: 'saucer-2' },
  { color: 'bg-blue-400', match: 'saucer-4' },
  { color: 'bg-green-400', match: 'saucer-1' },
  { color: 'bg-orange-400', match: 'saucer-3' },
];

const saucerData = [
  { id: 'saucer-1', color: 'bg-green-400' },
  { id: 'saucer-2', color: 'bg-pink-400' },
  { id: 'saucer-3', color: 'bg-orange-400' },
  { id: 'saucer-4', color: 'bg-blue-400' },
];

// Function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cups, setCups] = useState<{ id: string; color: string; match: string }[]>([]);
  const [saucers, setSaucers] = useState<{ id: string; color: string }[]>([]);
  const [dropped, setDropped] = useState<{ [key: string]: string }>({});
  const [animate, setAnimate] = useState<string | null>(null);
  const [hasWon, setHasWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize background music
  const [backgroundMusic] = useState(
    new Howl({
      src: ['/src/assets/sounds/background.wav'],
      loop: true,
      volume: 0.5,
    })
  );

  useEffect(() => {
    if (gameStarted && !isMuted) {
      backgroundMusic.play();
    }
    return () => {
      backgroundMusic.stop();
    };
  }, [gameStarted, isMuted, backgroundMusic]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (prev) {
        backgroundMusic.play();
      } else {
        backgroundMusic.pause();
      }
      return !prev;
    });
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameStarted && !hasWon) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, hasWon]);

  useEffect(() => {
    // Check if all cups are correctly placed
    if (Object.keys(dropped).length === saucers.length) {
      setHasWon(true);
      const winSound = new Howl({ src: ['/src/assets/sounds/win.wav'] });
      winSound.play();
    }
  }, [dropped, saucers.length]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const draggedCup = cups[source.index];
    const targetSaucer = saucers.find(
      (saucer) => saucer.id === destination.droppableId
    );

    if (targetSaucer && draggedCup.match === targetSaucer.id) {
      const dropSound = new Howl({ src: ['/src/assets/sounds/drop.mp3'] });
      dropSound.play();
      setDropped((prev) => ({ ...prev, [targetSaucer.id]: draggedCup.id }));
      setCups((prev) => prev.filter((cup) => cup.id !== draggedCup.id));
      setAnimate(targetSaucer.id); // Trigger animation for the saucer
    }
  };

  const startGame = () => {
    // Shuffle cups and saucers
    const shuffledCupData = shuffleArray(cupSaucerData);
    const shuffledSaucers = shuffleArray(saucerData);
    const newCups = shuffledCupData.map((data, index) => ({
      id: `cup-${index + 1}`,
      color: data.color,
      match: shuffledSaucers.find((saucer) => saucer.color === data.color)?.id || '',
    }));
    setCups(newCups);
    setSaucers(shuffledSaucers);
    setGameStarted(true);
    setDropped({}); // Reset dropped state
    setHasWon(false); // Reset win state
    setTime(0); // Reset timer
  };

  const restartGame = () => {
    // Shuffle cups and saucers on restart
    const shuffledCupData = shuffleArray(cupSaucerData);
    const shuffledSaucers = shuffleArray(saucerData);
    const newCups = shuffledCupData.map((data, index) => ({
      id: `cup-${index + 1}`,
      color: data.color,
      match: shuffledSaucers.find((saucer) => saucer.color === data.color)?.id || '',
    }));
    setCups(newCups);
    setSaucers(shuffledSaucers);
    setDropped({}); // Reset dropped state
    setAnimate(null); // Reset animation
    setTime(0); // Reset timer
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="bg-yellow-400 text-red-600 text-2xl font-bold py-4 px-8 rounded-full border-4 border-red-600 flex items-center gap-2 hover:bg-yellow-500 transition-colors"
          >
            START!
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        ) : hasWon ? (
          <div className="text-center">
            <h2 className="text-4xl text-yellow-400 font-bold mb-5 animate-bounce">
              🎉 Yay! You Did It! 🎉
            </h2>
            <p className="text-xl mb-5">Time: {formatTime(time)}</p>
            <button
              onClick={startGame}
              className="bg-yellow-400 text-red-600 text-xl font-bold py-3 px-6 rounded-full border-4 border-red-600 hover:bg-yellow-500 transition-colors"
            >
              Play Again!
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between w-full max-w-2xl px-5 mb-5">
              <h2 className="text-pink-400 text-2xl text-center">
                Click or Touch on the cups and drag and drop them on top of their saucers
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={toggleMute}
                  className="bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button
                  onClick={restartGame}
                  className="bg-red-600 text-white text-lg font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors"
                >
                  Restart
                </button>
              </div>
            </div>
            <p className="text-white text-lg mb-5">Time: {formatTime(time)}</p>
            <Droppable droppableId="cups" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-5 mb-10"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cups.map((cup, index) => (
                    <Draggable key={cup.id} draggableId={cup.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`w-16 h-16 ${cup.color} rounded-lg border-2 border-white cursor-grab`}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="flex gap-5">
              {saucers.map((saucer) => (
                <Droppable key={saucer.id} droppableId={saucer.id}>
                  {(provided) => (
                    <div
                      className="relative"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div
                        className={`w-20 h-20 ${saucer.color} rounded-full border-2 border-white transition-transform duration-300 ${
                          animate === saucer.id ? 'scale-110' : ''
                        }`}
                      >
                        {dropped[saucer.id] && (
                          <div
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${
                              cups.find((cup) => cup.id === dropped[saucer.id])?.color
                            } rounded-lg border-2 border-white transition-transform duration-300 ${
                              animate === saucer.id ? 'scale-110' : ''
                            }`}
                          />
                        )}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export default App;