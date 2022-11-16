import { useState, useEffect } from "react";

export const useStopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(true);

    let timer;
    useEffect(() => {
        if (!isActive) return setSeconds(0);
        
        timer = setInterval(() => {
            setSeconds(seconds + 1);

            if (minutes === 59 && seconds === 59) {
                setHours(hours + 1);
                setMinutes(0);
                setSeconds(0);
            }
            else if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            }

        }, 1000);

        return () => clearInterval(timer);
    });

    const setInitial = (initialTime) => {
        setHours(initialTime?.elapsedHours);
        setMinutes(initialTime?.elapsedMinutes);
    }

    const stopTime = () => {
        setIsActive(false);
    }

    const elapsedTime = `Tiempo Corrido: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    return { elapsedTime, setInitial, stopTime };
}