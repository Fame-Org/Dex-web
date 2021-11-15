import { Heading } from "@chakra-ui/react";
import React from "react";
import { AppPageBodySection } from "../components/pageBody";
import { AppPageCoverSection } from '../components/pageCoverSection';


const Screen: React.FC<{}> = () => {
    return (
        <div>
            <AppPageCoverSection
                title="Pool Activity" />
            <AppPageBodySection>
                
            </AppPageBodySection>
        </div>
    );
}

export default Screen