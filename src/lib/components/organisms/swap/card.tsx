import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
    Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Button, Center, Divider,
    Heading, Text, Input, InputGroup, Spacer, Select, InputRightElement, toast, useToast
} from "@chakra-ui/react"
import React, { useCallback } from "react"
import { IoArrowDownSharp } from "react-icons/io5"
import { fetchAssets, fetchRate, optIn } from "../../../services/algo"
import { defaultAssets } from "../../../store/default-assets"
import { funcSwapAsset } from "../../../store/swap-function"



export const SwapCard: React.FC<{}> = () => {
    let toast = useToast();
    const [assets, setAssets] = React.useState<any[]>([]);
    let [account, setAccount] = React.useState<string | null>(null);
    let [amount, setAmount] = React.useState<number | null>(null)
    const [from, setfrom] = React.useState<string | null>(null);
    const [to, setto] = React.useState<string | null>(null);
    const [exchange, setexchange] = React.useState<number | null>(null);

    const GetAccounts = useCallback(async () => {
        try {
            // @ts-ignore
            const r = await AlgoSigner.accounts({
                ledger: "TestNet",
            });

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
            toast({ title: "Notice", description: "Connecting algo wallet", duration: 2000 })
            // @ts-ignore
            const r = await AlgoSigner.connect();
            console.log("conected");
            GetAccounts()
            return JSON.stringify(r, null, 2);
        } catch (e) {
            console.error(e);
            console.log(`Couldn't find AlgoSigner!`);
            toast({ title: "Notice", description: "Couldn't find AlgoSigner!", duration: 2000 })
            console.log("failed to connect ");
            return JSON.stringify(e, null, 2);
        }
    }, []);

    React.useEffect(() => {
        // @ts-ignore
        if (typeof AlgoSigner !== "undefined") {
            ConnectAlgoSigner();
        } else {
            console.log("algo signer isnt installed");
        }
    }, []);

    React.useEffect(() => {
        console.log({ from, to });
        if (from == to) {
            setexchange(0);
            toast({ description: 'you cant swap same pairs', duration: 1000 });
            return;
        }
        if (from != null && to != null) {
            toast({ description: 'loading rates', duration: 1000 });
            fetchRate(from, to).then(val => {
                setexchange(val);
            });
        }
    }, [to, from]);

    let parsedEx = exchange ?? 0;
    let parsedAmount = amount ?? 0;
    let iget = parsedAmount / parsedEx;
    if (exchange == null || exchange == 0) {
        iget = 0.00;
    }

    let canSwap = false;
    if (from != null && to != null) {
        if (from !== to) {
            canSwap = true;
        }
    }
    return <Box m="auto" w={{ md: "50%" }} bg="rgba(200,200,200,.2)" p="18px" rounded="lg" boxShadow="lg" mb="24px">
        <Box>
            <Heading size="md">Exchange</Heading>
            <Text>Trade ASAs in an instant</Text>
            <Spacer h="4" />
            <Divider />
            <Spacer h="4" />
        </Box>
        <Box my={"12px"} bg="rgba(200,200,200,.2)" p="8px" borderRadius={"md"}>
            <Text fontSize="sm" >From | {" "}{from ?? "NotSet"}</Text>
            <InputGroup size="sm">
                <Input fontSize="xl" disabled={false}
                    fontWeight="extrabold" placeholder="0.0" variant="unstyled" p="12px"
                    onChange={(event) => {
                        // @ts-ignore
                        setAmount(event.target.value);
                    }} />
                <InputRightElement children={<SelectToken onSelect={(val) => setfrom(val)} />} width="100px" />
            </InputGroup>
        </Box>
        <Center>
            <IoArrowDownSharp />
        </Center>
        <Box my={"12px"} bg="rgba(200,200,200,.2)" p="8px" borderRadius={"md"}>
            <Text fontSize="sm" colorScheme="gray">To | {" "}{to ?? "NotSet"}</Text>
            <InputGroup size="sm">
                <Input disabled={true} value={iget} placeholder="0.0" fontSize="xl" fontWeight="extrabold" variant="unstyled" p="12px"
                />
                <InputRightElement children={<SelectToken onSelect={(val) => setto(val)} />} width="100px" />
            </InputGroup>
        </Box>

        <Button size="lg" m="auto" as={Box} disabled={!canSwap} colorScheme="twitter" isFullWidth onClick={() => {
            funcSwapAsset(from, to, amount, exchange, { from: account });
        }}>Swap</Button>
        <Button size="lg" m="auto" as={Box} mt="12px" colorScheme="red" isFullWidth onClick={() => {
            optIn(account, to);
        }}>Opt-in</Button>
    </Box>

}



export const SelectToken: React.FC<{ onSelect: (value: string) => void }> = ({ onSelect }) => {
    return <Menu>
        <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
        >
            Select <ChevronDownIcon />
        </MenuButton>
        <MenuList bg="gray.800" zIndex="10000000">
            {defaultAssets.map(asset => {
                return <MenuItem onClick={() => {
                    onSelect(asset.name);
                }}>{asset.name}</MenuItem>
            })}
        </MenuList>
    </Menu>
}
