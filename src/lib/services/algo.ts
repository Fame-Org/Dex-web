import {defaultAssets} from "./../store/default-assets"
import axios from "axios"

export const fetchAssets = async (account: any) => {
    try {
      let assetsData: any[] = [];
      

      // @ts-ignore
      const accountData = await AlgoSigner.algod({
        ledger: "TestNet",
        path: `/v2/accounts/${account}`,
      });

      console.log(accountData)
    //   await accountData.assets.reduce(
    //     (promise, asset) =>
    //       promise.then(() =>
    //         AlgoSigner.indexer({
    //           ledger: "TestNet",
    //           path: `/v2/assets/${asset["asset-id"]}`,
    //         }).then((d) => assetsData.push(d))
    //       ),
    //     Promise.resolve()
    //   );

      return assetsData;
    } catch (e) {
      
    }
  };


export const connect = (address: any, to: any) => {
    // @ts-ignore
    AlgoSigner.connect()

};




export const optIn = async (address: any, to: any) => {

    let asset = defaultAssets.find((o) => o.name === to);
    let assetId = Number(asset?.id);

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
      // sign new opt-in transaction
      // @ts-ignore
      .then((txParams) =>
        // @ts-ignore
        AlgoSigner.sign({
          assetIndex: assetId,
          from: address,
          amount: 0,
          to: address,
          type: "axfer", // ASA Transfer (axfer)
          fee: txParams["min-fee"],
          firstRound: txParams["last-round"],
          lastRound: txParams["last-round"] + 1000,
          genesisID: txParams["genesis-id"],
          genesisHash: txParams["genesis-hash"],
          flatFee: true,
        })
      )
      // send signed transaction
      .then((signedTx: any) =>
        // @ts-ignore
        AlgoSigner.send({
          ledger: "TestNet",
          tx: signedTx.blob,
        })
      )
      // wait for confirmation from the blockchain
      .then((tx: any) => waitForAlgosignerConfirmation(tx)) // see algosignerutils.js
      .then((d: any) => {
          let transaction_id= "https://testnet.algoexplorer.io/tx/"+d["txId"];
          console.log(transaction_id)
        // was successful
        console.log({ d });
        return
        
      })
      .catch((e: any) => {
        // handleClientError(e.message);
        console.error("error", e.message);
      });
};


export const fetchRate = async (from: any, to: any ) => {
    console.log(`https://tinymanapi.herokuapp.com/assets?pair=${from}${to}`);
    const result = await axios.get(
      `https://tinymanapi.herokuapp.com/assets?pair=${from}${to}`
    );
    const { data } = result;
    if (!data) {
      console.log("no data");
      return null;
    }
    // console.log({ data });
    const res = `${from}per${to}`;
    // console.log(data[0]?.res);

    const response = data[0];
    console.log(response[res]);

    if (response[res]) {
      return response[res];
    }
    return undefined;
  };

export async function waitForAlgosignerConfirmation(tx: any) {
    console.log(`Transaction ${tx.txId} waiting for confirmation...`);
    // @ts-ignore
    let status = await window.AlgoSigner.algod({
      ledger: "TestNet",
      path: "/v2/transactions/pending/" + tx.txId,
    });
  
    while (true) {
      if (status["confirmed-round"] !== null && status["confirmed-round"] > 0) {
        //Got the completed Transaction
        console.log(
          `Transaction confirmed in round ${status["confirmed-round"]}.`
        );
        break;
      }
      // @ts-ignore
      status = await AlgoSigner.algod({
        ledger: "TestNet",
        path: "/v2/transactions/pending/" + tx.txId,
      });
    }
  
    return tx;
  }
  