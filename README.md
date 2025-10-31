# Simple Solidity DApp (HTML/JS)

This project contains a minimal Solidity smart contract and a plain HTML/JS frontend that lets you **read** and **write** a single `uint` value on-chain via MetaMask.

## What's included
- `contracts/SimpleStorage.sol` — Solidity contract with:
  - `amount()` (auto getter) — read current value
  - `write(uint _amount)` — write new value
- `index.html` — frontend UI
- `script.js` — interaction logic using `ethers.js` (CDN)
- `style.css` — small styles
- `example-deploy.txt` — short guide to deploy with Remix

## Quick steps to run
1. Open `contracts/SimpleStorage.sol` in [Remix IDE](https://remix.ethereum.org).
2. Compile with Solidity `^0.8.0` and deploy to your chosen network (e.g., Remix VM, Goerli/Base testnet, or local Hardhat).
3. Copy the deployed contract address.
4. Open `index.html` in your browser (served via simple HTTP server or file:// may work but some browsers restrict wallet interactions from file://).
5. Paste the contract address into the **Contract address** field and click **Load contract**.
6. Connect MetaMask, then use **Read** to fetch the current amount or **Write** to send a transaction (MetaMask will ask to confirm).

## Notes
- The frontend uses `ethers.js` from a CDN.
- The contract is intentionally minimal for learning/testing.
- For production, add access controls, events, and input validation.

