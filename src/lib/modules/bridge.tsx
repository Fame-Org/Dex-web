import { SearchIcon } from "@chakra-ui/icons";
import {
    Box, Button, Center, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Spacer, Tab, Table, TableCaption, TabList, Tabs,
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
import { AppPageCoverSection } from '../components/pageCoverSection';
import { PoolsList } from "./stacking";


const Screen: React.FC<{}> = () => {
    return (
        <div>

            <AppPageBodySection>
                <Heading>Bridge between Token and ETH.</Heading>
                <Spacer h="6" />
                <Divider />
                <Spacer h="6" />
                <Tabs variant="soft-rounded" colorScheme="green" m="auto" justifyItems="center">
                    <Flex direction={{ md: "column", base: "column" }} justify="center">
                        <TabList justifyItems="center" justifyContent="center">
                            <Tab>Transit Token</Tab>
                            <Tab>Other Tokens</Tab>
                        </TabList>
                    </Flex>
                    <Spacer h="8" />
                </Tabs>

                <div style={{ overflow: "hidden" }}>
                    <Box m="auto" w={{ md: "50%" }} bg="rgba(200,200,200,.2)" p="24px" rounded="lg" boxShadow="lg" mb="24px">
                        <div>
                            <Text>Token</Text>
                            <Input disabled={false} placeholder="Search pools" />
                        </div>
                        <Box mt={"16px"}>
                            <Text>Amount</Text>
                            <Input disabled={false} placeholder="Search pools" />
                        </Box>
                    </Box>
                    <Spacer h="6" />
                    <Divider />
                    <Spacer h="6" />
                    <Center>
                        <Button size="lg" m="auto" as={Box} colorScheme="red">Transfer</Button>
                    </Center>

                    {/* Action Component Section */}
                    <div>
                        <Spacer h="8" />
                        <Tabs variant="soft-rounded" colorScheme="green" m="auto" justifyItems="center">
                            <Flex direction={{ md: "column", base: "column" }} justify="center">
                                <TabList justifyItems="center" justifyContent="center">
                                    <Tab>Transit To Token</Tab>
                                    <Tab>Payback to ETH</Tab>
                                </TabList>
                            </Flex>
                            <Spacer h="6" />
                        </Tabs>
                        <Spacer h="8" />
                        <RecordsTableRenderer />
                    </div>
                </div>
            </AppPageBodySection>
        </div>
    );
}

export default Screen



function RecordsTableRenderer() {

    let cols = ["TX", "FROM ETH", "TO TOKEN", "AMOUNT", "CONFIRMED", "SIGNED", "ACTION"]
    return <Table variant="simple">
        <Thead>
            <Tr>
                <Th>
                    #
                </Th>
                {cols.map((v, index) => {
                    return <Th key={index}>{v}</Th>
                })}
            </Tr>
        </Thead>
    </Table>
}