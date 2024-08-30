import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { buildTransaction, createWallet, getBalance, getTransaction, isValidAddress, recoverWallet, sendTransaction } from "./WalletService";
import dotenv from "dotenv";
dotenv.config();

// Get the symbol for the cryptocurrency from environment variables
const SYMBOL: string = `${process.env.SYMBOL}`;

const rl = readline.createInterface({ input, output });

let myAddress: string = "";

// Function to display the main menu
function menu(): void {
  setTimeout(async () => {
    console.clear();

    // Display wallet status
    if (myAddress) {
      console.log(`You are logged as ${myAddress}`);
    } else {
      console.log("You are not logged");
    }

    // Display menu options
    console.log("1 - Create Wallet");
    console.log("2 - Recover Wallet");
    console.log("3 - Balance");
    console.log("4 - Send " + SYMBOL);
    console.log("5 - Search Tx");
    console.log("6 - Exit");
    
    // Get user input
    const answer = await rl.question("Choose your option:");

    // Handle menu selection
    switch (answer) {
      case "1":
        createWalletLocal();
        break;
      case "2":
        recoverWalletLocal();
        break;
      case "3":
        getBalanceLocal();
        break;
      case "4":
        sendTx();
        break;
      case "5":
        getTransactionLocal();
        break;
      case "6":
        rl.close();
        break;
      default: {
        console.log("This option is not available. Try again");
        menu();
      }
    }
  }, 1000);
}

// Function to prompt the user to press any key to continue
async function preMenu() {
  await rl.question("Press any key to continue...");
  menu();
}

// Function to create a new wallet and display its address and private key
function createWalletLocal(): void {
  const myWallet = createWallet();
  myAddress = myWallet.address;
  console.log(`Your new wallet is ${myAddress}`);
  console.log(`PK = ${myWallet.privateKey}`);
  preMenu();
}

// Function to recover a wallet using a private key or mnemonic phrase
async function recoverWalletLocal() {
  console.clear();
  const answer = await rl.question("Type your private key or secret mnemonic phrase here: ");

  const wallet = recoverWallet(answer);

  myAddress = wallet.address;

  console.log(`Your address is ${wallet.address}`);
  preMenu();
}

// Function to get and display the balance of the current wallet
async function getBalanceLocal() {
  console.clear();

  if (!myAddress) {
    console.log("You do not have a wallet yet");
    return preMenu();
  }

  const balance = await getBalance(myAddress);

  console.log(`Balance = ${balance.balanceInEth} ${SYMBOL}`);
  
  preMenu();
}

// Function to build and send a transaction
async function sendTx() {
  console.clear();

  if (!myAddress) {
    console.log("You do not have a wallet yet");
    return preMenu();
  }

  console.log(`Your wallet is ${myAddress}`);

  const answerOne: string = await rl.question("To:");

  // Validate the recipient address
  if (!isValidAddress(answerOne)) {
    console.log("Invalid address!");
    return preMenu();
  }

  const answerTwo: string = await rl.question(`Amount (${SYMBOL}):`);

  // Validate the amount
  if (!answerTwo) {
    console.log("Invalid amount!");
    return preMenu();
  }

  // Build the transaction
  const tx = await buildTransaction(answerOne, answerTwo);

  // Check if there are sufficient funds
  if (!tx) {
    console.log("Insufficient balance (amount + fee)!");
    return preMenu();
  }

  try {
    // Send the transaction and display the receipt
    const txReceipt = await sendTransaction(tx);
    console.log("Transaction is complete");
    console.log(txReceipt);
  } catch (error) {
    console.log(error);
  }

  return preMenu();
}

// Function to get and display transaction details by hash
async function getTransactionLocal() {
  console.clear();

  const answer = await rl.question("Copy and paste your transaction hash here:");

  try {
    const txReceipt = await getTransaction(answer);
    console.table(txReceipt);
  } catch (error) {
    console.log(error);
  }

  preMenu();
}

// Start the menu
menu();
