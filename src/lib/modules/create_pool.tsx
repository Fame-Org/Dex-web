import { Flex, Input, Text, Box, Heading, Divider, Spacer } from "@chakra-ui/react";
import React from "react";
import { AppPageBodySection } from "../components/pageBody";
import { AppPageCoverSection } from '../components/pageCoverSection';
import { IoIosWallet, IoIosCash } from "react-icons/io"

const Screen: React.FC<{}> = () => {
    return (
        <div>
            <AppPageBodySection>
                <Box py="24px">
                    <Heading fontSize="5xl" textAlign="center">Create Pool</Heading>
                </Box>
                <Divider />
                <Box py="24px">
                    <Flex direction={{base:"column", md:"row"}}>
                        <Box flex={1} as={Flex} p="24px" rounded="12px" background="rgba(200,200,200,.1)">
                            <IoIosWallet size={48} color="rgba(200,200,200,.5)" style={{ marginRight: 12 }} />
                            <Flex direction="column" >
                                <Text>My Balance</Text>
                                <Text color="gray" fontSize="lg">0 TOKEN</Text>
                            </Flex>
                        </Box>
                        <Box w="12px" boxSize="12" />
                        <Box flex={1} as={Flex} p="24px" rounded="12px" background="rgba(200,200,200,.1)">
                            <IoIosCash size={48} color="rgba(200,200,200,.5)" style={{ marginRight: 12 }} />
                            <Flex direction="column" >
                                <Text>Pool Fee</Text>
                                <Text color="gray" fontSize="lg">0 {"TOKEN"}</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Divider />
                <Flex direction="column" w={["100%", "100%", "60%"]} p={"24px"} justifySelf="center"
                    bg="rgba(200,200,200,.1)"
                    boxShadow="lg"
                    rounded="12"
                    margin="auto"
                    my={"24px"}
                    color="white">
                    <Box w="100%" mt="4">
                        <Text>Staking Token</Text>
                        <Input variant="outline" placeholder="Value" size="lg" />
                    </Box>
                    <Box w="100%" mt="4">
                        <Text>Pool Token</Text>
                        <Input variant="outline" placeholder="Value" size="lg" />
                    </Box>
                    <Box w="100%" mt="4">
                        <Text>Start Time Stamp</Text>
                        <Input variant="outline" placeholder="Value" size="lg" />
                    </Box>
                    <Box w="100%" mt="4">
                        <Text>Finish Time Stamp</Text>
                        <Input variant="outline" placeholder="Value" size="lg" />
                    </Box>
                    <Box w="100%" mt="4">
                        <Text>Pool Token Supply</Text>
                        <Input variant="outline" placeholder="Value" />
                    </Box>
                </Flex>
            </AppPageBodySection>
        </div>
    );
}

export default Screen