import { useEffect, useState } from "react";
import SearchStock from "./searchParts/searchStock";
import StockQuotes from "./searchParts/stockQuotes";

export default function Main () {

	const [ stockList, setStockList ] = useState< any[] >([]);
	const [ stockItem, setStockItem ] = useState< any | null >(null);

	const onStockItemSelect = ( item: any ) => {
		setStockItem( item );
	};

	console.log( 'Main' );
	console.log( stockItem );

	// Only display last 3 days worth of quotes

	return (
		<div className="text-black p-2">
			Stock Data Search Page: 
			<div className=""><SearchStock handleOnItemSelect={onStockItemSelect}></SearchStock>
			</div>
			{ stockItem && <div className="mt-2">
					<div className="text-sm font-semibold">{ 'symbol: ' + stockItem.symbol + ', longName: ' + stockItem.longname + ', retrieved: ' + stockItem.retrieveTime }</div>
					<div className="mt-2">
						<StockQuotes stockItem={stockItem} ></StockQuotes>
					</div>
				</div>
			}
		</div>
	);
};