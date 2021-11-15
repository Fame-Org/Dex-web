import {
  Button,
  useDisclosure,
  useTheme,
  useBreakpoint,
  IconButton,
  HStack,
  Box
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import AppNavigation from "./navigation";
import { Container, Row, Col } from "react-grid-system";
import Header from "./header";
import RoutesArea from "./routesArea";
import { } from "@chakra-ui/icons";

interface PathItem {
  label: string;
  icon?: React.ReactNode;
}

type NavigationRootPathType = PathItem & { children?: PathItem[] };
const Uunc: React.FC<{}> = ({ }) => {
  const appTheme = useTheme();
  const breakpoint = useBreakpoint();
  let [drawerOpen, updateDrawer] = React.useState(false);

  // const btnRef:React.RefObject<HTMLButtonElement> | undefined | null = React.useRef<HTMLButtonElement>()

  console.log(breakpoint);

  let containerStyle = {
    marginLeft: "320px",
    width: "calc(100% - 320px)",
  };

  if (breakpoint == "base" || breakpoint == "sm" || breakpoint == "xs" || breakpoint == "md") {
    containerStyle = { ...containerStyle, width: "100%", marginLeft: "0px" };
  }

  return (
    <div style={{background:""}}>
      <AppNavigation drawerOpen={drawerOpen} closeDrawer={() => {
        updateDrawer(false);
      }} />
      <Box
        style={{
          ...containerStyle,
        }}
      >
        <Header toggleDrawer={() => {
          updateDrawer(!drawerOpen)
        }} />

        <React.Fragment>
          <RoutesArea />
        </React.Fragment>

      </Box >
    </div>
  );
};

export default Uunc;
