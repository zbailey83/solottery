import React, { useState, createContext } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

const WalletContext = createContext(null);

const ConnectWallet = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [wallet, setWallet] = useState(null);

    const connectWallet = async () => {
        try {
            const wallets = [ new PhantomWalletAdapter() ]; // Add other wallets if desired
            const { connected, ...resp } = await getWallets(wallets);

            if(connected) {
                setWallet(resp.publicKey);
                setWalletConnected(true); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ... (Add disconnect logic if desired)

    return (
        <WalletContext.Provider value={{ wallet, walletConnected }}>
            <button onClick={connectWallet}>
                {walletConnected ? "Connected" : "Connect Phantom Wallet"}
            </button>
        </WalletContext.Provider>
    );
};

export { ConnectWallet, WalletContext };
