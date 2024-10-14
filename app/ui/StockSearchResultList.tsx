


import { useEffect, useState } from "react";
import StockSearchResultItem from "./StockSearchResultItem";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';


export default function StockSearchResultList({data, itemOnClick, handleReorderData}: {data: any, itemOnClick: (itemData: any, no: number) => void, handleReorderData: (list: any) => void}) {
	
	const [list, setList] = useState<any>(data);

    useEffect(() => {
        setList(data);
    }, [data])

	const moveStock = (fromIndex: number, toIndex: number) => {
		const updatedStocks = [...list!];
		const [movedStock] = updatedStocks.splice(fromIndex, 1);
		updatedStocks.splice(toIndex, 0, movedStock);

        setList(updatedStocks);
        handleReorderData(updatedStocks);
	};



    return (
        <DndProvider  backend={isMobile ? TouchBackend : HTML5Backend}>
			 <div className="flex flex-wrap mx-4 space-x-2">
				{list.map((item: any, index: number) => (
                    // <Button key={index} className={"bg-blue-900 " + getCssFlash(index)} onClick={() => itemOnClick(item, index)}>{item.symbol}</Button>
                    <StockSearchResultItem key={index} stockData={item} index={index} moveStock={moveStock} itemClick={(item) => itemOnClick(item, index)} />
				))}
			</div>
		</DndProvider>
    )
}