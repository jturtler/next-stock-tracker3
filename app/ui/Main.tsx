import { useEffect, useState } from "react";
import SearchStock from "./searchParts/searchStock";
import StockChart from "./searchParts/stockChart";

export default function Main () {

	const [ stockItem, setStockItem ] = useState< any | null >(null);

	const onStockItemSelect = ( item: any ) => {
		setStockItem( item );
	};

	console.log( 'Main' );
	console.log( stockItem );

	return (
		<div className="text-black p-2">
			Stock Data Search Page: 
			<div className=""><SearchStock handleOnItemSelect={onStockItemSelect}></SearchStock>
			</div>
			{ stockItem && <div className="mt-2">
					<div className="text-sm font-semibold">{ 'symbol: ' + stockItem.symbol + ', longName: ' + stockItem.longname }</div>
					<div className="mt-2">
						<StockChart symbol={stockItem.symbol}></StockChart>
					</div>
				</div>
			}
		</div>
	);
};