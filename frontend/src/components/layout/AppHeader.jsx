import { Layout, Select, Space, Button, Spin, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useState, useEffect } from "react";
import CoinModalInfo from "../CoinModalInfo";
import AddAssetForm from "../AddAssetForm";

const hederStyle = {
	width: '100%',
	textAlign: 'center',
	height: '60px',
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

export default function AppHeader() {
	const [select, setSelect] = useState(false);
	const { crypto, loading } = useCrypto();
	const [modal, setModal] = useState(false);
	const [coin, setCoin] = useState(null);
	const [drawer, setDrawer] = useState(false);

	useEffect(() => {
		const keypress = event => {
			if (event.key === '/') {
				setSelect(true);
			}
		}
		document.addEventListener('keydown', keypress);
		return () => document.removeEventListener('keydown', keypress);
	}, []);

	if (loading) {
		return <Spin fullscreen />
	}

	function handleSelect(value) {
		setSelect(false);
		setCoin(crypto.find((c) => c.id === value));
		setModal(true);
	}

	return (
		<Layout.Header style={hederStyle}>
		<Select
			allowClear
			placeholder="Press/ to open"
			onSelect={handleSelect}
			style={{ width: '200px' }}
			optionLabelProp="label"
			open={select}
			onDropdownVisibleChange={setSelect}
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
		<Button onClick={() => setDrawer(true)} type="primary">Add</Button>
		<Modal
		open={modal}
		footer={null}
		onCancel={()=> setModal(false)}>
			<CoinModalInfo coin={coin} />
		</Modal>
		<Drawer
		destroyOnClose
		style={{ width: '600px' }}
		title="Add Asset"
		placement="right"
		onClose={() => setDrawer(false)}
		open={drawer}>
		<AddAssetForm onClose={() => setDrawer(false)} />
		</Drawer>
		</Layout.Header>
	)
}