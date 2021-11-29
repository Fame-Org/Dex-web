import algosdk, { Address, TransactionLike, TransactionType } from "algosdk";
import { waitForAlgosignerConfirmation } from "../services/algo";
import { DECIMAL, SWAP_ADDRESS } from "../utils/constants";
import { defaultAssets } from "./default-assets";

const swapAsset = (
  from: any,
  to: any,
  amount: any,
  exchange: any,
  addresses: { from: any }
) => {
  let tx1: TransactionLike;
  let tx2: TransactionLike;
  let tx3: TransactionLike;
  let signedTx1 = {};
  let signedTx2 = {};
  let signedTx3 = {};
  let txGroup = [];

  let assetFrom: any = defaultAssets.find((o) => o.name === from);
  let assetTo: any = defaultAssets.find((o) => o.name === to);
  let assetIdFrom: any = Number(assetFrom?.id);
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
      let to: Address = SWAP_ADDRESS as any;

      // console.log((Number(amount) / Number(exchange)).toFixed(6) * DECIMAL, "amoint!!!");

      const amount1: any = (amount * DECIMAL).toFixed(6);
      // @ts-ignore
      const amount2 = +(Number(amount / exchange).toFixed(6) * DECIMAL);

      console.log({ amount1, amount2 });

      if (assetFrom.name === "ALGO") {
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
      } else if (assetTo.name === "ALGO") {
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
      } else if (assetFrom.name !== "ALGO" && assetTo.name !== "ALGO") {
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
      return algosdk.assignGroupID([tx1, tx2, tx3]);
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
      console.log(tx1.group, tx2.group, tx3.group);
    })
    // sign transaction 3
    // @ts-ignore
    .then(() => AlgoSigner.sign(tx3))
    .then((d: any) => (signedTx3 = d))
    // sign transaction 1
    // @ts-ignore
    .then(() => AlgoSigner.sign(tx1))
    .then((d: any) => (signedTx1 = d))
    // sign transaction 2
    // @ts-ignore
    .then(() => AlgoSigner.sign(tx2))
    .then((d: any) => (signedTx2 = d))

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
    .catch((e: any) => {
      // handleClientError(e.message);
      console.error(e.message);
    });
};

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
    const r = await AlgoSigner.accounts({
      ledger: "TestNet",
    });
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

    // Assign a Group ID to the transactions using the SDK
    algosdk.assignGroupID([tx1, tx2, tx3]);
    let binaryTxs = [tx1.toByte(), tx2.toByte(), tx3.toByte()];
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
        signers: [],
      },
      {
        txn: base64Txs[2],
      },
    ]);

    // Convert first transaction to binary from the response
    // @ts-ignore
    let signedTx1Binary = AlgoSigner.encoding.base64ToMsgpack(
      signedTxs[0].blob
    );
    let signedTx2Binary = algosdk.signLogicSigTransactionObject(tx2, lsig);
    // @ts-ignore
    let signedTx3Binary = AlgoSigner.encoding.base64ToMsgpack(
      signedTxs[2].blob
    );
    const tx = await client
      .sendRawTransaction([
        signedTx1Binary,
        signedTx2Binary.blob,
        signedTx3Binary,
      ])
      .do();
   

    return tx;
  } catch (err) {
    console.log("error happened here!!!");
    console.log({ err });
    throw err;
  }
};

export { funcSwapAsset, funcSwapAssetV2, swapAsset };
