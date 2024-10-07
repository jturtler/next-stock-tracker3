'use client';

import { createContext, useState, useContext } from 'react';

type ContextQuoteDays = {
	quoteDays: number,
	setQuoteDays: React.Dispatch<React.SetStateAction<number>>
};

const ContextQuoteDays = createContext<ContextQuoteDays | null>(null);

export function ContextWrapperQuoteDays( { children } : { children: React.ReactNode; } ) 
{
	const [ quoteDays, setQuoteDays ] = useState( 3 );

	return (
		<ContextQuoteDays.Provider value={ {quoteDays, setQuoteDays } }>
			{ children }
		</ContextQuoteDays.Provider>
	);
}

// Custom Hook - to be called when used within component
export function useContextQuoteDays() {
	const context = useContext(ContextQuoteDays);
	if ( !context) throw new Error( "useContextQuoteDays must be used within a -Provider");

	return context;
}