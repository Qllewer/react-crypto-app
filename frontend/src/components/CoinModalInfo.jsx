import { Flex, Tag, Typography, Divider } from "antd";
import CoinInfo from "./CoinInfo";
export default function CoinModalInfo({ coin }) {
	return (
		<>
			<CoinInfo coin={coin} widthSymbol />
			<Divider />
			<Typography.Paragraph>
				<Typography.Text strong>
					1 hour:
					<Tag color={coin.priceChange1h > 0 ? "green" : "red"}>{coin.priceChange1h}%</Tag>
				</Typography.Text>
				<Typography.Text strong>
					1 day:
					<Tag color={coin.priceChange1d > 0 ? "green" : "red"}>{coin.priceChange1d}%</Tag>
				</Typography.Text>
				<Typography.Text strong>
					1 week:
					<Tag color={coin.priceChange1w > 0 ? "green" : "red"}>{coin.priceChange1w}%</Tag>
				</Typography.Text>
			</Typography.Paragraph>
			<Typography.Paragraph>
				<Typography.Text strong>
					Price: {coin.price.toFixed(2)}$
				</Typography.Text>
			</Typography.Paragraph>
			<Typography.Paragraph>
				<Typography.Text strong>
					PriceBTC: {coin.priceBtc}$
				</Typography.Text>
			</Typography.Paragraph>
			<Typography.Paragraph>
				<Typography.Text strong>
					Market Cap: {coin.marketCap}$
				</Typography.Text>
			</Typography.Paragraph>
			<Typography.Paragraph>
				<Typography.Text strong>
					Contract Address: {coin.contractAddress}
				</Typography.Text>
			</Typography.Paragraph>
		</>
	)
}