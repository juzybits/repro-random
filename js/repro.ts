import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";

const network = "devnet";
const packageId = "0xb24804b90709f53cf331e719d44b7cf8917cf24a9f5f62982034b56d550d2381";
const counterId = "0xb0eb3394b154cf14f3d64ef2b3be432070664eabf1b9c3aab0455428ef1afcb8";

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY must be set in your .env.local file");
}

const signer = Ed25519Keypair.fromSecretKey(privateKey);
const sender = signer.toSuiAddress();
const client = new SuiClient({ url: getFullnodeUrl(network) });

const tx = new Transaction();
// 1st run
// const counter = tx.moveCall({
//    target: `${packageId}::repro::new`,
//    arguments: [],
// });
// tx.transferObjects([counter], sender);
tx.moveCall({
   target: `${packageId}::repro::increase_counter`,
   arguments: [
      tx.object(counterId),
      tx.object.random(),
   ],
});

const resp = await client.signAndExecuteTransaction({
   signer,
   transaction: tx,
   options: {
      showEffects: true,
   }
});

console.log(`tx status:`, resp.effects?.status.status);
console.log(`tx digest:`, resp.digest);
