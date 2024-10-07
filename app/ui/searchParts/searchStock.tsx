import { useEffect, useRef, useState } from "react";
import { Button } from "../common/Button";
import { FaSpinner } from "react-icons/fa";
import SpinningIcon from "../common/SpinningIcon";

export default function SearchStock({ handleOnItemSelect }: { handleOnItemSelect: (stockData: any) => void }) {

	const [searchKey, setSearchcKey] = useState('');
	const [tickerData, setTickerData] = useState([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const onRequestClick = async () => {

		let searchVal = '';
		let resultList = [];
		if (inputRef?.current?.value) searchVal = inputRef.current.value;
		setSearchcKey(searchVal);

		const response: any = await fetch('/api/searchStock?symbol=' + searchVal);
		const responseJson: any = await response.json();

		setSearchcKey('');

		// <div>{item.symbol} - {item.shortname}</div>
		if (responseJson?.quotes) resultList = responseJson.quotes;
		setTickerData(resultList);
	};

	const onItemSelect = (item: any) => {
		setTickerData([]); // Reset 
		handleOnItemSelect( item );
	};

	return (
		<div className="relative text-black">
			<div className="w-full flex">
				<input
					className="p-2 max-w-[300px] rounded-md border border-gray-300 text-sm placeholder:text-gray-500 "
					id="search"
					ref={inputRef}
					placeholder="Search for stock"
					required
				/>
				<Button className="ml-1" onClick={onRequestClick} >Search</Button>
				{ searchKey && 
					<div className="ml-2 mt-1">
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