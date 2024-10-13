import { useEffect, useState } from "react";
import SpinningIcon from "../common/SpinningIcon";
import * as Utils from "@/app/util/utils";
import StockChart from "./stockChart";
import StockSummary from "./stockSummary";
import StockSimpleChart from "./stockSimpleChart";

export default function StockQuotes({ stockItem, quoteDays, className, onRemoveClick }: { stockItem: any, quoteDays: number, className?:string , onRemoveClick: (stockItem: any) => void }) {

	const [loading, setLoading] = useState<boolean>(true); // Loading state
	const [quotesData, setQuotesData] = useState<any>({}); // Loading state
	const [viewMode, setViewMode] = useState<string>("details");

	if ( !className ) className = '';

	useEffect( () => {

		setLoading( true );

		if ( stockItem.symbol )
		{
			const paramDateRangeStr = '&startDate=' + Utils.getDatesRangeStr(quoteDays).replace( ' - ', '&endDate=' );

			fetch('/api/quotesData?symbol=' + stockItem.symbol + paramDateRangeStr + '&interval=1m' )
			.then( (response) => 
			{
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			}).then( (responseJson: any) => 
			{
				setLoading(false);

				if (responseJson) 
				{
					setQuotesData( responseJson );

					try
					{
						// if ( !window.GLOBAL_OBJ.dataEval ) eval( window.GLOBAL_OBJ.dataEval );

						// But with the new data created?  How do we decide to render?

						// Maybe 'NewData': [] <-- If exists/populated, we take the data source from it?

						// 'Views':
						//		- 'Chart' <-- Optional highlight with color <-- eval override (example shown on eval)
						//		- 'Summary' <-- Optional data listing <-- highlight with color? <-- eval override

					}
					catch( err )
					{
						console.log( 'ERROR during dataEval run, ' + err );
					}

					// const value = eval( 'responseJson?.quotes?.length' ); // Now that this works
					// We can use the expression..  
					// Is there any way to declare a global variable?  'INFO'?  'GLOBAL'?
					// console.log( 'eval value: ' + value );
					//if ( !window.GLOBAL_OBJ ) window.GLOBAL_OBJ = {};




					/*
					if ( !window.GLOBAL_OBJ.count ) {
						window.GLOBAL_OBJ.count = 0;
						window.GLOBAL_OBJ.items = [];
					}

					window.GLOBAL_OBJ.count++;
					window.GLOBAL_OBJ.items.push( responseJson );
					*/
				}
			})
			.catch((error) => {
				setLoading(false);
				console.error('Error fetching data:', error);
			});
		}
		else { console.log( 'no symbol' ); }
	}, [stockItem, quoteDays]); // Only if 'symbol' is not same as previous one, run 'useEffect'


	return (
		<div className={"text-black p-2 border-0 border-gray-800 shadow-md bg-orange-100 rounded-lg " + className }>
			<div className="flex w-full">
				<div className="text-sm font-semibold text-gray-800">{ stockItem.symbol + ', ' + stockItem.longname }</div>
				{viewMode === "details" && <div><button className="ml-2 text-xs font-semibold text-gray-800 bg-blue-400 px-1 rounded-sm cursor-pointer" onClick={() => setViewMode("chart")}>Show Chart</button></div>}
				{viewMode === "chart" &&<div><button className="ml-2 text-xs font-semibold text-gray-800 bg-blue-400 px-1 rounded-sm cursor-pointer"  onClick={() => setViewMode("details")}>Show Details</button></div>}
				<div className="ml-2 text-xs font-semibold text-gray-800 bg-red-400 px-1 rounded-sm cursor-pointer" title="Remove" onClick={()=>onRemoveClick(stockItem)}>x</div>
			</div>
			{ ( loading ) ?
				<div className="ml-2 mt-1 w-[30px]">
					<SpinningIcon className="text-blue-400" />
				</div>
				:
				<>
					{viewMode === "details" && <StockSummary quotesData={quotesData} /> }
					{viewMode === "chart" && <StockSimpleChart data={quotesData.quotes} /> }
				</>
			}
		</div>
	);
};