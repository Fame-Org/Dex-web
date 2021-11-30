import algosdk, { Address, TransactionLike, TransactionType } from "algosdk";
import { waitForAlgosignerConfirmation } from "../services/algo";
import { DECIMAL, SWAP_ADDRESS } from "../utils/constants";
import { defaultAssets } from "./default-assets";
import MyAlgo from '@randlabs/myalgo-connect';


const funcSwapAsset = async (
  from: any,
  to: any,
  amount: any,
  exchange: any,
  addresses: { from: any }
) => {
  const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
  const port = "";
  const token = {
    "X-API-Key": "B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab",
  };
  const client = new algosdk.Algodv2(token, baseServer, port);
  // get suggested parameters
  const suggestedParams = await client.getTransactionParams().do();

  let tx1 = {};
  let tx2 = {};
  let tx3 = {};
  let tx4 = {};
  let signedTx1 = {};
  let signedTx2 = {};
  let signedTx3 = {};
  let signedTx4 = {};
  let txGroup = [];
  //let to = SWAP_ADDRESS;

  let assetFrom = defaultAssets.find((o) => o.name === from);
  let assetTo = defaultAssets.find((o) => o.name === to);

  // @ts-ignore
  let assetIdFrom = Number(assetFrom.id ?? "");
  // @ts-ignore
  let assetIdTo = Number(assetTo.id ?? "");
  let amt = 3000;

  // @ts-ignore
  console.log(assetFrom.name);

  // @ts-ignore
  const r = await AlgoSigner.accounts({
    ledger: "TestNet",
  });
  const _address = r[0].address;
  // @ts-ignore

  const amount1 = (amount * DECIMAL).toFixed(6);
  // @ts-ignore
  const amount2 = +((Number(amount) / Number(exchange)).toFixed(6) * DECIMAL);
  const a = "c3dhcA==";
  const b = "Zmk=";
  // @ts-ignore
  const byt_combined = new Uint8Array([a, b]);
  console.log({ amount1, amount2 });
  const froms = "K52ACPMRUMEAED4PQ5UFFBVL6P3FU7DCSC4YX5RRPRLE75FYGPSGFNW24A";
  //let to = SWAP_ADDRESS;
  console.log("checking ID");
  console.log({ assetIdTo });
  console.log({ assetIdFrom });

  console.log(_address);
  // @ts-ignore
  if (assetFrom.name === "ALGO") {
    tx1 = new algosdk.Transaction({
      from: _address,
      to: SWAP_ADDRESS,
      // @ts-ignore
      amount: Math.round(amount1),
      // @ts-ignore
      type: "pay", // Payment (pay)
      suggestedParams,
    });

    tx2 = new algosdk.Transaction({
      assetIndex: Number(assetIdTo),
      from: SWAP_ADDRESS,
      amount: Math.round(amount2),
      to: _address,
      // @ts-ignore
      type: "axfer",
      suggestedParams,
    });
    tx3 = new algosdk.Transaction({
      from: _address,
      to: SWAP_ADDRESS,
      amount: 2000,
      // @ts-ignore
      type: "pay", // Payment (pay)
      suggestedParams,
    });
  }
  // @ts-ignore
  else if (assetTo.name === "ALGO") {
    tx1 = new algosdk.Transaction({
      assetIndex: Number(assetIdFrom),
      from: _address,
      to: SWAP_ADDRESS,
      // @ts-ignore
      amount: Math.round(amount1),
      // @ts-ignore
      type: "axfer", // Payment (pay)
      suggestedParams,
    });

    tx2 = new algosdk.Transaction({
      from: SWAP_ADDRESS,
      amount: Math.round(amount2),
      to: _address,
      // @ts-ignore
      type: "pay",
      suggestedParams,
    });

    tx3 = new algosdk.Transaction({
      from: _address,
      to: SWAP_ADDRESS,
      amount: 2000,
      // @ts-ignore
      type: "pay", // Payment (pay)
      suggestedParams,
    });
  }
  // @ts-ignore
  else if (assetFrom.name !== "ALGO" && assetTo.name !== "ALGO") {
    tx1 = new algosdk.Transaction({
      assetIndex: Number(assetIdFrom),
      from: _address,
      // @ts-ignore
      amount: Math.round(amount1),
      to: SWAP_ADDRESS,
      // @ts-ignore
      type: "pay",
      suggestedParams,
    });

    tx2 = new algosdk.Transaction({
      assetIndex: Number(assetIdTo),
      from: SWAP_ADDRESS,
      amount: Math.round(amount2),
      to: _address,
      // @ts-ignore
      type: "axfer",
      suggestedParams,
    });

    tx3 = new algosdk.Transaction({
      from: _address,
      to: SWAP_ADDRESS,
      amount: 2000,
      // @ts-ignore
      type: "pay", // Payment (pay)
      suggestedParams,
    });
  }
  console.log(tx1);
  console.log(tx2);
  console.log(tx3);
  // Assign a Group ID to the transactions using the SDK
  // @ts-ignore
  algosdk.assignGroupID([tx1, tx2, tx3]);
  // @ts-ignore
  let binaryTxs = [tx1.toByte(), tx2.toByte(), tx3.toByte()];
  // @ts-ignore
  let base64Txs = binaryTxs.map((binary) =>
    // @ts-ignore
    AlgoSigner.encoding.msgpackToBase64(binary)
  );
  // @ts-ignore
  let signedTxs = await AlgoSigner.signTxn([
    {
      txn: base64Txs[0],
    },
    {
      txn: base64Txs[1],
    },
    {
      txn: base64Txs[2],
    },
  ]);
  // Convert first transaction to binary from the response
  // @ts-ignore
  let signedTx1Binary = AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
  // @ts-ignore
  let signedTx2Binary = AlgoSigner.encoding.base64ToMsgpack(signedTxs[1].blob);
  // @ts-ignore
  let signedTx3Binary = AlgoSigner.encoding.base64ToMsgpack(signedTxs[2].blob);

  // Merge transaction binaries into a single Uint8Array
  let combinedBinaryTxns = new Uint8Array(
    signedTx1Binary.byteLength +
      signedTx2Binary.byteLength +
      signedTx3Binary.byteLength
  );
  combinedBinaryTxns.set(signedTx1Binary, 0);
  combinedBinaryTxns.set(signedTx2Binary, signedTx1Binary.byteLength);
  combinedBinaryTxns.set(
    signedTx3Binary,
    signedTx1Binary.byteLength + signedTx2Binary.byteLength
  );
  // Convert the combined array values back to base64
  // @ts-ignore
  let combinedBase64Txns =
    // @ts-ignore
    AlgoSigner.encoding.msgpackToBase64(combinedBinaryTxns);

  // @ts-ignore
  await AlgoSigner.send({
    ledger: "TestNet",
    tx: combinedBase64Txns,
  }).then((tx: any) => {});

  // // wait for confirmation from the blockchain
  // .then((tx) => waitForAlgosignerConfirmation(tx)) // see algosignerutils.js
  // .then((tx) => {
  //   console.log("success , ", { tx });
  //   // was successful
  //   document.getElementById("successMessage").innerHTML =
  //     "The transaction with TxID " +
  //     tx.txId +
  //     " was successfully sent. <a target=&quot;_blank&quot; href='https://testnet.algoexplorer.io/tx/" +
  //     tx.txId +
  //     "'>View on AlgoExplorer</a>";
  //   document.getElementById("errorDialog").classList.add("is-hidden");
  //   document.getElementById("successDialog").classList.remove("is-hidden");
  //   hideProcessingModal();
  // })
  // .catch((e) => {
  //   // handleClientError(e.message);
  //   console.error(e.message);
  //   hideProcessingModal();
  // });
};

