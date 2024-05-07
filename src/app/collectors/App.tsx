"use client";

import React, { useState } from 'react';
import { CollectorContext } from "./components/collectorContext";
import { Collector } from "./components/resourceLogic";

const App: React.FC = () => {
    const [totalProduction, setTotalProduction] = useState(500);

    // Crear objetos de recolectores
    // const woodCollector = Collector({ type: 'wood', maxWorkers: 10 });
    // const stoneCollector = Collector({ type: 'stone', maxWorkers: 20 });
    const collectorObject = Collector({ 
        type: 'wood', 
        workersAssigned: 5, 
        maxWorkers: 10, 
        // image: 'ruta/a/tu/imagen.png' 
    });
    
    console.log(collectorObject);

    // console.log(woodCollector);
    // console.log(stoneCollector);

    return (
        <CollectorContext.Provider value={{ totalProduction, setTotalProduction }}>
            <p>Total Production: {totalProduction}</p>
        </CollectorContext.Provider>
    );
};

export default App;