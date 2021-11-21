import {
    Button,
    useDisclosure,
    useTheme,
    useBreakpoint,
    IconButton,
    HStack
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons"
import React from "react";
import AppNavigation from "./navigation"
import { Container, Row, Col } from "react-grid-system"
import {
} from "@chakra-ui/icons";
import logo from '../../logo.png';

interface PathItem {
    label: string;
    icon?: React.ReactNode;
}

type NavigationRootPathType = PathItem & { children?: PathItem[] };


export const connect = () => {
    // @ts-ignore
    AlgoSigner.connect()


};

const Uunc: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {

    const breakpoint = useBreakpoint();

    let containerStyle = {
        left: "320px",
        width: "calc(100vw - 320px)",
    }

    if (breakpoint == "base" || breakpoint == "sm" || breakpoint == "xs") {
        containerStyle = { ...containerStyle, width: "100vw", left: "0px" }
    }

    return (
        <div style={{ padding: "16px 24px", margin: 0, borderBottom: "1px solid rgba(200,200,200,.2)" }}>
            <div>
                <HStack justify="space-between" alignItems="center">
                    {breakpoint == "base" && <IconButton icon={<HamburgerIcon />} aria-label="dropdown"
                        onClick={toggleDrawer} />}

                    {breakpoint!=="base" && <img src={logo} width={40}/>}

                    <Button boxShadow="lg" onClick={() => {
                        connect();
                    }}>Connect</Button>
                </HStack>

            </div>
        </div>
    )
};

export default Uunc;
