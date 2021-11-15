import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Flex, Input, InputGroup,
    InputLeftElement, Box, Text, Spacer, Progress, Button
} from "@chakra-ui/react";
import React from "react";
import { AppPageBodySection } from "../components/pageBody";
import { AppPageCoverSection } from '../components/pageCoverSection';


const Screen: React.FC<{}> = () => {
    return (
        <div style={{ overflow: "auto" }}>

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
                            <Tab>Upcoming</Tab>
                            <Tab>Active</Tab>
                            <Tab>Finished</Tab>
                        </TabList>
                    </Flex>
                    <Spacer h="12" />
                </Tabs>
            </AppPageBodySection>
        </div>
    );
}

export default Screen
