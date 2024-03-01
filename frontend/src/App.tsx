import { FC } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, Web3OnboardProvider } from "@web3-onboard/react";

import { GraphQLProvider } from "./GraphQL";
import configFile from "./config.json";

import ActionMenu from "./Components/ActionsMenu";

import '@mantine/core/styles.css'

import { MantineProvider, createTheme, MantineColorsTuple, Button } from '@mantine/core';
import ProposalsDisplay from "./Components/ProposalDisplay/ProposalsDisplay";


const chains = Object.entries(configFile).map(
  ([k, v]: [string, any], _i) => ({ id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl })
)
const wallets = [injectedModule()]

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Meebu",
    icon: "favicon.ico",
    description: "Governance layer",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

const App: FC = () => {
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
      })
    }
  });

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <MantineProvider theme={theme}>
        <GraphQLProvider>
          <ActionMenu />
          <ProposalsDisplay />
        </GraphQLProvider>
      </MantineProvider>
    </Web3OnboardProvider>
  );
};

export default App;
