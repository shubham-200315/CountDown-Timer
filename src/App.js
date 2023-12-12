import React, { useState, useEffect } from 'react';

const Countdown = ({ initialMinutes, startCountdown }) => {
  const parseInput = (input) => {
    const parsedValue = parseInt(input, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const [isActive, setIsActive] = useState(false);

  const [time, setTime] = useState({
    hours: Math.floor(parseInput(initialMinutes) / 60),
    minutes: parseInput(initialMinutes) % 60,
    seconds: 0
  });

  const resetTimer = () => {
    setIsActive(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  };

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds > 0) {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          } else if (prevTime.minutes > 0) {
            return { hours: prevTime.hours, minutes: prevTime.minutes - 1, seconds: 59 };
          } else if (prevTime.hours > 0) {
            return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
          } else {
            clearInterval(intervalId);
            setIsActive(false);
            return prevTime;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isActive, initialMinutes]);

  useEffect(() => {
    setTime({
      hours: Math.floor(parseInput(initialMinutes) / 60),
      minutes: parseInput(initialMinutes) % 60,
      seconds: 0
    });
  }, [initialMinutes]);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-200 rounded shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Countdown Timer</h1>
      <p className="text-4xl">{`${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(
        time.seconds
      ).padStart(2, '0')}`}</p>
      <div className="mt-4 space-x-2">
        <button
          className={`p-2 ${
            isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          } text-white rounded`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Pause' : 'Play'}
        </button>
        <button
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [countdownMinutes, setCountdownMinutes] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        className="p-2 mb-4 text-xl border rounded focus:outline-none focus:ring focus:border-blue-300"
        type="number"
        value={countdownMinutes}
        onChange={(e) => setCountdownMinutes(e.target.value)}
      />
      <Countdown initialMinutes={countdownMinutes} />
    </div>
  );
};

export default App;
