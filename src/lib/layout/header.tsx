import { Button, useBreakpoint, IconButton, HStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import AppNavigation from "./navigation";
import { Container, Row, Col } from "react-grid-system";
import {} from "@chakra-ui/icons";
import logo from "../../logo.png";
import { truncateAddress } from "../utils/helper";

interface PathItem {
  label: string;
  icon?: React.ReactNode;
}

type NavigationRootPathType = PathItem & { children?: PathItem[] };

export const connect = () => {
  // @ts-ignore
  AlgoSigner.connect();
};

const Uunc: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const [address, setAddress] = useState(null);

  const connect = async () => {
    // @ts-ignore
    await AlgoSigner?.connect();
    // @ts-ignore
    const r = await AlgoSigner?.accounts({
      ledger: "TestNet",
    });

    console.log({ r });

    const _address = r[0].address;
    setAddress(_address);
  };

  useEffect(() => {
    connect();
  }, []);

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

          {breakpoint !== "base" && <img src={logo} width={40} />}

          {address ? (
            <Button disabled>{truncateAddress(address)}</Button>
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
