// Minimal frontend using ethers v5
const abi = [
  {
    "inputs": [],
    "name": "amount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "write",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const contractAddressInput = document.getElementById('contractAddress');
const loadContractBtn = document.getElementById('loadContract');
const readBtn = document.getElementById('readBtn');
const writeBtn = document.getElementById('writeBtn');
const currentAmountSpan = document.getElementById('currentAmount');
const newAmountInput = document.getElementById('newAmount');
const txStatus = document.getElementById('txStatus');

async function ensureProvider() {
  if (!window.ethereum) {
    alert('MetaMask (or another Ethereum provider) is required.');
    throw new Error('No window.ethereum');
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
}

connectWalletBtn.addEventListener('click', async () => {
  try {
    await ensureProvider();
    await provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    walletInfo.innerText = 'Connected: ' + address;
    connectWalletBtn.disabled = true;
    if (contract) {
      writeBtn.disabled = false;
      readBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    alert('Could not connect wallet: ' + (err.message || err));
  }
});

loadContractBtn.addEventListener('click', async () => {
  const addr = contractAddressInput.value.trim();
  if (!ethers.utils.isAddress(addr)) {
    alert('Please enter a valid contract address.');
    return;
  }
  try {
    await ensureProvider();
    signer = provider.getSigner();
    contract = new ethers.Contract(addr, abi, signer);
    txStatus.innerText = 'Contract loaded: ' + addr;
    readBtn.disabled = false;
    writeBtn.disabled = false;
  } catch (err) {
    console.error(err);
    alert('Failed to load contract: ' + (err.message || err));
  }
});

readBtn.addEventListener('click', async () => {
  if (!contract) return alert('Load the contract first.');
  try {
    const value = await contract.amount();
    currentAmountSpan.innerText = value.toString();
  } catch (err) {
    console.error(err);
    alert('Read failed: ' + (err.message || err));
  }
});

writeBtn.addEventListener('click', async () => {
  if (!contract) return alert('Load the contract first.');
  const v = newAmountInput.value;
  if (v === '') return alert('Enter a number.');
  try {
    const tx = await contract.write(ethers.BigNumber.from(v));
    txStatus.innerText = 'Transaction sent. Waiting for confirmation... (tx: ' + tx.hash + ')';
    await tx.wait();
    txStatus.innerText = 'Transaction confirmed: ' + tx.hash;
    const value = await contract.amount();
    currentAmountSpan.innerText = value.toString();
  } catch (err) {
    console.error(err);
    alert('Write failed: ' + (err.message || err));
  }
});
