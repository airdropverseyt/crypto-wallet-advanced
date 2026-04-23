let wallet;
let provider;

async function createWallet() {
  wallet = ethers.Wallet.createRandom();

  document.getElementById("wallet").innerHTML = `
    <p><b>Address:</b> ${wallet.address}</p>
    <p><b>Private Key:</b> ${wallet.privateKey}</p>
  `;

  // Connect to testnet (Sepolia)
  provider = new ethers.JsonRpcProvider(
    "https://rpc.sepolia.org"
  );

  wallet = wallet.connect(provider);

  getBalance();
}

async function getBalance() {
  const balance = await provider.getBalance(wallet.address);
  document.getElementById("wallet").innerHTML += `
    <p><b>Balance:</b> ${ethers.formatEther(balance)} ETH</p>
  `;
}

async function sendETH() {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  try {
    const tx = await wallet.sendTransaction({
      to: to,
      value: ethers.parseEther(amount)
    });

    document.getElementById("status").innerText =
      "Transaction sent: " + tx.hash;

  } catch (err) {
    document.getElementById("status").innerText =
      "Error: " + err.message;
  }
}
