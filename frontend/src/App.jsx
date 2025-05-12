import React from 'react';
import AppLayout from './components/layout/AppLayout';
import { CryptoProvider } from './context/crypto-context';
export default function App() {
  return (
	<CryptoProvider>
		<AppLayout />
	</CryptoProvider>
  )
}
