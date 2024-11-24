// import React from "react";
import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

function OfflinePage() {
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [targetNumber, setTargetNumber] = useState(
        Math.floor(Math.random() * 100) + 1
    );
    const [attempts, setAttempts] = useState(0);
    const handleGuess = (e) => {
        e.preventDefault();
        const userGuess = parseInt(guess);
        setAttempts(attempts + 1);

        if (userGuess === targetNumber) {
            setMessage(
                `Congratulations! You guessed the number in ${
                    attempts + 1
                } attempts.`
            );
        } else if (userGuess < targetNumber) {
            setMessage("Too low! Try a higher number.");
        } else {
            setMessage("Too high! Try a lower number.");
        }

        setGuess("");
    };

    const resetGame = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setAttempts(0);
        setMessage("");
        setGuess("");
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                    <div className="flex items-center justify-center mb-6">
                        <WifiOff className="text-red-500 w-12 h-12 mr-4" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            You're Offline
                        </h1>
                    </div>
                    <p className="text-gray-600 text-center mb-8">
                        Don't worry! You can still play a game while we wait for
                        your connection to return.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Guess the Number
                        </h2>
                        <p className="text-gray-600 mb-4">
                            I'm thinking of a number between 1 and 100. Can you
                            guess it?
                        </p>
                        <form onSubmit={handleGuess} className="flex mb-4">
                            <input
                                type="number"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your guess"
                                min="1"
                                max="100"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Guess
                            </button>
                        </form>
                        {message && (
                            <p className="text-gray-800 mb-4">{message}</p>
                        )}
                        <button
                            onClick={resetGame}
                            className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            New Game
                        </button>
                    </div>
                    <div className="flex items-center justify-center text-gray-500">
                        <Wifi className="w-5 h-5 mr-2" />
                        <p>Checking for internet connection...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfflinePage;
