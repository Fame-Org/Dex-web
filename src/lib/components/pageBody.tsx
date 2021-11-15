import React from 'react'
import { Heading, Flex, Text, Input } from "@chakra-ui/react"
import { Container } from "react-grid-system"

export const AppPageBodySection: React.FC<{}> = ({ children }) => {

    return <div >
        <Container style={{ padding: "16px 24px",overflow:"hidden" }} fluid>
            {children}
        </Container>
    </div>
}

export default Screen;