import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfoliChart";
import AssestsTable from "../AssestsTable";

const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem',
  }

export default function AppContent() {
	const { assets, crypto } = useCrypto();
	const cryptoPrice = crypto.reduce((acc, c) => {
		acc[c.id] = c.price;
		return acc;
	}, {});

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={3} style={{ color: '#fff', textAlign: 'left', marginLeft: '10%' }}>
				Portfolio:{' '}
				{assets
				.map((asset) => asset.amount * cryptoPrice[asset.id])
				.reduce((acc, v) => (acc += v), 0)
				.toFixed(2)}$
			</Typography.Title>
			<PortfolioChart />
			<AssestsTable />
		</Layout.Content>
	)
}