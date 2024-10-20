import { useEffect, useState } from "react";
import SearchStock from "./stockSearches/searchStock";
import StockQuotesCard from "./stockRenders/stockQuotesCard";
import { useContextQuoteDays } from "../context/ContextQuoteDays";
import { Button } from "./common/Button";
import StockSearchResultList from "./stockSearches/StockSearchResultList";
import Modal from "./common/modal";
import { useContextMainModal } from "../context/ContextMainModal";
import StockQuoteLine from "./stockRenders/stockQuoteLine";

export default function Main () {

	const [ stockList, setStockList ] = useState< any[] >([]);
	const [ stockItem, setStockItem ] = useState< any | null >(null);
	const [ flashId, setFlashId ] = useState< number >(-1);
	const { quoteDays } = useContextQuoteDays();
	// const [ showEvalModal, setShowEvalModal ] = useState<boolean>(false);
	const { mainModal, setMainModal } = useContextMainModal();	
	

	const onStockItemSelect = ( item: any ) => {  
		setStockItem( item );  setStockList( [ ...stockList, item ] );  
	};
	
	const stockBtnClick = ( stockItem: any, i: number ) => {
		document.getElementById('stockCard_' + i)?.scrollIntoView({ behavior: 'instant' }); // vs 'smooth'

		setFlashId(i);			
		setTimeout(() => { setFlashId(-1); }, 500);
	};

	const handleReorderData = (newList: any) => {
		setStockList(newList);
	}


	// Modal Related -------------
	const modalClose = () => setMainModal( { show: false, data: {} } );


	const onRemoveClicked = ( stockItem: any ) => setStockList( [ ...stockList.filter(item => item !== stockItem) ] );
	const getCssFlash = ( i: number ): string => ( i === flashId ) ? 'flash': '';


	return (
		<div className="text-black p-2">
			<div className=""><SearchStock handleOnItemSelect={onStockItemSelect}></SearchStock>
			</div>
			{ stockItem && <div className="mt-2">

				<div className="mt-2 flex gap-1">
						<StockSearchResultList data={stockList} itemOnClick={(stockItem, index) => stockBtnClick(stockItem, index) } handleReorderData={(newList) => handleReorderData(newList)} />
					</div>

					<div className="mt-2 flex flex-col gap-2">
						{ stockList.map( (stockItem, i ) => 
							<div id={'stockCard_' + i } key={i}>
								<StockQuotesCard className={"" + getCssFlash(i)} key={i} stockItem={stockItem} quoteDays={quoteDays} onRemoveClick={onRemoveClicked} ></StockQuotesCard>
							</div>
							)
						}
					</div>
				</div>
			}
			<Modal isVisible={mainModal.show} onClose={modalClose} className="z-10">
				<div className="w-10/12 h-5/6 bg-white rounded-lg shadow-lg p-2 flex flex-col justify-start items-start">
					<div><h2 className="font-semibold text-gray-600 mb-1">Data:</h2></div>
					<div className="flex-1 bg-gray-300 w-full overflow-y-auto">
						{
							mainModal.data?.infoStr && <div>{ mainModal.data.infoStr }</div>
						}
						{
							mainModal.data?.dataList && <div className="">
								{ mainModal.data.dataList.map( ( item: any, i: number ) => 
								<div className="text-xs break-words" key={i}>{JSON.stringify(item, null, 2)}</div> ) } 
							</div>
						}
					</div>
					<div className="pl-1">
						<button className="rounded-lg p-1 px-2 bg-blue-400 mt-2 text-sm text-white" onClick={modalClose}>Close</button>
					</div>
				</div>
			</Modal>

		</div>
	);
};