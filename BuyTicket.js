import React, { useState, useContext } from 'react';
import { 
    PublicKey,
    Connection, 
    clusterApiUrl 
} from '@solana/web3.js';
import { Provider, Program } from '@project-serum/anchor';
import idl from './idl.json'; // Your Anchor IDL 
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';

// Basic Styling
const styles = {
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
    },
    input: { margin: '10px'}, 
    button: { padding: '10px 20px', background: '#007bff', color: 'white' },
};

const BuyTicket = () => {
    const [ticketsToBuy, setTicketsToBuy] = useState(1);
    const [loading, setLoading] = useState(false);
    // ... Add state for transaction status (e.g., success, error)

    const wallet = useWallet(); // Assuming you have a Wallet Context 
    const network = "devnet";  // Adjust as needed
    const opts = { preflightCommitment: "processed" };

    const getProvider = async () => {
        const connection = new Connection(clusterApiUrl(network), opts.preflightCommitment);
        const provider = new Provider(
            connection, wallet, opts.preflightCommitment 
        );
        return provider;
    };

     const buyTickets = async () => {
        setLoading(true); 
        try {
            const provider = await getProvider();
            const program = new Program(idl, new PublicKey(YOUR_PROGRAM_ID), provider);

            // Fetch lottery account (assuming you need it)
            const lotteryAccount = await program.account.lotteryAccount.fetch(provider.wallet.publicKey);

            // Construct transaction
            const txn = await program.rpc.buyTicket(
                new anchor.BN(ticketsToBuy), {
                    accounts: {
                        lotteryAccount: provider.wallet.publicKey, // Or fetch the relevant account
                        // ... other accounts based on your contract
                    }
                }
            );

            // Send transaction, handle success/error in UI 

        } catch (error) {
            // Update state for error display 
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <input 
                type="number" 
                value={ticketsToBuy} 
                onChange={e => setTicketsToBuy(e.target.value)} 
                style={styles.input} 
            />
            <button 
                onClick={buyTickets} 
                disabled={loading}
                style={styles.button} 
            >
                {loading ? "Processing..." : "Buy Tickets"}
            </button>
            {/* Add transaction status display here */} 
        </div>
    );
};

export default BuyTicket;
