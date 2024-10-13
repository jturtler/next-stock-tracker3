import { useEffect, useState } from 'react';
import StockQuoteLine from './stockQuoteLine';

const shortListCount: number = 2;
const longListCount: number = 5;

export default function StockSummary({ quotesData }: { quotesData: any }) {

	const [quotesShowNum, setQuotesShowNum] = useState<number>(shortListCount);
	const [quotesExpend, setQuotesExpend] = useState<boolean>(false);
	const [summaryData, setSummaryData] = useState<any>({});

	const compareNSet = ( sumData: any, item: any, propName: string, compareStr?: string ) => {
		if ( !compareStr ) compareStr = 'compHigh';

		if ( !sumData[propName] ) sumData[propName] = item[propName];
		else if ( compareStr === 'compHigh' && sumData[propName] < item[propName] ) sumData[propName] = item[propName];
		else if ( compareStr === 'compLow' && sumData[propName] > item[propName] ) sumData[propName] = item[propName];
	};

	useEffect(() => {
		const newSummaryData: any = {};

		quotesData.quotes.forEach( ( item: any ) => {
			compareNSet( newSummaryData, item, 'open', 'compLow' );
			compareNSet( newSummaryData, item, 'close' );
			compareNSet( newSummaryData, item, 'low', 'compLow' );
			compareNSet( newSummaryData, item, 'high' );
			compareNSet( newSummaryData, item, 'volume' );			
		});

		setSummaryData( newSummaryData );
    }, [quotesData]);

	 
	const onExpendClick = () => {
		if ( quotesExpend )
		{
			// Make this a single object state?
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
		<div className="pt-0">
			{ quotesData?.quotes && 
				<div>
					<div className="text-xs flex flex-col gap-1">
						<div className="bg-gray-200 rounded-sm p-1 w-fit">Price | Low: {summaryData.low?.toFixed(1)}, High: {summaryData.high?.toFixed(1)}</div>
						<div className="bg-violet-200 rounded-sm p-1 w-fit">Volume | Max: {summaryData.volume?.toLocaleString()}</div>
					</div>
					<div className='pt-2'>
						{ quotesData.quotes.map( ( item: any, i: number ) => i <= quotesShowNum && <StockQuoteLine key={i} quoteData={item}></StockQuoteLine> ) } 
						{ quotesData.quotes.length > quotesShowNum && <div className="text-sm italic text-gray-400 cursor-pointer hover:text-blue-600" onClick={onExpendClick}>{ '...more prices, total: ' + quotesData.quotes.length }</div> }
					</div>
				</div>
			}		
		</div>
	);
};