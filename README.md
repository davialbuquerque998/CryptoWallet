 # CryptoWallet 🚀

The main goal of this project is to create a crypto wallet to interact with EVM-compatible Blockchains using the command line. This project serves educational purposes and aims to help developers understand the basics of wallet operations, transactions, and blockchain interactions using Node.js, TypeScript, and ethers.js.

## Features 🌟
- Create a new random wallet
- Recover a wallet using a private key or mnemonic phrase
- Check wallet balance
- Send transactions
- Retrieve transaction details

## Prerequisites 📋
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Getting Started 🏁

### Clone the repository 🐙
```bash
git clone https://github.com/davialbuquerque998/CryptoWallet.git
cd cryptowallet
```

### Install dependencies 📦
```bash
npm install
```

### Set up environment variables 🔧
Create a .env file in the root of the project and add your blockchain node URL and cryptocurrency symbol:

```.env
BLOCKCHAIN_NODE=YOUR_BLOCKCHAIN_NODE_URL
SYMBOL= THE SYMBOL OF THE NATIVE TOKEN OF YOUR BLOCKCHAIN (ETH, BNB, MATIC...)B
```

### Running the application ▶️
For development mode with hot-reloading:
```bash
npm run dev
```
To compile TypeScript and run the compiled JavaScript:
```bash
npm run compile
npm start
```
### Usage 📖
Upon running the application, you will be presented with a menu to perform various wallet operations:

1. Create Wallet: Generate a new random wallet.
2. Recover Wallet: Recover a wallet using a private key or mnemonic phrase.
3. Check Balance: Display the balance of the current wallet.
4. Send Transaction: Send cryptocurrency to another address.
5. Search Transaction: Retrieve transaction details using the transaction hash.
6. Exit: Exit the application.
