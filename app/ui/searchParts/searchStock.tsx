import { useRef, useState } from "react";
import { Button } from "../common/Button";
import SpinningIcon from "../common/SpinningIcon";

export default function SearchStock({ handleOnItemSelect }: { handleOnItemSelect: (stockData: any) => void }) {

	const [searchKey, setSearchcKey] = useState('');
	const [searchRequesting, onSearchRequesting] = useState(false);
	const [tickerData, setTickerData] = useState([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const onRequestClick = async () => {

		let searchVal = '';
		let resultList = [];

		onSearchRequesting(true);
		const response: any = await fetch('/api/searchStock?symbol=' + searchKey);
		const responseJson: any = await response.json();

		onSearchRequesting(false);

		// <div>{item.symbol} - {item.shortname}</div>
		if (responseJson?.quotes) resultList = responseJson.quotes;
		setTickerData(resultList);
	};

	const onItemSelect = (item: any) => {
		setTickerData([]); // Reset 
		const retrieveTime = new Date().getTime();
	
		setSearchcKey('');
	
		handleOnItemSelect( { ...item, retrieveTime } );
	};

	return (
		<div className="relative text-black">
			<div className="w-full flex h-9 bg-slate-100 border-1 border-blue-950 p-1 rounded-md">
				<input
					className="p-2 max-w-[300px] rounded-md border border-gray-300 text-xs placeholder:text-gray-500 "
					id="search"
					value={searchKey}
					onChange={ (e) => setSearchcKey(e.currentTarget.value) }
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

			{ ( tickerData.length > 0 ) && 
				<div className="absolute z-10 top-full max-h-[200px] max-w-[300px] overflow-y-auto p-1 border border-gray-300 bg-gray-100 rounded shadow-lg text-gray-700 cursor-pointer">
					{tickerData.map((item: any, i) => (
						<div key={'ssr_' + i} onClick={() => onItemSelect(item) } className="hover:bg-gray-300 text-sm p-1">{item.symbol} - {item.shortname}</div>
					))}
				</div> 
			}
		</div>
	);
};