import * as React from 'react';
import {FunctionComponent, MouseEvent, useState} from 'react';
import {Cell, Pie, PieChart, Sector} from 'recharts';
import ChartControls from './chartControls.component';

export let Chart: FunctionComponent<{
	data: {completed: number, inactive: number, active: number},
	title: string,
}> = ({
	data: {completed, inactive, active} = {completed: 0, inactive: 0, active: 0},
	title = '',
}) => {

	let [activeIndex, setActiveIndex] = useState<number>();

	let chartData = [
		{key: 'completed', titleText: 'Завершенных', value: completed, hoverColor: '#f2f0f5', fill: '#f2f0f5' },
		{key: 'inactive', titleText: 'Неактивных', value: inactive, hoverColor: '#fccf82', fill: '#d0cbd6' },
		{key: 'active', titleText: 'Активных', value: active, hoverColor: '#f9a752', fill: '#b9b1c0'},
	];

	let totalCount = chartData.reduce((result, item) => {
		return result + (isFinite(item?.value) ? item?.value : 0);
	}, 0);

	let handleMouseEnter = ((e: MouseEvent<SVGElement>, index: number) => setActiveIndex(index));

	let renderLabel = (labelText: string, count: number) => {
		let x = 115;
		let y = 120;
		return (
			<text
				x={x}
				y={y}
				textAnchor={'middle'}
				fontSize={'15px'}
				fontFamily={'sans-serif'}
				fontWeight={600}
				fontStretch={'normal'}
				fontStyle={'normal'}
				letterSpacing={'normal'}
				cursor={'pointer'}
			>
				<tspan
					x={x}
					dy={'-24'}
					alignmentBaseline={'middle'}
					fill={'#412d41'}
					fontSize={'16'}
				>
					{labelText}
				</tspan>
				<tspan
					x={x}
					dy={'48'}
					fontSize={'41'}
					fill={'url(#lifeIsPeachy)'}
				>
					{count}
				</tspan>
			</text>
		);
	};

	let renderTotalLabel = () => {
		if (activeIndex === undefined) {
			return renderLabel('Всего', totalCount);
		}
	};

	let renderActiveShape = (props: any) => {
		let {
			cx, cy, startAngle, endAngle,
			hoverColor, value,
		} = props;
		return (
			<g>
				{renderLabel(title, value)}
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={95}
					outerRadius={105}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={hoverColor}
					cornerRadius={50}
					cursor={'pointer'}
					onClick={() => {
					}}
				/>
			</g>
		);
	};

	// eslint-disable-next-line max-len,react/no-unused-prop-types
	let renderCell = (transparent: boolean = false) => ({fill, key}: {key: string, fill: string}, index: number) => {
		let fillColor = !transparent ? fill : 'transparent';
		return (
			<Cell
				key={key + fill + index}
				onClick={() => setActiveIndex(index)}
				fill={fillColor}
			/>
		);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexFlow: 'column nowrap',
			}}
		>
			<PieChart
				width={232}
				height={220}
				startAngle={0}
				onMouseLeave={() => setActiveIndex(undefined)}
			>
				<g>
					<defs>
						<linearGradient
							id={'lifeIsPeachy'}
							x1={'0'}
							x2={'0'}
							y1={'100%'}
							y2={'0'}
							gradientUnits={'userSpaceOnUse'}
							gradientTransform={'rotate(315)'}
						>
							<stop
								stopColor={'#ec5542'}
								offset={'0%'}
							/>
							<stop
								stopColor={'#fccf82'}
								offset={'100%'}
							/>
						</linearGradient>
					</defs>
					{renderTotalLabel()}
				</g>
				<Pie
					activeIndex={activeIndex}
					data={chartData}
					cx={110}
					cy={110}
					startAngle={-270}
					endAngle={90}
					innerRadius={95}
					outerRadius={105}
					cornerRadius={50}
					paddingAngle={-5}
					fill={'#f2f0f5'}
					strokeWidth={0}
					dataKey={'value'}
					nameKey={'titleText'}
				>
					{chartData.map(renderCell())}
				</Pie>
				<Pie
					activeIndex={activeIndex}
					activeShape={renderActiveShape}
					data={chartData}
					cx={110}
					cy={110}
					startAngle={-270}
					endAngle={90}
					innerRadius={0}
					outerRadius={105}
					paddingAngle={-5}
					strokeWidth={0}
					stroke={'transparent'}
					fill={'transparent'}
					cursor={'pointer'}
					dataKey={'value'}
					nameKey={'titleText'}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={() => setActiveIndex(undefined)}
				>
					{chartData.map(renderCell(true))}
				</Pie>
			</PieChart>
			<ChartControls
				data={chartData}
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
				totalCount={totalCount}
			/>
		</div>
	);
};

export default Chart;
