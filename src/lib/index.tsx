import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "./layout/index"
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { extendTheme , ThemeConfig} from "@chakra-ui/react"

const config:ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({config})

const AppUIInit: React.FC<{}> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <div>
                    {children}
                </div>
            </Router>
        </ChakraProvider>
    )
}

export default function func() {

    return (<AppUIInit>
        <Layout />
    </AppUIInit>);
}