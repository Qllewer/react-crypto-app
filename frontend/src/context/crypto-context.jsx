import { createContext, useContext, useState, useEffect } from "react";
import { fakeFetchData, fakeFetchAssets } from "../components/layout/api";
import { percentDifference } from "../components/utils";

export const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false,
})

export const CryptoProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [assets, setAssets] = useState([])

	function mapAssets(assets, result) {
		return assets.map(asset => {
			const coin = result.find((c) => c.id === asset.id)
			return {
				grow: asset.price < coin.price,
				growPercent: percentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * (coin.price - asset.price),
				...asset,
				price: coin.price,
				name: coin.name,
			}
		})
	}

	useEffect(() => {
		async function preload() {
			setLoading(true)
			try {
				const {result} = await fakeFetchData()
				const assets = await fakeFetchAssets()
				setCrypto(result)
				setAssets(mapAssets(assets, result))
			} catch (error) {
				console.error('Error loading data:', error)
			} finally {
				setLoading(false)
			}
		}
		preload()
	}, [])

	function addAsset(newAsset) {
		setAssets((prev) => {
			const updatedAssets = [...prev, newAsset];
			return mapAssets(updatedAssets, crypto);
		});
	}

	return (
		<CryptoContext.Provider value={{ assets, setAssets, loading, setLoading, crypto, setCrypto, addAsset }}>
			{children}
		</CryptoContext.Provider>
	)
}

export default CryptoContext;

export function useCrypto() {
	return useContext(CryptoContext);
}