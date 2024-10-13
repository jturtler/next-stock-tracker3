'use client';

import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { forwardRef } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Button } from "./common/Button";

interface DraggableStockItemProps {
    stockData: any;
    index: number;
    moveStock: (fromIndex: number, toIndex: number) => void;
    itemClick?: (stock: any) => void;
}

const StockSearchResultItem = forwardRef<HTMLDivElement, DraggableStockItemProps>(
    ({ stockData, index, moveStock, itemClick }, ref) => {
        const dragRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false); // State to track dragging

		const [ flashId, setFlashId ] = useState< number >(-1);

        const [, drag] = useDrag({
            type: 'STOCK',
            item: { index },
            end: (item, monitor) => {
                setIsDragging(false); // Reset dragging state when drag ends
                if (monitor.didDrop()) {
                    // Optionally handle if dropped on a valid drop target
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(), // Collect the dragging state
            }),
        });

        const [, drop] = useDrop({
            accept: 'STOCK',
            hover: (item: { index: number }) => {
                if (item.index !== index) {
                    moveStock(item.index, index);
                    item.index = index;  // Update the index for further hovers
                }
            },
        });

        // Combine refs using the useEffect hook
        useEffect(() => {
            if (dragRef.current) {
                drag(dragRef.current);
                drop(dragRef.current);
            }
        }, [drag, drop]);

     
		const getCssFlash = ( i: number ): string => ( i === flashId ) ? 'flash': '';

        // w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4
        return (
			<div
                ref={dragRef}
                className={` m-1
					${isDragging ? 'dragging' : 'bg-snow-white'}`}
					onClick={itemClick}
            >
			<Button key={index} className={"bg-blue-900 " + getCssFlash(index)} >{stockData.symbol}</Button>
			</div>
        );
    }
);

export default StockSearchResultItem;