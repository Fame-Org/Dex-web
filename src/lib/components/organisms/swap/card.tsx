import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Text,
  Input,
  Grid,
  Spacer,

  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  IconButton, GridItem,
} from "@chakra-ui/react";
import MyAlgo from "@randlabs/myalgo-connect";
import React, { useCallback } from "react";
import { IoArrowDownSharp } from "react-icons/io5";
import { fetchAssets, fetchRate, optIn } from "../../../services/algo";
import { defaultAssets } from "../../../store/default-assets";
import { funcSwapAssetV2 } from "../../../store/swap-function";
import ClipLoader from "react-spinners/ClipLoader";
import { CheckCircle } from "react-feather";

export const SwapCard: React.FC<{}> = () => {
  let toast = useToast();
  const [assets, setAssets] = React.useState<any[]>([]);
  let [account, setAccount] = React.useState<string | null>(null);
  let [amount, setAmount] = React.useState<number>(0);
  const [from, setfrom] = React.useState<string | null>(null);
  const [to, setto] = React.useState<string | null>(null);
  const [exchange, setexchange] = React.useState<number>(0);
  const [loading, setloading] = React.useState<boolean>(false);
  const [optinLoading, setOptinLoading] = React.useState<boolean>(false);

  const GetAccounts = useCallback(async () => {
    try {
      // @ts-ignore
      // const r = await AlgoSigner.accounts({
      //   ledger: "TestNet",
      // });
      const myAlgoWallet = new MyAlgo();
      const r = await myAlgoWallet.connect({ shouldSelectOneAccount: true });

      console.log(r);

      const _address = r[0].address;
      setAccount(_address);

      // fetch assets for this address
      const assets = await fetchAssets(r[0].address);

      setAssets(assets ?? []);
      return;
      // return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return;
      // return JSON.stringify(e, null, 2);
    }
  }, []);

  const ConnectAlgoSigner = useCallback(async () => {
    try {
      toast({
        title: "Notice",
        description: "Connecting MyAlgo wallet",
        duration: 2000,
      });
      // @ts-ignore
      const myAlgoWallet = new MyAlgo();
      const r = await myAlgoWallet.connect({ shouldSelectOneAccount: true });
      //const r = await AlgoSigner.connect();
      console.log("conected");
      GetAccounts();
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      console.log(`Couldn't find MyAlgo wallet!`);
      // toast({
      //   title: "Notice",
      //   description: "Couldn't find MyAlgo wallet!",
      //   duration: 2000,
      // });
      console.log("failed to connect ");
      return JSON.stringify(e, null, 2);
    }
  }, []);

  const swapAssets = async () => {
    try {
      setloading(true);
      const tx = await funcSwapAssetV2(from, to, amount, exchange, {
        from: account,
      });
      setloading(false);
      toast({
        title: "Awaiting Confirmation",
        position: "top-right",
        isClosable: true,
        description: "Waiting for confirmation....",
        status: "info",
      });

      setTimeout(() => {
        toast({
          title: "Swap Successful",
          position: "top-right",
          isClosable: true,

          description: (
            <p>
              Your swap was successful. Click here to view transaction:
              <a
                href={`https://testnet.algoexplorer.io/tx/${tx?.txId}`}
                target={"_blank"}
              >
                {tx.txId}
              </a>
            </p>
          ),
          duration: 10000,
          status: "success",
        });
      }, 4000);

      return;
    } catch (error: any) {
      toast({
        title: "Notice",
        isClosable: true,
        description: error?.message || "Something went wrong please try again!",
        duration: 10000,
        status: "error",
      });
      setloading(false);
      return;
    }
  };

  const optInAsset = async () => {
    try {
      setOptinLoading(true);
      await optIn(account, to);
      setOptinLoading(false);
      toast({
        title: "Success",
        description: "You have opted in successfully!!",
        duration: 10000,
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong please try again!",
        duration: 10000,
        status: "error",
      });
      setOptinLoading(false);
      return;
    }
  };

  // React.useEffect(() => {
  //   // @ts-ignore
  //   if (typeof AlgoSigner !== "undefined") {
  //     ConnectAlgoSigner();
  //   } else {
  //     console.log("algo signer isnt installed");
  //   }
  // }, []);

  React.useEffect(() => {
    console.log({ from, to });
    if (from == to) {
      setexchange(0);
      toast({ description: "you cant swap same pairs", duration: 1000 });
      return;
    }
    if (from != null && to != null) {
      toast({ description: "loading rates", duration: 1000 });
      fetchRate(from, to).then((val) => {
        setexchange(val);
      });
    }
  }, [to, from]);

  let parsedEx = exchange ?? 0;
  let parsedAmount = amount ?? 0;
  let iget = parsedAmount / parsedEx;
  if (exchange == null || exchange == 0) {
    iget = 0.0;
  }

  let canSwap = false;
  if (from != null && to != null) {
    if (from !== to) {
      canSwap = true;
    }
  }
  return (
    <Box
      m="auto"
      w={{ md: "50%" }}
      bg="rgba(100,100,100,.2)"
      p="18px"
      rounded="lg"
      boxShadow="lg"
      mb="24px"
    >
      <Box>
        <Heading size="md">Exchange</Heading>
        <Spacer h="4" />
        <Divider />
        <Spacer h="4" />
      </Box>
      <Text fontSize="sm">From</Text>
      <Box
        my={"12px"}
        mt="4px"
        bg="rgba(100,100,100,.2)"
        p="8px"
        borderRadius={"md"}
      >
        <Box>
          <HStack>
            <Input
              fontSize="xl"
              disabled={false}
              fontWeight="extrabold"
              placeholder="0.0"
              variant="unstyled"
              p="12px"
              onChange={(event) => {
                // @ts-ignore
                setAmount(event.target.value);
              }}
            />
            <SelectAsset onSelect={(val) => setfrom(val)} selected={from} />
          </HStack>
        </Box>
        {/* <InputRightElement children={<SelectToken onSelect={(val) => setfrom(val)} />} width="100px" /> */}
      </Box>
      <Center>
        <IconButton aria-label="">
          <IoArrowDownSharp />
        </IconButton>
      </Center>
      <Text fontSize="sm" colorScheme="gray">
        To
      </Text>
      <Box
        my={"12px"}
        mt="4px"
        bg="rgba(80,80,80,.2)"
        p="8px"
        borderRadius={"md"}
      >
        <HStack>
          <Input
            disabled={true}
            value={iget}
            placeholder="0.0"
            fontSize="xl"
            fontWeight="extrabold"
            variant="unstyled"
            p="12px"
          />
          <SelectAsset onSelect={(val) => setto(val)} selected={to} />
        </HStack>
      </Box>

      <Button
        size="lg"
        m="auto"
        mt={"12px"}
        as={Box}
        disabled={!canSwap}
        colorScheme="twitter"
        color="white"
        bg="blue.300"
        isFullWidth
        onClick={swapAssets}
      >
        {loading ? <ClipLoader color="white" loading={true} /> : "Swap"}
      </Button>
      <Button
        size="lg"
        m="auto"
        as={Box}
        mt="12px"
        colorScheme="red"
        bg="red.500"
        color="white"
        isFullWidth
        onClick={optInAsset}
      >
        {optinLoading ? <ClipLoader color="white" loading={true} /> : "Add ASA"}
      </Button>
    </Box>
  );
};

function SelectAsset({
  onSelect,
  selected,
}: {
  onSelect: (value: string) => void;
  selected: string | null;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        px="18px"
        leftIcon={<div></div>}
        _focus={{}}
        rightIcon={<IoArrowDownSharp />}
      >
        {selected == null ? "Select" : selected}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#110A21">
          <ModalHeader>Select Asset</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody p="0px">
            <Box p="12px">
              <Input placeholder="Search Asset" />
            </Box>
            <Box h="250px" overflowY="scroll">
              {defaultAssets.map((asset) => {
                return (
                  <Box>
                    <Box
                      p="12px"
                      px="24px"
                      _hover={{ bg: "rgba(50,50,50,.3)" }}
                      onClick={() => {
                        onSelect(asset.name);
                        onClose();
                      }}
                    >
                      <Grid templateColumns='repeat(5, 1fr)' gap={3}>

                        <GridItem>
                          {asset.name }
                        </GridItem>

                        <GridItem>
                          {asset.verified &&   <CheckCircle size={15} color={"green"} />}
                        </GridItem>


                      </Grid>
                     
                    </Box>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
