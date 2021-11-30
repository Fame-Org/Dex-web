import { Button, useBreakpoint, IconButton, HStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import

import {} from "@chakra-ui/icons";
import logo from "../../logo.png";
import { truncateAddress } from "../utils/helper";
import MyAlgo from "@randlabs/myalgo-connect";
// CSS Imports
import "react-confirm-alert/src/react-confirm-alert.css";

interface PathItem {
  label: string;
  icon?: React.ReactNode;
}

type NavigationRootPathType = PathItem & { children?: PathItem[] };

export const connect = async () => {
  // @ts-ignore
  const myAlgoWallet = new MyAlgo();
  await myAlgoWallet.connect({ shouldSelectOneAccount: true });
  //AlgoSigner.connect();
};

const Uunc: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const [address, setAddress] = useState(null);

  const connect = async () => {
    // @ts-ignore
    //await AlgoSigner?.connect();
    const myAlgoWallet = new MyAlgo();
    const r = await myAlgoWallet.connect({ shouldSelectOneAccount: true });
    // @ts-ignore
    // const r = await AlgoSigner?.accounts({
    //   ledger: "TestNet",
    // });

    console.log(r[0].address);

    const _address = r[0].address;
    // @ts-ignore
    setAddress(_address);
  };

  const disconnect = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to disconnect your wallet?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            disconnectWallet();
          },
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  const disconnectWallet = () => {
    localStorage.clear();
    setAddress(null);
  };

  // useEffect(() => {
  //   try {
  //     connect();
  //   } catch (err) {
  //     console.log("error happened here!!!");
  //     console.log({ err });

  //     throw err;
  //   }
  // }, []);

  const breakpoint = useBreakpoint();

  let containerStyle = {
    left: "320px",
    width: "calc(100vw - 320px)",
  };

  if (breakpoint == "base" || breakpoint == "sm" || breakpoint == "xs") {
    containerStyle = { ...containerStyle, width: "100vw", left: "0px" };
  }

  return (
    <div
      style={{
        padding: "16px 24px",
        margin: 0,
        borderBottom: "1px solid rgba(200,200,200,.2)",
      }}
    >
      <div>
        <HStack justify="space-between" alignItems="center">
          {breakpoint == "base" && (
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="dropdown"
              onClick={toggleDrawer}
            />
          )}

          {breakpoint !== "base" && (
            <>
              <img src={logo} width={40} />
              <h1>JaySources</h1>
            </>
          )}

          {address ? (
            <Button style={{ backgroundColor: "00ADED" }} onClick={disconnect}>
              {truncateAddress(address)}
            </Button>
          ) : (
            <Button
              onClick={() => {
                connect();
              }}
            >
              Connect
            </Button>
          )}
        </HStack>
      </div>
    </div>
  );
};

export default Uunc;
