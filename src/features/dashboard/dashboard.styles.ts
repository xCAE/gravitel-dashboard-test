import {CSSProperties} from 'react';

export let useDashboardStyles = (): { [key: string]: CSSProperties } => ({
	dashboardRoot: {
		height: '100%',
		minHeight: '80vh',
		justifyContent: 'space-around',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	dashboardLabel: {
		fontSize: '14px',
		fontFamily: 'sans-serif',
		fontWeight: 600,
		color: '#412d41',
		width: '90%',
		margin: '20px 5% 5%',
		justifyContent: 'space-between',
		display: 'flex',
	},
	dashboardLeaveButton: {
		cursor: 'pointer',
	},
	dashboardChartsSection: {
		display: 'flex',
		width: '100%',
		maxWidth: '1200px',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	dashboardChartControls: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		maxWidth: '100%',
		padding: '20px',
	},
	dashboardChartControl: {
		display: 'flex',
		flexFlow: 'row',
		justifyContent: 'space-between',
		paddingBottom: '5px',
		paddingTop: '5px',
		textDecoration: 'none',
		color: '#412d41',
		width: '100%',
		maxWidth: '100%',
		cursor: 'pointer',
	},
	dashboardChartControlActive: {
		textDecoration: 'underline',
		color: '#7c24a4',
	},
});
