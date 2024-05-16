"use client";

import React, { useState, useEffect, useContext } from 'react';
import { CollectorContext } from "./collectorContext";
import { Collectors as CollectorInterface } from "../objects/collector";

export function Collector(props: CollectorInterface) {
    const [production, setProduction] = useState(0);
    const [workersAssigned, setWorkersAssigned] = useState(props.workersAssigned || 0);
    const [extractionCapacity, setExtractionCapacity] = useState(10 * (props.workersAssigned || 0));    
    const { totalProduction, setTotalProduction } = useContext(CollectorContext);
    const [improvements, setImprovements] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const newProduction = workersAssigned * extractionCapacity;
            setExtractionCapacity(10 * workersAssigned);
            setProduction(newProduction);
            setTotalProduction(prevTotal => prevTotal + newProduction);
        }, 60000); 
    
        return () => clearInterval(timer); 
    }, [props, workersAssigned]);

    //para actualizar el número de trabajadores asignados a un recolector 
    const handleWorkersAssignedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWorkersAssigned = Number(event.target.value);
        if (props.maxWorkers !== undefined && newWorkersAssigned > props.maxWorkers) {
            setWorkersAssigned(props.maxWorkers);
        } else {
            setWorkersAssigned(newWorkersAssigned);
        }
    };

    const improveExtractionCapacity = () => {
        //mejora la capacidad de extracción cuesta 500 unidades de producción
        if (totalProduction >= 500) {
            setTotalProduction(totalProduction - 500);
            setExtractionCapacity(prevCapacity => prevCapacity + 1); 
            setImprovements(prevImprovements => prevImprovements + 1); //incrementa el contador de mejoras
    
            setTimeout(() => { //para que dure 3 min nomas
                setExtractionCapacity(prevCapacity => prevCapacity - improvements);
                setImprovements(0); //restablece el contador de mejoras
            }, 180000);
        } else {
            alert('No tienes suficientes recursos para mejorar la capacidad de extracción.');
        }
    };

    return {
        type: props.type,
        workersAssigned,
        extractionCapacity,
        production: production * 10,
        totalProduction,
        improvements,
        improveExtractionCapacity,
    };
};

// console.log('This is the console.log' + Collector)

export default Collector;