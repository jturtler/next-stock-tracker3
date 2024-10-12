import moment from 'moment';
import { useEffect, useState } from 'react';

export default function StockQuoteLine({ quoteData }: { quoteData: any }) {

	const [quoteExpend, setQuoteExpend] = useState<boolean>(false);

	useEffect(() => {
    }, [quoteData]);
	
	// const onExpendClick = () => { setQuotesExpend( false );
	// { quotesData.quotes.length > quotesShowNum && <div className="text-sm italic text-gray-400 cursor-pointer hover:text-blue-600" onClick={onExpendClick}>{ '...more prices, total: ' + quotesData.quotes.length }</div> }
	// { <div className="text-xs">{ JSON.stringify(item) }</div> ) } 


	return (
		<div className="text-xs flex flex-wrap">
			<div>{ moment( quoteData.date ).format('DD-hh:mm') }</div>
			<div className="ml-1 font-semibold text-blue-950">{ quoteData?.close }</div>
			{
				( quoteExpend ) ? <>
					<div onClick={() => {setQuoteExpend(false)}} className="ml-1 text-gray-400 font-semibold text-[10px] hover:text-blue-700 cursor-pointer">{ "<<" }</div>
					<div className="text-[11px] ml-2">{ JSON.stringify(quoteData) }</div>
				</>: <div onClick={() => {setQuoteExpend(true)}}  className="ml-1 text-gray-400 font-semibold text-[10px] hover:text-blue-700 cursor-pointer">{ ">>" }</div>
			}
		</div>
	);
};