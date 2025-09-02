import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";

const network = "testnet";
const packageId = "0xdcd3295d66a59ee014aef2232ac28bdff1dadf44210665f09c06d3b50a13dc63";
const counterId = "0x2ebc6728b034ea4b675ee67e0bb08a16b438faf37a7bc4a5fb1cdba5cfa3846b";

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY must be set in your .env.local file");
}

const signer = Ed25519Keypair.fromSecretKey(privateKey);
const client = new SuiClient({ url: getFullnodeUrl(network) });
const tx = new Transaction();

// 1st run, create counter object
// const counter = tx.moveCall({
//    target: `${packageId}::repro::new`,
//    arguments: [],
// });
// tx.transferObjects([counter], signer.toSuiAddress());

// Subsequent runs, increase counter
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
