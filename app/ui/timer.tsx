'use client';

import { useState, useEffect } from 'react';
export default function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    useEffect(() => {
        if (!!isRunning) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    }
    const handlePause = () => {
        setIsRunning(false);
    }

    return (
        <div className='justify-center'>
            <p>{time}</p>
            <div className='flex gap-4'>
                <button className='bg-pink-800 rounded-2xl w-30' onClick={isRunning ? handlePause : handleStart}>{isRunning ? 'Pause' : 'Start'}</button>
                <button className='bg-pink-800 rounded-2xl w-30' onClick={() => setTime(0)}>Reset</button>
            </div>

        </div>
    );

}