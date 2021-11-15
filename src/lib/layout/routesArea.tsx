import React from 'react'
import { Route, Switch } from "react-router-dom"
import { Heading, Flex, Text, Input } from "@chakra-ui/react"
import { Container } from "react-grid-system"
import StackActivity from "../modules/stacking"
import FarmingActivity from "../modules/farming"
import BridgeActivity from "../modules/bridge"
import ExchangeActivity from "../modules/exchange"
import CreatePoolActivity from "../modules/create_pool"
import LabActivity from "../modules/lab"
import GuideActivity from "../modules/guide"
const Screen: React.FC<{}> = () => {

    return <div style={{}}>
        <Switch>
            <Route path="/bridge" component={BridgeActivity} />
            <Route path="/exchange" component={ExchangeActivity} />
            <Route path="/farming" component={FarmingActivity} />
            <Route path="/create-pool" component={CreatePoolActivity} />
            <Route path="/lab" component={LabActivity} />
            <Route path="/guide" component={GuideActivity} />
            <Route path={["/stake", ""]} component={StackActivity} />
        </Switch>
    </div>
}

export default Screen;