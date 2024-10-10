import { useEffect, useRef, useState } from "react";
import { Button } from "../common/Button";
import SpinningIcon from "../common/SpinningIcon";

export default function SearchStock({ handleOnItemSelect }: { handleOnItemSelect: (stockData: any) => void }) {

	const [searchKey, setSearchcKey] = useState('');
	const [searchRequesting, onSearchRequesting] = useState(false);
	const [tickerData, setTickerData] = useState([]);
	const [showSearchResultList, setShowSearchResultList] = useState(false);
	const divInputRef = useRef<HTMLDivElement>(null);
	const divListRef = useRef<HTMLDivElement>(null);

	const onRequestClick = async () => {
		let resultList = [];

		onSearchRequesting(true);
		const response: any = await fetch('/api/searchStock?symbol=' + searchKey);
		const responseJson: any = await response.json();

		onSearchRequesting(false);

		if (responseJson?.quotes) resultList = responseJson.quotes;
		setTickerData(resultList);
	};

	const onItemSelect = (item: any) => {

		setTickerData([]); // Reset 	
		setSearchcKey('');		
		setShowSearchResultList(false);	

		handleOnItemSelect( item );
	};

	const handleClickOutside = (event: MouseEvent) => {
		if ( !divInputRef.current?.contains(event.target as Node)
			&& !divListRef.current?.contains(event.target as Node) ) {
			setShowSearchResultList(false);
		}
	};


	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const onSamplesClick = ( sampleStr: string ) => {
		setSearchcKey( sampleStr );
	};

	return (
		<div className="relative text-black">

			<div className="w-full flex h-6 bg-slate-100 border-1 border-blue-950 p-1 rounded-md gap-1 pl-2">
				<div className="text-gray-400 text-[10px] mx-1 italic">Samples:</div>
				<Button onClick={() => onSamplesClick('google')} className="bg-gray-300 text-white text-[10px]">google</Button>
				<Button onClick={() => onSamplesClick('amazon')} className="bg-gray-300 text-white text-[10px]">amazon</Button>
				<Button onClick={() => onSamplesClick('tesla')} className="bg-gray-300 text-white text-[10px]">tesla</Button>
			</div>

			<div className="w-full flex h-9 bg-slate-100 border-1 border-blue-950 p-1 rounded-md" ref={divInputRef} onClick={() => setShowSearchResultList(true)}>
				<input
					className="p-2 max-w-[300px] rounded-md border border-gray-300 text-xs placeholder:text-gray-500 "
					id="search"
					value={searchKey}
					onChange={ (e) => setSearchcKey(e.target.value) }
					onKeyUp={ (e) => { if ( e.key === 'Enter') { e.preventDefault(); onRequestClick(); } } }
					placeholder="Search for stock"
					required
				/>
				<Button className="ml-1" onClick={onRequestClick} >Search</Button>
				{ searchRequesting && 
					<div className="ml-2">
						<SpinningIcon className="text-gray-400" />
					</div>
				}
			</div>

			{ showSearchResultList && 
				<div className="absolute z-10 top-full max-h-[200px] max-w-[300px] overflow-y-auto p-1 border border-gray-300 bg-gray-100 rounded shadow-lg text-gray-700 cursor-pointer" ref={divListRef}>
					{tickerData.map((item: any, i) => (
						<div key={'ssr_' + i} onClick={() => onItemSelect(item) } className="hover:bg-gray-300 text-sm p-1">{item.symbol} - {item.shortname}</div>
					))}
				</div> 
			}
		</div>
	);
};