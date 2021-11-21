import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "./layout/index"
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import apptheme from "../lib/utils/theme"


const config: ThemeConfig = {
    initialColorMode: "dark",
  useSystemColorMode: false,
}

const mainTheme = extendTheme({config, ...apptheme})
const AppUIInit: React.FC<{}> = ({ children }) => {
    return (
        <ChakraProvider theme={mainTheme} >
            <Router>
                <div style={{backgroundColor:"#110A21", minHeight:"100vh"}}>
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