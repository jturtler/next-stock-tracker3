import { createContext, useState, useContext } from 'react';

type ContextMainModal = {
	mainModal: any,
	setMainModal: React.Dispatch<React.SetStateAction<any>>
};

const ContextMainModal = createContext<ContextMainModal | null>(null);

export function ContextWrapperMainModal( { children } : { children: React.ReactNode; } ) 
{
	const [ mainModal, setMainModal ] = useState( { } );

	return (
		<ContextMainModal.Provider value={ {mainModal, setMainModal } }>
			{ children }
		</ContextMainModal.Provider>
	);
}

// Custom Hook - to be called when used within component
export function useContextMainModal() {
	const context = useContext(ContextMainModal);
	if ( !context) throw new Error( "useContextMainModal must be used within a -Provider");

	return context;
}