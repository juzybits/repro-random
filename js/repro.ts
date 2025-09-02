import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

  const privateKey = "";
  const network = "devnet";

  const signer = Ed25519Keypair.fromSecretKey(privateKey);
  const sender = signer.toSuiAddress();
  const client = new SuiClient({ url: getFullnodeUrl(network) });
