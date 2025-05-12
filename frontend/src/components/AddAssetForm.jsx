import { useState, useRef } from "react";
import {
	Select,
	Space,
	Divider,
	InputNumber,
	Form,
	Button,
	DatePicker,
	Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validMessage = {
	required: '${label} is required',
	types: {
		number: '${label} is not a valid number',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

export default function AddAssetForm({ onClose }) {
	const [form] = Form.useForm();
	const [coin, setCoin] = useState(null);
	const { crypto, addAsset } = useCrypto();
	const [submitted, setSubmitted] = useState(false);
	const assetRef = useRef(null);

	if (submitted) {
		return (
			<Result
				status="success"
				title="New asset added"
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
				<Button type="primary" key="console" onClick={onClose}>
					Close
				</Button>
				]}
			/>
		)
	}

	if (!coin) {
		return (
			<Select
			style={{ width: '100%' }}
			allowClear
			placeholder="Select coin"
			onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
			optionLabelProp="label"
			options={crypto?.map(coin => ({
				label: coin.name,
				value: coin.id,
				icon: coin.icon,
			}))}
			optionRender={(option) => (
				<Space>
					<img src={option.data.icon} alt={option.data.label} style={{ width: 20, height: 20 }} />
					<span>{option.data.label}</span>
				</Space>
			)}
		/>
		)
	}

	const onFinish = (values) => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		}
		assetRef.current = newAsset;
		setSubmitted(true);
		addAsset(newAsset);
	}

	const handleAmountChange = (value) => {
		const price = form.getFieldValue('price');
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		});
	}

	const handlePriceChange = (value) => {
		const amount = form.getFieldValue('amount');
		form.setFieldsValue({
			total: +(amount * value).toFixed(2),
		});
	}

	return (
		<Form
		form={form}
		name="basic"
		labelCol={{ span: 4 }}
		wrapperCol={{ span: 10 }}
		style={{ maxWidth: 600 }}
		initialValues={{
			price: +coin.price.toFixed(2),
		}}
		onFinish={onFinish}
		validateMessages={validMessage}
		>
			<CoinInfo coin={coin} />
			<Divider />
			
			<Form.Item
			label="Amount"
			name="amount"
			rules={[
				{ required: true, message: 'Please input amount!' },
				{ type: 'number', min: 0, message: 'Amount must be greater than 0' }
			]}
			>
			<InputNumber
			placeholder="Enter coin amount"
			onChange={handleAmountChange}
			style={{ width: '100%' }} />
			</Form.Item>
	
			<Form.Item
			label="Price"
			name="price"
			>
			<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
			label="Date & Time"
			name="date"
			>
			<DatePicker showTime style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
			label="Total"
			name="total"
			>
			<InputNumber disabled={true} style={{ width: '100%' }} />
			</Form.Item>
		
			<Form.Item>
			<Button type="primary" htmlType="submit">
				Add asset
			</Button>
			</Form.Item>
		</Form>
	)
}