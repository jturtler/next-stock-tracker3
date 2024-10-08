import { useEffect, useState } from "react";
import SpinningIcon from "../common/SpinningIcon";
import * as Utils from "@/app/util/utils";

const shortListCount: number = 4;
const longListCount: number = 20;

export default function StockQuotes({ stockItem, quoteDays, onRemoveClick }: { stockItem: any, quoteDays: number, onRemoveClick: (stockItem: any) => void }) {

	const [loading, setLoading] = useState<boolean>(true); // Loading state
	const [quotesData, setQuotesData] = useState<any>({}); // Loading state
	const [quotesShowNum, setQuotesShowNum] = useState<number>(shortListCount); // Loading state
	const [quotesExpend, setQuotesExpend] = useState<boolean>(false); // Loading state

	useEffect( () => {

		setLoading( true );

		if ( stockItem.symbol )
		{
			const dateStr = Utils.getDatesRangeStr(quoteDays);
			const paramDateRangeStr = '&startDate=' + dateStr.replace( ' - ', '&endDate=' );

			console.log( paramDateRangeStr );

			fetch('/api/quotesData?symbol=' + stockItem.symbol + paramDateRangeStr + '&interval=1m' )
			.then( (response) => 
			{
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			}).then( (responseJson: any) => 
			{
				setLoading(false);
				// console.log( responseJson );
				if (responseJson) setQuotesData( responseJson );
			})
			.catch((error) => {
				setLoading(false);
				console.error('Error fetching data:', error);
			});
		}
		else { console.log( 'no symbol' ); }
	}, [stockItem, quoteDays]); // Only if 'symbol' is not same as previous one, run 'useEffect'

	const onExpendClick = () => {
		if ( quotesExpend )
		{
			setQuotesShowNum( shortListCount );
			setQuotesExpend( false );
		}
		else
		{
			setQuotesShowNum( longListCount );
			setQuotesExpend( true );
		}
	}

	return (
		<div className=" text-black p-2 border-0 border-gray-800 shadow-md bg-orange-100 rounded-lg">
			<div className="flex w-full">
				<div className="text-sm font-semibold text-gray-800">{ stockItem.symbol + ', ' + stockItem.longname }</div>
				<div className="ml-2 text-xs font-semibold text-gray-800 bg-red-400 px-1 rounded-sm cursor-pointer" title="Remove" onClick={()=>onRemoveClick(stockItem)}>x</div>
			</div>
			{ ( loading ) ?
				<div className="ml-2 mt-1 w-[30px]">
					<SpinningIcon className="text-blue-400" />
				</div>
				:
				<div>
					{ quotesData?.quotes && 
						<div>
							{ quotesData.quotes.map( ( item: any, i: number ) => i <= quotesShowNum && <div key={i} className="text-xs">{ JSON.stringify(item) }</div> ) } 
							{ quotesData.quotes.length > quotesShowNum && <div className="text-sm italic text-gray-400 cursor-pointer hover:text-blue-600" onClick={onExpendClick}>{ '...more prices, total: ' + quotesData.quotes.length }</div> }
						</div>
					}
				</div>
			}
		</div>
	);
};