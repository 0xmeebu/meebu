

import { FC } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "./GraphQL";
import configFile from "./config.json";

import ActionMenu from "./Components/ActionsMenu";
import ProposalsGrid from "./Components/ProposalDisplay/ProposalsRow";

import '@mantine/core/styles.css'

import { MantineProvider, createTheme, MantineColorsTuple, Button } from '@mantine/core';
import FetchProposals from "./Components/ProposalDisplay/FetchProposals";


const config: any = configFile;

const injected: any = injectedModule();
init({
    wallets: [injected],
    chains: Object.entries(config).map(([k, v]: [string, any], i) => ({id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl})),
    appMetadata: {
        name: "Meebu",
        icon: "<svg><svg/>",
        description: "Governance layer",
        recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
        ],
    },
});

const App: FC = () => {
    const [dappAddress, setDappAddress] = useState<string>("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");

    const pink: MantineColorsTuple = [
        '#ffe8ff',
        '#ffcfff',
        '#ff9bff',
        '#ff64ff',
        '#fe38fe',
        '#fe1cfe',
        '#ff09ff',
        '#e400e4',
        '#cb00cb',
        '#b100b2'
      ];
      
      const theme = createTheme({
        colors: {
          pink,
        },
        components: {
            Button: Button.extend({
              defaultProps: {
                color: 'pink',
                variant: 'light',
              }
            })}
      });

    return (
        <div>
            <MantineProvider theme={theme}>
            <GraphQLProvider>
            <ActionMenu />    
             <FetchProposals />
            </GraphQLProvider>
            </MantineProvider>
        </div>
        
    );
};

export default App;
