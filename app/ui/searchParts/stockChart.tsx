import { useEffect, useRef, useState } from "react";
import SpinningIcon from "../common/SpinningIcon";

export default function StockChart({ symbol }: { symbol: string }) {

	const [loading, setLoading] = useState<boolean>(true); // Loading state
	const [chartData, setChartData] = useState<any>({}); // Loading state

	useEffect( () => {

		// console.log( 'StockChart useEffect: ' + symbol );

		if ( symbol )
		{
			// console.log( 'Retrieving for ChartData..' );

			fetch('/api/chartData?symbol=' + symbol + '&startDate=2024-10-01&endDate=2024-10-05&interval=1m' )
			.then( (response) => 
			{
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			}).then( (responseJson: any) => 
			{
				setLoading(false);
				// console.log( responseJson );
				if (responseJson) setChartData( responseJson );
			})
			.catch((error) => {
				setLoading(false);
				console.error('Error fetching data:', error);
			});
		}
		else { console.log( 'no symbol' ); }
	}, [symbol]); // Only if 'symbol' is not same as previous one, run 'useEffect'

	return (
		<div className=" text-black">
			{ ( loading ) ?
				<div className="ml-2 mt-1">
					<SpinningIcon className="text-gray-400" />
				</div>
				:
				<div>
					{ chartData?.quotes && 
						<div>
							{ <div className="text-sm font-semibold text-gray-800">Prices:</div> } 
							{ chartData.quotes.map( ( item: any, i: number ) => i <= 10 && <div key={i} className="text-xs">{ JSON.stringify(item) }</div> ) } 
							{ chartData.quotes.length > 10 && <div className="text-sm italic text-gray-400">{ '...more prices, total: ' + chartData.quotes.length }</div> }
						</div>
					}
				</div>
			}
		</div>
	);
};