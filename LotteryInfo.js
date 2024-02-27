import React, { useState, useEffect, useContext } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { WalletContext } from './ConnectWallet';
import idl from './idl.json';

const network = "devnet";
const opts = { preflightCommitment: "processed" };

const getProvider = async (wallet) => {
    const connection = new Connection(clusterApiUrl(network), opts.preflightCommitment);
    const provider = new Provider(
        connection, wallet, opts.preflightCommitment 
    );
    return provider;
};

const LotteryInfo = () => {
    const wallet = useContext(WalletContext).wallet; 
    const [lotteryData, setLotteryData] = useState(null); 

    useEffect(() => {
        const fetchLotteryInfo = async () => {
            try {
                const provider = await getProvider(wallet);
                const program = new Program(idl, new PublicKey(YOUR_PROGRAM_ID), provider);
                const lotteryAccount = await program.account.lotteryAccount.fetch(YOUR_LOTTERY_PDA); 
                setLotteryData(lotteryAccount);
            } catch (error) {
                console.error(error);
            }
        }

        if (wallet) {
            fetchLotteryInfo();
        }
    }, [wallet]); // Trigger fetch on wallet change

    return (
        <div> 
            {lotteryData ? (
                <> {/* Display lottery details: ticketPrice, startTime, endTime, etc */} </>
            ) : (
                <p>Loading lottery info...</p>
            )}
        </div>
    );
};

export default LotteryInfo;
