import { Layout, Spin } from "antd";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import { CryptoContext } from "../../context/crypto-context";
import { useContext } from "react";

export default function AppLayout({ children }) {
	const { loading } = useContext(CryptoContext)
	if (loading) {
		return <Spin fullscreen />
	}

	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	)
}