const funcSwapAssetV2 = async (
  from: any,
  to: any,
  amount: number,
  exchange: number,
  addresses: { from: any }
) => {
  try {
    const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
    const port = "";
    const token = {
      "X-API-Key": "B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab",
    };
    const client = new algosdk.Algodv2(token, baseServer, port);
    // get suggested parameters
    const suggestedParams = await client.getTransactionParams().do();

    const program = "int 1111";
    const compiledProgram = await client.compile(program).do();
    const programBytes = new Uint8Array(
      Buffer.from(compiledProgram.result, "base64")
    );
    // Initialize arguments array
    const args = [];
    // Integer parameter
    args.push(algosdk.encodeUint64(123));

    // create a logic signature
    const lsig = algosdk.makeLogicSig(programBytes, args);
    const lsigaddr = lsig.address();
    let tx1: algosdk.Transaction;
    let tx2: algosdk.Transaction;
    let tx3: algosdk.Transaction;

    let assetFrom = defaultAssets.find((o) => o.name === from);
    let assetTo = defaultAssets.find((o) => o.name === to);
    let assetIdFrom = Number(assetFrom?.id || "");
    let assetIdTo = Number(assetTo?.id || "");
    // @ts-ignore
    // const r = await AlgoSigner.accounts({
    //   ledger: "TestNet",
    // });
    const myAlgoWallet = new MyAlgo();
    const r = await myAlgoWallet.connect({ shouldSelectOneAccount: true });
    const _address = r[0].address;
    const amount1 = Number((amount * DECIMAL).toFixed(6));
    const amount2 = +(amount / exchange).toFixed(6) * DECIMAL;

    if (assetFrom?.name === "ALGO") {
      tx1 = new algosdk.Transaction({
        from: _address,
        to: lsigaddr,
        amount: Math.round(amount1),
        type: algosdk.TransactionType.pay, // Payment (pay)
        ...suggestedParams,
      });

      tx2 = new algosdk.Transaction({
        assetIndex: Number(assetIdTo),
        from: lsigaddr,
        amount: Math.round(amount2),
        to: _address,
        type: algosdk.TransactionType.axfer,
        ...suggestedParams,
      });
      tx3 = new algosdk.Transaction({
        from: _address,
        to: lsigaddr,
        amount: 2000,
        type: algosdk.TransactionType.pay, // Payment (pay)
        ...suggestedParams,
      });
    } else if (assetTo?.name === "ALGO") {
      tx1 = new algosdk.Transaction({
        assetIndex: Number(assetIdFrom),
        from: _address,
        to: lsigaddr,
        amount: Math.round(amount1),
        type: algosdk.TransactionType.axfer, // Payment (pay)
        ...suggestedParams,
      });

      tx2 = new algosdk.Transaction({
        from: lsigaddr,
        amount: Math.round(amount2),
        to: _address,
        type: algosdk.TransactionType.pay,
        ...suggestedParams,
      });

      tx3 = new algosdk.Transaction({
        from: _address,
        to: lsigaddr,
        amount: 2000,
        type: algosdk.TransactionType.pay, // Payment (pay)
        ...suggestedParams,
      });
    } else if (assetFrom?.name !== "ALGO" && assetTo?.name !== "ALGO") {
      tx1 = new algosdk.Transaction({
        assetIndex: Number(assetIdFrom),
        from: _address,
        amount: Math.round(amount1),
        to: lsigaddr,
        type: algosdk.TransactionType.axfer,
        ...suggestedParams,
      });

      tx2 = new algosdk.Transaction({
        assetIndex: Number(assetIdTo),
        from: lsigaddr,
        amount: Math.round(amount2),
        to: _address,
        type: algosdk.TransactionType.axfer,
        ...suggestedParams,
      });

      tx3 = new algosdk.Transaction({
        from: _address,
        to: lsigaddr,
        amount: 2000,
        type: algosdk.TransactionType.pay, // Payment (pay)
        ...suggestedParams,
      });
    } else {
      // TODO returna valuable error message
      console.log("failed to send transaction");
      return;
    }
    const txnsToGroup = [ tx1, tx2, tx3];
    algosdk.assignGroupID(txnsToGroup) 
    //const myAlgoWallet = new MyAlgo();
    const signedTxn1 = await myAlgoWallet.signTransaction([
                tx1.toByte(),
                tx3.toByte(),
            ])
    //const signedTxn2 = await myAlgoWallet.signLogicSig(lsig.logic, lsigaddr)
    const signedTxn = algosdk.signLogicSigTransaction(tx2, lsig);
    const tx = await client.sendRawTransaction([signedTxn1[0].blob, signedTxn.blob, signedTxn1[1].blob]).do();
    //AlgoSigner
    // Assign a Group ID to the transactions using the SDK
    //algosdk.assignGroupID([tx1, tx2, tx3]);
    //let binaryTxs = [tx1.toByte(), tx2.toByte(), tx3.toByte()];
    // let base64Txs = binaryTxs.map((binary) =>
    //   // @ts-ignore
    //   AlgoSigner.encoding.msgpackToBase64(binary)
    // );
    // @ts-ignore
    // let signedTxs = await AlgoSigner.signTxn([
    //   {
    //     txn: base64Txs[0],
    //   },
    //   {
    //     txn: base64Txs[1],
    //     signers: [],
    //   },
    //   {
    //     txn: base64Txs[2],
    //   },
    // ]);

    // Convert first transaction to binary from the response
    // @ts-ignore
    // let signedTx1Binary = AlgoSigner.encoding.base64ToMsgpack(
    //   signedTxs[0].blob
    // );
    // let signedTx2Binary = algosdk.signLogicSigTransactionObject(tx2, lsig);
    // // @ts-ignore
    // let signedTx3Binary = AlgoSigner.encoding.base64ToMsgpack(
    //   signedTxs[2].blob
    // );
    // const tx = await client
    //   .sendRawTransaction([
    //     signedTx1Binary,
    //     signedTx2Binary.blob,
    //     signedTx3Binary,
    //   ])
    //   .do();
   

    return tx;
  } catch (err) {
    console.log("error happened here!!!");
    console.log({ err });
    throw err;
  }
};

export { funcSwapAsset, funcSwapAssetV2 };
