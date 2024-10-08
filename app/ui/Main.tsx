import { useEffect, useState } from "react";
import SearchStock from "./searchParts/searchStock";
import StockQuotesCard from "./searchParts/stockQuotesCard";
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

	const stockBtnClick = ( stockItem: any ) => {
		console.log( stockItem ); // How to flash & scroll the bottom one?
	};
	// Only display last 3 days worth of quotes

	const onRemoveClicked = ( stockItem: any ) => {
		console.log( stockItem.symbol + ' Removal Trying' );
		setStockList( [ ...stockList.filter(item => item !== stockItem) ] );
	};

	return (
		<div className="text-black p-2">
			<div className=""><SearchStock handleOnItemSelect={onStockItemSelect}></SearchStock>
			</div>
			{ stockItem && <div className="mt-2">

				<div className="mt-2 flex gap-1">
						{ stockList.map( (stockItem, i ) => 
							<Button key={i} className="bg-blue-900" onClick={() => stockBtnClick(stockItem)}>{stockItem.symbol}</Button>
							)
						}
					</div>

					<div className="mt-2 flex flex-col gap-2">
						{ stockList.map( (stockItem, i ) => 
							<StockQuotesCard key={i} stockItem={stockItem} quoteDays={quoteDays} onRemoveClick={onRemoveClicked} ></StockQuotesCard>
							)
						}
					</div>
				</div>
			}
		</div>
	);
};