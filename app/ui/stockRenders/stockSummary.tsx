import { useEffect, useState } from 'react';
import StockQuoteLine from './stockQuoteLine';
import { useContextMainModal } from '@/app/context/ContextMainModal';

const shortListCount: number = 2;
const longListCount: number = 5;

export default function StockSummary({ quotesData }: { quotesData: any }) {

	const [quotesShowNum, setQuotesShowNum] = useState<number>(shortListCount);
	const [quotesExpend, setQuotesExpend] = useState<boolean>(false);
	const [summaryData, setSummaryData] = useState<any>({});
	const { mainModal, setMainModal } = useContextMainModal();	

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

	 
	const onExpendClick = ( quotes: any[] ) => {
		setMainModal( { show: true, data: { dataList: quotes }} );
	};


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
						{ quotesData.quotes.length > quotesShowNum && <div className="text-sm italic text-gray-400 cursor-pointer hover:text-blue-600" onClick={() => onExpendClick(quotesData.quotes)}>{ '...more prices, total: ' + quotesData.quotes.length }</div> }
					</div>
				</div>
			}		
		</div>
	);
};