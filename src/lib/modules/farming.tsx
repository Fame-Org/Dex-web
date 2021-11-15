import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Heading, Input, InputGroup, InputLeftElement, Spacer, Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import { AppPageBodySection } from "../components/pageBody";
import { AppPageCoverSection } from '../components/pageCoverSection';
import { PoolsList } from "./stacking";


const Screen: React.FC<{}> = () => {
    return (
        <div>
            <AppPageCoverSection
                title="Farming"/>
            <AppPageBodySection>

                <Tabs variant="soft-rounded" colorScheme="green">
                    <Flex direction={{ md: "column", base: "column" }}>
                        <InputGroup style={{ width: "50%", marginRight: 12, marginBottom: 12 }} w={{}}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input disabled={false} placeholder="Search pools" />
                        </InputGroup>

                        <TabList>
                            <Tab>Public Pools</Tab>
                            <Tab>Verified Pools</Tab>
                            <Tab>Closed Pools</Tab>
                        </TabList>
                    </Flex>
                    <Spacer h="12" />
                </Tabs>

                <div style={{ overflow: "hidden" }}>
                    <PoolsList />
                </div>
            </AppPageBodySection>
        </div>
    );
}

export default Screen