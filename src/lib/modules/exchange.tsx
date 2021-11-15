import { SearchIcon } from "@chakra-ui/icons";
import {
    Box, Button, Center, Divider, Flex, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, Spacer, Tab, Table, TableCaption, TabList, TabPanel, TabPanels, Tabs,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import React from "react";
import { AppPageBodySection } from "../components/pageBody";
import { IoLogoBitcoin, IoArrowDownSharp } from "react-icons/io5"
import { SwapCard } from "../components/organisms/swap/card";

const Screen: React.FC<{}> = () => {
    return (
        <div>

            <AppPageBodySection>
                <Spacer h="6" />
                <Tabs variant="soft-rounded" colorScheme="green" m="auto" justifyItems="center">
                    <Flex direction={{ md: "column", base: "column" }} justify="center">
                        <TabList justifyItems="center" justifyContent="center">
                            <Tab>Swap</Tab>
                            <Tab>Liquidity</Tab>
                        </TabList>
                    </Flex>
                    <TabPanels>
                        <TabPanel>
                            <SwapCard/>
                        </TabPanel>
                        <TabPanel>
                            <Box m="auto" w={{ md: "50%" }} bg="rgba(200,200,200,.2)" p="24px" rounded="lg" boxShadow="lg" mb="24px">
                                <Box>
                                    <Heading size="md">Add Liquidity</Heading>
                                    <Text color="gray.300">Add liquidity to receive LP tokens</Text>
                                    <Spacer h="4" />
                                    <Divider />
                                    <Spacer h="4" />
                                </Box>
                                <Box my={"16px"} bg="rgba(200,200,200,.2)" p="8px" borderRadius={"md"}>
                                    <Text color="gray.300">Input</Text>
                                    <InputGroup size="sm">
                                        <Input disabled={false} placeholder="0.0" variant="unstyled" p="12px" />
                                    </InputGroup>
                                </Box>
                                <Center>
                                    <IoArrowDownSharp />
                                </Center>
                                <Box my={"16px"} bg="rgba(200,200,200,.2)" p="8px" borderRadius={"md"}>
                                    <Text color="gray.300">Input</Text>
                                    <InputGroup size="sm">
                                        <Input disabled={false} placeholder="0.0" variant="unstyled" p="12px" />
                                    </InputGroup>
                                </Box>
                                <Button size="lg" m="auto" as={Box} colorScheme="red" isFullWidth>Add liquidity</Button>
                            </Box>

                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </AppPageBodySection>
        </div>
    );
}

export default Screen
