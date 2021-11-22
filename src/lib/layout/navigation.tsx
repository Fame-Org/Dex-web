import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Divider,
  useDisclosure,
  Text,
  IconButton,
  Box,
  DrawerCloseButton,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  HStack
} from "@chakra-ui/react";
import { Visible } from "react-grid-system"
import React, { ReactSVG } from "react";
import {
  IoIosBusiness,
  IoIosFlash,
  IoIosShuffle,
  IoIosPulse,
  IoIosApps,
  IoIosSwap,
} from "react-icons/io";
import { useHistory } from 'react-router-dom'
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  QuestionIcon,
  MoonIcon,
} from "@chakra-ui/icons";

interface PathItem {
  label: string;
  icon?: React.ReactNode;
  end?: React.ReactNode;
  path: string
}

type NavigationRootPathType = PathItem & { children?: PathItem[] };
const Uunc: React.FC<{ drawerOpen: boolean, closeDrawer: () => void }> = ({ drawerOpen, closeDrawer }) => {

  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: false });
  // const btnRef:React.RefObject<HTMLButtonElement> | undefined | null = React.useRef<HTMLButtonElement>()
  // if (btnRef == null || btnRef == undefined) { return <div></div> }

  const NavigationList: NavigationRootPathType[] = [
    {
      label: "Exchange",
      icon: <IoIosSwap color="rgba(200,200,200,.5)" />,
      path: "/exchange"
    },
    {
      label: "Staking",
      icon: <IoIosApps color="rgba(200,200,200,.5)" />,
      path: ""
    },
    {
      label: "Farming",
      icon: <IoIosPulse color="rgba(200,200,200,.5)" />,
      path: "farming"
    },

    {
      label: "Create Pool",
      icon: <IoIosBusiness color="rgba(200,200,200,.5)" />,
      end: < AddIcon color="rgba(200,200,200,.5)" />,
      path: "create-pool"
    },
    {
      label: "Lab",
      icon: <IoIosFlash color="rgba(200,200,200,.5)" />,
      path: "lab"
    },
    {
      label: "Bridge",
      icon: <IoIosShuffle color="rgba(200,200,200,.5)" />,
      path: "bridge"
    },
    {
      label: "Guide",
      icon: <QuestionIcon color="rgba(200,200,200,.5)" />,
      path: "guide"
    },
  ];

  const NavPathsHere = (
    <div>
      {NavigationList.map((v) => {
        let containerStyle={
          padding: "12px 12px",
          borderRadius: 8,
          marginBottom: 12,
        }

        if (v.children != undefined) {
          let comp = (
            <Menu>
              <MenuButton as={Box} rightIcon={<ChevronDownIcon />} 
               bg="rgba(100,100,100,.1)"
              style={containerStyle}
              _hover={{ background: "rgba(100,100,100,.5)", color: "white" }} >
                 <HStack>
                 {v.icon ?? <div></div>}
                  <div>
                    {v.label}
                  </div>
                   </HStack>
              </MenuButton>
              <MenuList>
                {v.children.map((childPath)=>{
                  return <MenuItem onClick={()=>{
                    history.push(childPath.path);
                  }}>{childPath.label}</MenuItem>
                })}
              </MenuList>
            </Menu>
          );
          return comp;
        }
        return (
          <HStack
            onClick={() => {
              history.push(v.path);
            }}
            _hover={{ background: "rgba(100,100,100,.5)", color: "white" }}
            bg="rgba(100,100,100,.1)"
            style={containerStyle}
          >
             {v.icon ?? <div></div>}
              <Text
                style={{ flex: 1}}
                fontWeight="bold"
                color="rgba(230,230,230,.7)"
              >
                {v.label}
              </Text>
          </HStack>
        );
      })}
    </div>
  )


  const DesktopDContent = (
    <Box w="320px"
      h="100vh"
      borderRight="1px solid rgba(200,200,200,.2)"
      pos="fixed"
      left="0"
      display="flex"
      flexDirection="column"
      top="0">
      <Box p="16px 24px">
        <Heading fontSize="2xl"></Heading>
      </Box>

      <Box flex="1" p="16px 24px">
        {NavPathsHere}
      </Box>
      <Box p="16px 24px" display="flex" alignItems="center">
        <Divider style={{ flex: 1, marginRight: 12 }} />
        {/* <IconButton aria-label="icon">
          <MoonIcon />
        </IconButton> */}
      </Box>
    </Box>
  )


  return (
    <>
      <Visible lg xl xxl>
        {DesktopDContent}
      </Visible>

      <Visible xs sm md >
        <Drawer
          isOpen={drawerOpen}
          placement="left"
          onClose={onClose}
          variant=""
          
          autoFocus={false}
          size="xs"
        // finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg="#110A21">
            <DrawerCloseButton onClick={() => {
              closeDrawer();
            }} />
            <DrawerHeader>JaySources</DrawerHeader>

            <DrawerBody>
              {NavPathsHere}
            </DrawerBody>

            <DrawerFooter>
              <Divider style={{ flex: 1, marginRight: 12 }} />
              {/* <IconButton aria-label="icon">
                <MoonIcon />
              </IconButton> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Visible>
    </>
  );
};

export default Uunc;
