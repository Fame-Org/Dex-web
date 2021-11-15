import algosdk, { Address, TransactionLike, TransactionType } from "algosdk";
import { waitForAlgosignerConfirmation } from "../services/algo";
import { DECIMAL, SWAP_ADDRESS } from "../utils/constants";
import {defaultAssets} from "./default-assets"

export const funcSwapAsset = (from: any, to: any,amount: any, exchange: any,  addresses: {from:any}) => {

    let tx1: TransactionLike;
    let tx2 : TransactionLike;
    let tx3 : TransactionLike;
    let signedTx1 = {};
    let signedTx2 = {};
    let signedTx3 = {};
    let txGroup = [];

    let assetFrom: any = defaultAssets.find((o) => o.name === from);
    let assetTo: any = defaultAssets.find((o) => o.name === to);
    let assetIdFrom : any= Number(assetFrom?.id);
    let assetIdTo: any = Number(assetTo?.id);
    let amt = 3000;

    // @ts-ignore
    AlgoSigner.connect()
      // fetch current parameters
      .then(() =>
      // @ts-ignore
        AlgoSigner.algod({
          ledger: "TestNet",
          path: "/v2/transactions/params",
        })
      )
      // create transactions
      .then((txParams: any) => {
        let from: Address = addresses.from;
        let to: Address  = SWAP_ADDRESS as any;
        
        // console.log((Number(amount) / Number(exchange)).toFixed(6) * DECIMAL, "amoint!!!");
        
        const amount1: any = (amount * DECIMAL).toFixed(6);
        // @ts-ignore
        const amount2 = +((Number(amount) / Number(exchange)).toFixed(6) * DECIMAL);
        
        console.log({ amount1, amount2 });

        if(assetFrom.name === "ALGO"){
          // @ts-ignore
          tx1 = {
          from: from,
          to: to,
          amount: Math.round(amount1),
          type: TransactionType.pay, // Payment (pay)
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true
        };

        // @ts-ignore
        tx2 = {
          assetIndex: Number(assetIdTo),
          from: to,
          amount: Math.round(amount2),
          to: from,
          type: TransactionType.axfer,
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };

        // @ts-ignore
        tx3 = {
          from: from,
          to: to,
          amount: 2000,
          type: TransactionType.pay, // Payment (pay)
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };
        }
        
        else if(assetTo.name === "ALGO"){
            // @ts-ignore
          tx2 = {          
          from: to,
          amount: Math.round(amount2),
          to: from,
          type: TransactionType.pay,
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };
        // @ts-ignore
        tx1 = {
          assetIndex: Number(assetIdFrom),
          from: from,
          to: to,
          amount: Math.round(amount1),
          type: TransactionType.axfer, // Payment (pay)
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };
        // @ts-ignore
        tx3 = {
          from: from,
          to: to,
          amount: 2000,
          type: TransactionType.pay, // Payment (pay)
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };
        }
        else if (assetFrom.name !== "ALGO" && assetTo.name !== "ALGO"){
          // @ts-ignore
          tx1 = {
          assetIndex: Number(assetIdFrom),
          from: from,
          amount: Math.round(amount1),
          to: to,
          type: TransactionType.axfer,
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };
        // @ts-ignore
        tx2 = {
          assetIndex: Number(assetIdTo),
          from: to,
          amount: Math.round(amount2),
          to: from,
          type: TransactionType.axfer,
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };
        // @ts-ignore
        tx3 = {
          from: from,
          to: to,
          amount: 2000,
          type: TransactionType.pay, // Payment (pay)
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        };

        }
        

        // assigns a group id to the transaction set
        console.log("reached s");
        console.log(tx1);
        console.log(tx2);
        console.log(tx3);
        return algosdk.assignGroupID([tx1, tx2,tx3]);
      })
      .then((txGroup: any) => {
        console.log("entered!!!");
        let sdkTxs = [tx1, tx2, tx3];
        // Use the AlgoSigner encoding library to make the transactions base64
        // let base64Txs = sdkTxs.map((tx) => {
        //     return AlgoSigner.encoding.msgpackToBase64(tx.toByte());
        // });
        // Modify the group fields in original transactions to be base64 encoded strings
        // @ts-ignore
        tx1.group = txGroup[0].group.toString("base64");
        // @ts-ignore
        tx2.group = txGroup[1].group.toString("base64");
        // @ts-ignore
        tx3.group = txGroup[2].group.toString("base64");

        // @ts-ignore
        console.log(tx1.group, tx2.group,tx3.group);
      })
      // sign transaction 3
      // @ts-ignore
      .then(() => AlgoSigner.sign(tx3))
      .then((d:any) => (signedTx3 = d))
      // sign transaction 1
      // @ts-ignore
      .then(() => AlgoSigner.sign(tx1))
      .then((d:any) => (signedTx1 = d))
      // sign transaction 2
      // @ts-ignore
      .then(() => AlgoSigner.sign(tx2))
      .then((d:any) => (signedTx2 = d))
      
      
      .then(() => {
        // Get the decoded binary Uint8Array values from the blobs
        
        const decoded_1 = new Uint8Array(
          // @ts-ignore  
          atob(signedTx1.blob)
            .split("")
            .map((x) => x.charCodeAt(0))
        );
        const decoded_2 = new Uint8Array(
          // @ts-ignore  
          atob(signedTx2.blob)
            .split("")
            .map((x) => x.charCodeAt(0))
        );
        const decoded_3 = new Uint8Array(
          // @ts-ignore
          atob(signedTx3.blob)
            .split("")
            .map((x) => x.charCodeAt(0))
        );

        console.log("reached k");
        // Use their combined length to create a 3rd array
        let combined_decoded_txns = new Uint16Array(
          decoded_1.byteLength + decoded_2.byteLength + decoded_3.byteLength
        );
        console.log(decoded_1);
        console.log(decoded_2);
        console.log(decoded_3);
        // Starting at the 0 position, fill in the binary for the first object
        combined_decoded_txns.set(new Uint8Array(decoded_1), 0);
        // Starting at the first object byte length, fill in the 2nd binary value
        combined_decoded_txns.set(
          new Uint8Array(decoded_2),
          decoded_1.byteLength
        );
        combined_decoded_txns.set(
          new Uint8Array(decoded_3),
          decoded_1.byteLength + decoded_2.byteLength
        );

        // Modify our combined array values back to an encoded 64bit string
        const grouped_txns = btoa(
          // @ts-ignore  
          String.fromCharCode.apply(null, combined_decoded_txns)
        );

        // @ts-ignore
        return AlgoSigner.send({
          ledger: "TestNet",
          tx: grouped_txns,
        });
      })
      // wait for confirmation from the blockchain
      // @ts-ignore
      .then((tx) => waitForAlgosignerConfirmation(tx)) // see algosignerutils.js
      // @ts-ignore
      .then((tx) => {
        console.log("success , ", { tx });
        // was successful
      })
      .catch((e:any) => {
        // handleClientError(e.message);
        console.error(e.message);
      });
  };