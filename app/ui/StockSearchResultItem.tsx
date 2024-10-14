import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { forwardRef } from "react";

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

        const [, drag] = useDrag({
            type: 'STOCK',
            item: { index },
            end: (item, monitor) => {
                setIsDragging(false); // Reset dragging state when drag ends
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

        return (
            <div
                ref={dragRef}
                className={`hover:bg-orange-400 transition cursor-move px-2 rounded h-full ${isDragging ? 'bg-orange-400' : 'bg-blue-500'}`} // Change color when dragging
                onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                }}
                onClick={itemClick}
            >
                <button>{stockData.symbol}</button>
            </div>
        );
    }
);

export default StockSearchResultItem;
