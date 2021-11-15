import React from 'react'
import { Heading, Flex, Text, Input } from "@chakra-ui/react"
import { Container } from "react-grid-system"

export const AppPageCoverSection: React.FC<{ title: string, description?: string }> = ({ title, description }) => {

    return <div >
        <Container style={{ padding: "16px 24px", background: "transparent" }} fluid>
            <Flex minHeight={200} direction="column" justify="center" justifyItems="center" justifyContent="center">
                <Heading size="3xl" fontWeight="extrabold">{title}</Heading>
                {description??<Text fontSize="2xl">{description}</Text>}
            </Flex>
        </Container>
    </div>
}

export default Screen;