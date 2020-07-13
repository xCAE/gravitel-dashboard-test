import * as React from 'react';
import {FunctionComponent} from 'react';
import {useDashboardStyles} from './dashboard.styles';

export let ChartControls: FunctionComponent<{
	data: { titleText: string, value: number, key: string}[],
	activeIndex: number,
	setActiveIndex: (index: number) => void,
	totalCount: number,
}> = ({
	data = [],
	activeIndex,
	setActiveIndex,
	totalCount = 0,
}) => {

	let styles = useDashboardStyles();

	let renderControl = ({titleText, value, key, fill = ''}: {
		titleText: string,
		value: number,
		key: string,
		fill?: string
	},
	index: number = undefined) => (
		<div
			key={`${key + fill}__controls`}
			style={{
				...styles.dashboardChartControl,
				...(index === activeIndex ? styles.dashboardChartControlActive : {}),
			}}
			onMouseEnter={() => setActiveIndex(index)}
			onMouseLeave={() => setActiveIndex(undefined)}
		>
			<span>{titleText}</span>
			<span>{value}</span>
		</div>
	);

	let renderTotalCountControl = () => {
		if (data.length) {
			return renderControl({titleText: 'Всего', value: totalCount, key: 'total'});
		}
	};

	return (
		<div style={styles.dashboardChartControls}>
			{renderTotalCountControl()}
			{data.map(renderControl)}
		</div>
	);
};

export default ChartControls;
