import React from 'react';

interface CollectorContextProps {
    totalProduction: number;
    setTotalProduction: React.Dispatch<React.SetStateAction<number>>;
}

export const CollectorContext = React.createContext<CollectorContextProps>({
    totalProduction: 0,
    setTotalProduction: () => {},
});