import { Layout, Card, Statistic, List, Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";
import { capitalize } from "../utils";

const siderStyle = {
	padding: '1rem',
}

export default function AppSider() {
	const { assets, loading } = useContext(CryptoContext)

	return (<Layout.Sider style={siderStyle}>
		{assets.map((asset) => (
			<Card key={asset.id} style={{ width: 300, marginBottom: '1rem' }}>
				<Statistic 
					title={capitalize(asset.id)}
					value={asset.totalAmount}
					precision={2}
					valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
					prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
					suffix="$"
				/>
				<List
				size="small"
				bordered
				dataSource={[
					{
						title: 'Total Profit',
						value: asset.totalProfit,
						widthTag: true,
					},
					{
						title: 'Asset Amount',
						value: asset.amount,
						isPlain: true,
					},
					{
						title: 'Difference',
						// value: asset.growPercent,
					},
				]}
				renderItem={(item) => 
					<List.Item>
						<span>{item.title}</span>
						{item.widthTag && <Tag color={asset.grow ? "green" : "red"}>{asset.growPercent}%</Tag>}
						{item.isPlain && <span>{item.value}</span>}
						{!item.isPlain && 
						<Typography.Text type={asset.grow ? "success" : "danger"}>
							{typeof item.value === 'number' ? item.value.toFixed(2) : item.value}$
						</Typography.Text>}
					</List.Item>}
			/>
			</Card>
		))}
	</Layout.Sider>)
}