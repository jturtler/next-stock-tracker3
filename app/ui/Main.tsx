import { useEffect, useState } from "react";
import SearchStock from "./searchParts/searchStock";
import StockQuotesCard from "./searchParts/stockQuotesCard";
import { useContextQuoteDays } from "../context/ContextQuoteDays";
import { Button } from "./common/Button";

export default function Main () {

	const [ stockList, setStockList ] = useState< any[] >([]);
	const [ stockItem, setStockItem ] = useState< any | null >(null);
	const [ flashId, setFlashId ] = useState< number >(-1);
	const { quoteDays } = useContextQuoteDays();

	const onStockItemSelect = ( item: any ) => {  setStockItem( item );  setStockList( [ ...stockList, item ] );  };
	
	const stockBtnClick = ( stockItem: any, i: number ) => {
		document.getElementById('stockCard_' + i)?.scrollIntoView({ behavior: 'instant' }); // vs 'smooth'

		setFlashId(i);			
		setTimeout(() => { setFlashId(-1); }, 500);
	};

	const onRemoveClicked = ( stockItem: any ) => setStockList( [ ...stockList.filter(item => item !== stockItem) ] );
	const getCssFlash = ( i: number ): string => ( i === flashId ) ? 'flash': '';

	return (
		<div className="text-black p-2">
			<div className=""><SearchStock handleOnItemSelect={onStockItemSelect}></SearchStock>
			</div>
			{ stockItem && <div className="mt-2">

				<div className="mt-2 flex gap-1">
						{ stockList.map( (stockItem, i ) => 
							<Button key={i} className={"bg-blue-900 " + getCssFlash(i)} onClick={() => stockBtnClick(stockItem, i)}>{stockItem.symbol}</Button>
							)
						}
					</div>

					<div className="mt-2 flex flex-col gap-2">
						{ stockList.map( (stockItem, i ) => 
							<div id={'stockCard_' + i }>
								<StockQuotesCard className={"" + getCssFlash(i)} key={i} stockItem={stockItem} quoteDays={quoteDays} onRemoveClick={onRemoveClicked} ></StockQuotesCard>
							</div>
							)
						}
					</div>
				</div>
			}
		</div>
	);
};