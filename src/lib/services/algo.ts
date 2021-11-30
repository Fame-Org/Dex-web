import {defaultAssets} from "./../store/default-assets"
import axios from "axios"
import algosdk, { Address, TransactionLike, TransactionType } from "algosdk";
import MyAlgo from '@randlabs/myalgo-connect';

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


export const connect = async(address: any, to: any) => {
    // @ts-ignore
    //AlgoSigner.connect()
    const myAlgoWallet = new MyAlgo();
    await myAlgoWallet.connect({ shouldSelectOneAccount: true });

};




export const optIn = async (address: any, to: any) => {
    const myAlgoWallet = new MyAlgo();
    const r = await myAlgoWallet.connect({ shouldSelectOneAccount: true });
    let asset = defaultAssets.find((o) => o.name === to);
    let assetId = Number(asset?.id);
    const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
    const port = "";
    const token = {
      "X-API-Key": "B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab",
    };
    const client = new algosdk.Algodv2(token, baseServer, port);

    const suggestedParams = await client.getTransactionParams().do();
    
    const tx1 = new algosdk.Transaction({
        assetIndex: Number(assetId),
        from: r[0].address,
        amount: Math.round(0),
        to: r[0].address,
        type: algosdk.TransactionType.axfer,
        ...suggestedParams,
      });
      
      //const r = await myAlgoWallet.connect({ shouldSelectOneAccount: true });
      const signedTxn = await myAlgoWallet.signTransaction(tx1.toByte());


      //let signedTxn = await myAlgoWallet.signTransaction(tx1);
      console.log(signedTxn.txID);
  
      await client.sendRawTransaction(signedTxn.blob).do();
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
  