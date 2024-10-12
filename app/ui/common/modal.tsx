export default function Modal( { isVisible, onClose, className, children }: { isVisible: boolean, onClose: () => void, className?: string, children: React.ReactNode } ) {

	if ( !className ) className = '';
	if ( !isVisible ) return null;

	return (
		<div className={"fixed inset-0 bg-black bg-opacity-25 backgrop-blur-sm flex justify-center items-center " + className }>
			{ children }
		</div>
	);
};