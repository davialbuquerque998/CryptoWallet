import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// Get the blockchain node URL from environment variables
const BLOCKCHAIN_NODE: string = `${process.env.BLOCKCHAIN_NODE}`;

// Create a provider to interact with the Ethereum blockchain
const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_NODE);

let myWallet: any = null;

// Define a type for transactions
type MyTransaction = {
    to: string,
    value: bigint
}

// Function to create a new random wallet
function createWallet() {
  myWallet = ethers.Wallet.createRandom(provider);
  return myWallet;
}

// Function to recover a wallet using a private key or mnemonic phrase
function recoverWallet(pkOrMnemonic: string) {
  pkOrMnemonic.indexOf(" ") !== -1
    ? (myWallet = ethers.Wallet.fromPhrase(pkOrMnemonic, provider))
    : (myWallet = new ethers.Wallet(pkOrMnemonic, provider));

  return myWallet;
}

// Function to get the balance of an address
async function getBalance(address: string): Promise<{
  balanceInWei: bigint;
  balanceInEth: string;
}> {
  const balance: bigint = await provider.getBalance(address);
  return {
    balanceInWei: balance,
    balanceInEth: ethers.formatEther(`${balance}`),
  };
}

// Function to check if an address is valid
function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

// Function to build a transaction object
async function buildTransaction(toWallet: string, amountInEth: string) {
    const amount: bigint = ethers.parseEther(amountInEth);
    console.log(amount)
    const tx: MyTransaction = {
        to: toWallet,
        value: amount
    }

    // Get fee data from the provider
    const feeData = await provider.getFeeData();
    const gasAmount: bigint = 21000n;
    const gasPrice = feeData.gasPrice;

    if (!gasPrice) {
        return false;
    }

    // Calculate the transaction fee
    const txFee: bigint = gasAmount * gasPrice;

    // Get the balance of the wallet
    const balance = await getBalance(myWallet.address);

    // Check if there are enough funds to cover the transaction amount and fee
    if (balance.balanceInWei < (amount + txFee)) {
        return false;
    }

    return tx;
}

// Function to send a transaction
function sendTransaction(tx: MyTransaction) {
    return myWallet.sendTransaction(tx);
}

// Function to get transaction details by hash
function getTransaction(hash: string) {
    return provider.getTransaction(hash);
}

export {
    createWallet,
    recoverWallet,
    getBalance,
    sendTransaction,
    buildTransaction,
    isValidAddress,
    getTransaction
};
