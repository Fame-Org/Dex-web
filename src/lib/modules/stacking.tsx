import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Flex, Input, InputGroup,
    InputLeftElement, Box, Text, Spacer, Progress, Button
} from "@chakra-ui/react";
import React from "react";
import { AppPageBodySection } from "../components/pageBody";
import { AppPageCoverSection } from '../components/pageCoverSection';

export const DemoPool: { label: string, value: string }[] = [
    {
        label: "APY",
        value: "53.97%"
    }, {
        label: "Reward per minute",
        value: "0.0045 Token"
    }, {
        label: "Start",
        value: "03 Jul, 2021 15:00 PM"
    }, {
        label: "Finish",
        value: "18 Aug, 2021 19:00 PM"
    }, {
        label: "Your stake",
        value: "53.97%"
    }, {
        label: "Pool share",
        value: "53.97%"
    },
    {
        label: "Participants",
        value: "53.97%"
    }
]

const Screen: React.FC<{}> = () => {
    return (
        <div style={{ overflow: "auto" }}>
            <AppPageCoverSection
                title="Staking"
                description="Stake to earn new tokens. You can unstake at any time. Rewards are calculated per block." />
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
               
               <div style={{overflow:"hidden"}}>
               <PoolsList />
               </div>
            </AppPageBodySection>
        </div>
    );
}

export default Screen


export const PoolsList: React.FC<{}> = () => {


    return <div>

        <Flex wrap="wrap" justify="space-around" style={{  }}>
            {[1, 2, 3, 4, 5, 6].map(v => {
                return <Box width={[
                    "100%", // 0-30em
                    "100%", // 30em-48em
                    "50%", // 48em-62em
                    "32.5%", // 62em+
                ]} p="1">
                    <PoolCard pool_props={DemoPool} />
                </Box>
            })}
        </Flex>

    </div>
}

const PoolCard: React.FC<{ pool_props: { label: string, value: string }[] }> = ({ pool_props }) => {

    return <Box padding="12px" boxShadow="lg" rounded={"8px"} marginBottom="12px"
        background="rgba(10,100,100,.4)"
        overflow="hidden"
    >
        <Text fontSize="3xl" fontFamily="monospace">Pool name</Text>
        {pool_props.map(v => (
            <Flex justify="space-between" margin="12px 0px">
                <Text fontSize="sm">{v.label}</Text>
                <Text fontSize="md" color="rgba(90,90,90,.6)">{v.value}</Text>
            </Flex>
        ))}
        <Spacer h="12px" />
        <Progress value={80} h="4px" />
        <Spacer h="12px" />
        <Button isFullWidth>View Pool</Button>
    </Box>
}