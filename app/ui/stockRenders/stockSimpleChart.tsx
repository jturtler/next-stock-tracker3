import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Bar } from 'recharts';
import { format } from 'date-fns';

export default function StockSimpleChart({ data }: { data: any }) {
	// const [chartData, ] = useState<any>(data);
	const [maxPrice, setMaxPrice ] = useState(10);
	const [minPrice, setMinPrice ] = useState(0);

	useEffect(() => { 
		const closeValArr = data.map( ( item: any ) => item.close );
		setMaxPrice(Math.max.apply(Math, closeValArr ));
		setMinPrice(Math.min.apply(Math, closeValArr ));
	}, [data]);

	if (data === null ) return ( <div>Loading ...</div> );

	return (
		<div className="pt-3">
			<ResponsiveContainer width="100%" height={150}>
				<ComposedChart
					height={150}
					data={data}
					margin={{ top: 1, right: 1, left: 1, bottom: 1 }}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="45%" stopColor="#85C1E9" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#60a5fa " stopOpacity={0.2} />
						</linearGradient>
					</defs>

					<XAxis 
						dataKey="date"
						axisLine={false}
						tick={false}					
					/>

					<YAxis
						yAxisId="yPrice"
						orientation="right"
						domain={[minPrice, maxPrice]}  // Customize the vertical axis range
						// tickCount={yTicks.length - 1}       // Set the number of ticks
						// ticks={yTicks}
						tick={{ fontSize: 10 }}
						axisLine={false}  // Optionally hide the Y-axis line
						tickLine={false}  // Optionally hide the tick lines
						// tickFormatter={formatYPriceAxis}
					/>
					<YAxis
						yAxisId="yVolume"
						orientation="left"
						tick={{ fontSize: 10 }}
						// tickFormatter={formatYVolumeAxis}
					/>

					<Tooltip 
						contentStyle={{ fontSize: '11px', backgroundColor: '#fff', borderColor: '#ccc' }} 
						labelFormatter={(label) => format(new Date(label), 'yyyy-MM-dd hh:mm')}
					/>

					<Bar yAxisId="yVolume" dataKey="volume" barSize={20} fill="#11B2B9" />
					<Area yAxisId="yPrice" type="monotone" dataKey="close" strokeWidth={1} activeDot={{ r: 8 }} dot={false} fill="url(#colorUv)" />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};