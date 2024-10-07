import { useEffect, useState } from "react";
import SpinningIcon from "../common/SpinningIcon";

export default function StockQuotes({ stockItem }: { stockItem: any }) {

	const [loading, setLoading] = useState<boolean>(true); // Loading state
	const [quotesData, setQuotesData] = useState<any>({}); // Loading state

	console.log( 'StockQuotes: ' );
	console.log( stockItem );

	useEffect( () => {

		setLoading( true );

		if ( stockItem.symbol )
		{
			fetch('/api/quotesData?symbol=' + stockItem.symbol + '&startDate=2024-10-01&endDate=2024-10-05&interval=1m' )
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
	}, [stockItem]); // Only if 'symbol' is not same as previous one, run 'useEffect'

	return (
		<div className=" text-black p-2 border-0 border-gray-800 shadow-md bg-orange-100 rounded-lg">
			{ ( loading ) ?
				<div className="ml-2 mt-1 w-[30px]">
					<SpinningIcon className="text-blue-400" />
				</div>
				:
				<div>
					{ quotesData?.quotes && 
						<div>
							{ <div className="text-sm font-semibold text-gray-800">Prices:</div> } 
							{ quotesData.quotes.map( ( item: any, i: number ) => i <= 10 && <div key={i} className="text-xs">{ JSON.stringify(item) }</div> ) } 
							{ quotesData.quotes.length > 10 && <div className="text-sm italic text-gray-400">{ '...more prices, total: ' + quotesData.quotes.length }</div> }
						</div>
					}
				</div>
			}
		</div>
	);
};