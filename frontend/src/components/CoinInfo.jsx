import { Flex, Typography } from 'antd';

export default function CoinInfo({ coin, widthSymbol }) {
	return (
		<Flex align="center">
			<img src={coin.icon} alt={coin.name} style={{ margin: 0, width: 40, height: 40, marginRight: 10 }} />
			<Typography.Title style={{ margin: 0 }} level={2}>
				{widthSymbol && <span>({coin.symbol})</span>} {coin.name}
			</Typography.Title>
		</Flex>
	)
}