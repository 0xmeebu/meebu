// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import { FC } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "./GraphQL";
import { Network } from "./Network";
import configFile from "./config.json";

import ActionMenu from "./Components/ActionsMenu";
import ProposalsGrid from "./Components/ProposalsGrid";

import '@mantine/core/styles.css'

import { MantineProvider, createTheme, MantineColorsTuple, Button } from '@mantine/core';


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
        }
      });

    return (
        <div>
            <MantineProvider theme={theme}>
            <Network />
            <GraphQLProvider>
            <ActionMenu />    
            <ProposalsGrid />
            </GraphQLProvider>
            </MantineProvider>
        </div>
        
    );
};

export default App;
