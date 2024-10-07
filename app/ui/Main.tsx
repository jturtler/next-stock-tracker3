import { useEffect, useState } from "react";
import SearchStock from "./searchParts/searchStock";
import StockQuotes from "./searchParts/stockQuotes";
import { useContextQuoteDays } from "../context/ContextQuoteDays";
import { Button } from "./common/Button";

export default function Main () {

	const [ stockList, setStockList ] = useState< any[] >([]);
	const [ stockItem, setStockItem ] = useState< any | null >(null);
	const { quoteDays } = useContextQuoteDays();

	const onStockItemSelect = ( item: any ) => {
		setStockItem( item );
		setStockList( [ ...stockList, item ] );
	};


	// Only display last 3 days worth of quotes

	return (
		<div className="text-black p-2">
			<div className=""><SearchStock handleOnItemSelect={onStockItemSelect}></SearchStock>
			</div>
			{ stockItem && <div className="mt-2">

				<div className="mt-2 flex gap-1">
						{ stockList.map( (stockItem, i ) => 
							<Button key={i} className="bg-blue-900">{stockItem.symbol}</Button>
							)
						}
					</div>

					<div className="mt-2 flex flex-col gap-2">
						{ stockList.map( (stockItem, i ) => 
							<StockQuotes key={i} stockItem={stockItem} quoteDays={quoteDays} ></StockQuotes>
							)
						}
					</div>
				</div>
			}
		</div>
	);
};