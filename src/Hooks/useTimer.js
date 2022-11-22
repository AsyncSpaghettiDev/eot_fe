import { useState, useEffect } from "react";

export const useTimer = (initial_val) => {
    const [elapsedTime, setElapsedTime] = useState(initial_val | 30);
    const [isActive, setIsActive] = useState(true);

    let timer;
    useEffect(() => {
        if (!isActive) return setElapsedTime(initial_val | 30);

        if (elapsedTime === 0)
            return setElapsedTime(initial_val | 30);

        timer = setInterval(() => {
            setElapsedTime(elapsedTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    });

    const stopTime = () => setIsActive(false);

    const elapsedMessage = `Tiempo para la siguiente actualización: ${elapsedTime}s`;
    return { elapsedTime, elapsedMessage, stopTime };
}