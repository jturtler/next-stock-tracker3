'use client';

import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({payload, label}: any) => {

	if (payload && payload.length) {

		const formattedDate = format(parseISO(label), "dd MMM yyyy HH:mm");
		const data = payload[0].payload;
		return (
			<div className="flex flex-col custom-tooltip bg-white p-2 border border-gray-200 rounded shadow text-xs space-y-2">
				<div className="text-gray-500 flex justify-between space-x-3">
					<span>Date:</span>
					<span className="text-right font-semibold">{formattedDate}</span>
				</div>
				{data.close && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>Close:</span>
						<span className="font-semibold text-right">{formatDisplayNumber(data.close)}</span>
					</div>
				)}
				{data.open && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>Open:</span>
						<span className="font-semibold text-right">{formatDisplayNumber(data.open)}</span>
					</div>
				)}
				{data.high && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>High:</span>
						<span className="font-semibold text-right">{formatDisplayNumber(data.high)}</span>
					</div>
				)}
				{data.low && (
					<div className="text-gray-500 flex justify-between space-x-3">
						<span>Low:</span>
						<span className="font-semibold text-right">{formatDisplayNumber(data.low)}</span>
					</div>
				)}
			</div>
		);
	}

	return null;
};

// Add commas to thousands.
// 12345 ==> 12,345.00
const formatDisplayNumber = (n: number | string): string => {
    let num = convertToNumber(n);

    const formattedNum = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);

    return formattedNum;
}

const formatNumberToK = (n: number | string) => {
	let num = convertToNumber(n);

	if (num >= 1e9) {
		return (num / 1e9).toFixed(0).replace(/\.0$/, '') + 'B'; // Billions
	}
	if (num >= 1e6) {
		return (num / 1e6).toFixed(0).replace(/\.0$/, '') + 'M'; // Millions
	}
	if (num >= 1e3) {
		return (num / 1e3).toFixed(0).replace(/\.0$/, '') + 'k'; // Thousands
	}
	return formatDisplayNumber(num); // Less than thousands, retain decimal places
}

const convertToNumber = (n: string | number): number => {
    let num;
    if (typeof n === 'string') {
        num = parseFloat(n);
    }
    else {
        num = n;
    }

    return num;
}

export default function StockChart({ data }: { data: any }) {
	const [chartData, ] = useState<any>(data);

	useEffect(() => {

    }, [data]);


	const getYTicks = (): string[] => {
		let ticks = [];
		let tempTicks = [];
		if (chartData != undefined) {
			for (let i = 0; i < chartData.length; i++) {
				let close = chartData[i].close;
				if (close !== null) {
					tempTicks.push(close);
				}
			}

			tempTicks = tempTicks.sort((a, b) => a - b);
			const minTick = Math.ceil(tempTicks[0]);
			const maxTick = Math.round(tempTicks[tempTicks.length - 1]);

			const interval = maxTick - minTick;
			const step = (interval < 50 ) ? 1 : Math.round((maxTick - minTick) / 10);
			for (var i = minTick; i <= maxTick; i += step) {
				ticks.push(i.toFixed(2));
			}

			// Remove the last item, add the "maxTick" as last item
			ticks.pop();
			ticks.push(maxTick.toFixed(2));
		}

		return ticks;
	}


	const formatYPriceAxis = (tickItem: string) => {
		return formatDisplayNumber(tickItem);
	};

	const formatYVolumeAxis = (tickItem: string) => {
		return formatNumberToK(tickItem);
	};

   

	const yTicks = getYTicks();

	if (chartData === null ) return <div>Loading ...</div>;


	return (
		<div className="pt-7">
			<ResponsiveContainer width="100%" height={360}>
				<ComposedChart
					height={400}
					data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="45%" stopColor="#85C1E9" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#60a5fa " stopOpacity={0.2} />
						</linearGradient>
					</defs>

					<XAxis dataKey="date"
						axisLine={false}
						tick={false}
					/>

					<YAxis
						yAxisId="yPrice"
						orientation="right"
						domain={[yTicks[0], yTicks[yTicks.length - 1]]}  // Customize the vertical axis range
						tickCount={yTicks.length - 1}       // Set the number of ticks
						ticks={yTicks}
						tick={{ fontSize: 11 }}
						axisLine={false}  // Optionally hide the Y-axis line
						tickLine={false}  // Optionally hide the tick lines
						tickFormatter={formatYPriceAxis}
					/>
					<YAxis
						yAxisId="yVolume"
						orientation="left"
						tick={{ fontSize: 11 }}
						tickFormatter={formatYVolumeAxis}
					/>

					<Tooltip content={<CustomTooltip />} />

					<Bar yAxisId="yVolume" dataKey="volume" barSize={20} fill="#11B2B9" />
					<Area yAxisId="yPrice" type="monotone" dataKey="close" strokeWidth={1} activeDot={{ r: 8 }} dot={false} fill="url(#colorUv)" />
				</ComposedChart>
			</ResponsiveContainer>

			<hr className="text-black border mb-3" />

		</div>
	);
};