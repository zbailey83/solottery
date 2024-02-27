import React, { useState, useEffect, useContext } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletContext } from './ConnectWallet';

const network = "devnet";
const opts = { preflightCommitment: "processed" };
const connection = new Connection(clusterApiUrl(network), opts.preflightCommitment);

const MyTickets = () => {
    const wallet = useContext(WalletContext).wallet; 
    const [tickets, setTickets] = useState([]); 

    useEffect(() => {
        const fetchMyTickets = async () => {
            const ownedTokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, { programId: TOKEN_PROGRAM_ID });
            
            // Filter for your lottery ticket NFTs (needs Metadata Fetching)
            // setTickets(... process and populate ticket data);
        }

        if (wallet) {
            fetchMyTickets();
        }
    }, [wallet]);

    return (
        <div> 
            <h2>My Tickets</h2>
            {/* Display list of owned ticket NFTs */}
        </div>
    );
};

export default MyTickets;
