export default function Header() {
	return (
		<header className="bg-blue-950 text-white px-2 py-2 shadow-md">
		<div className="mx-auto ml-4 flex items-center justify-between">
		  <div className="flex flex-row">
			 <div className="mr-2 text-2xl uppercase tracking-wider">Stock</div>
			 <div className="text-secondary flex flex-col text-xs font-semibold uppercase">
				<span>Index</span>
				<span>Market</span>
			 </div>
		  </div>
  
		  <div className="ml-3 flex-1 flex justify-end"><div className="mr-3">NAV</div></div>
		</div>
	 </header>
	  );
};