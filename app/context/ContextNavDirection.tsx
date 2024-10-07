'use client';

import { createContext, useState, useContext } from 'react';

type ContextNavDirection = {
	navDirection: string, // 'LeftSide', 'Top'
	setNavDirection: React.Dispatch<React.SetStateAction<string>>
};

const ContextNavDirection = createContext<ContextNavDirection | null>(null);

export function ContextWrapperNavDirection( { children } : { children: React.ReactNode; } ) 
{
	const [ navDirection, setNavDirection ] = useState( 'LeftSide' );

	return (
		<ContextNavDirection.Provider value={ {navDirection, setNavDirection } }>
			{ children }
		</ContextNavDirection.Provider>
	);
}

// Custom Hook - to be called when used within component
export function useContextNavDirection() {
	const context = useContext(ContextNavDirection);
	if ( !context) throw new Error( "useContextNavDirection must be used within a -Provider");

	return context;
}