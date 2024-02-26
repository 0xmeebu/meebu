// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import React, { useState } from "react";
import { ethers } from "ethers";
import { useRollups } from "../../useRollups";
import { useWallets } from "@web3-onboard/react";
import { IERC20__factory, IERC721__factory } from "../../generated/rollups";
import { Button, Fieldset, Group, NumberInput, TextInput } from "@mantine/core";
interface IInputPropos {
    dappAddress: string 
}

export const Input: React.FC<IInputPropos> = (propos) => {
    const rollups = useRollups(propos.dappAddress);
    const [connectedWallet] = useWallets();
    const provider = new ethers.providers.Web3Provider(
        connectedWallet.provider
    );


    const depositErc20ToPortal = async (token: string,amount: number) => {
        try {
            if (rollups && provider) {
                const data = ethers.utils.toUtf8Bytes(`Deposited (${amount}) of ERC20 (${token}).`);
                //const data = `Deposited ${args.amount} tokens (${args.token}) for DAppERC20Portal(${portalAddress}) (signer: ${address})`;
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress()

                const erc20PortalAddress = rollups.erc20PortalContract.address;
                const tokenContract = signer ? IERC20__factory.connect(token, signer) : IERC20__factory.connect(token, provider);

                // query current allowance
                const currentAllowance = await tokenContract.allowance(signerAddress, erc20PortalAddress);
                if (ethers.utils.parseEther(`${amount}`) > currentAllowance) {
                    // Allow portal to withdraw `amount` tokens from signer
                    const tx = await tokenContract.approve(erc20PortalAddress, ethers.utils.parseEther(`${amount}`));
                    const receipt = await tx.wait(1);
                    const event = (await tokenContract.queryFilter(tokenContract.filters.Approval(), receipt.blockHash)).pop();
                    if (!event) {
                        throw Error(`could not approve ${amount} tokens for DAppERC20Portal(${erc20PortalAddress})  (signer: ${signerAddress}, tx: ${tx.hash})`);
                    }
                }

                await rollups.erc20PortalContract.depositERC20Tokens(token,propos.dappAddress,ethers.utils.parseEther(`${amount}`),data);
            }
        } catch (e) {
            console.log(`${e}`);
        }
    };

    const transferNftToPortal = async (contractAddress: string,nftid: number) => {
        try {
            if (rollups && provider) {
                const data = ethers.utils.toUtf8Bytes(`Deposited (${nftid}) of ERC721 (${contractAddress}).`);
                //const data = `Deposited ${args.amount} tokens (${args.token}) for DAppERC20Portal(${portalAddress}) (signer: ${address})`;
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress()

                const erc721PortalAddress = rollups.erc721PortalContract.address;

                const tokenContract = signer ? IERC721__factory.connect(contractAddress, signer) : IERC721__factory.connect(contractAddress, provider);

                // query current approval
                const currentApproval = await tokenContract.getApproved(nftid);
                if (currentApproval !== erc721PortalAddress) {
                    // Allow portal to withdraw `amount` tokens from signer
                    const tx = await tokenContract.approve(erc721PortalAddress, nftid);
                    const receipt = await tx.wait(1);
                    const event = (await tokenContract.queryFilter(tokenContract.filters.Approval(), receipt.blockHash)).pop();
                    if (!event) {
                        throw Error(`could not approve ${nftid} for DAppERC721Portal(${erc721PortalAddress})  (signer: ${signerAddress}, tx: ${tx.hash})`);
                    }
                }

                // Transfer
                rollups.erc721PortalContract.depositERC721Token(contractAddress,propos.dappAddress, nftid, "0x", data);
            }
        } catch (e) {
            console.log(`${e}`);
        }
    };


    
  
    const [hexInput, setHexInput] = useState<boolean>(false);
    const [erc20Amount, setErc20Amount] = useState<number>(0);
    const [erc20Token, setErc20Token] = useState<string>("");
    const [erc721Id, setErc721Id] = useState<number>(0);
    const [erc721, setErc721] = useState<string>("");
    const [etherAmount, setEtherAmount] = useState<number>(0);
    const [erc1155, setErc1155] = useState<string>("");
    const [erc1155Id, setErc1155Id] = useState<number>(0);
    const [erc1155Amount, setErc1155Amount] = useState<number>(0);
    const [erc1155Ids, setErc1155Ids] = useState<number[]>([]);
    const [erc1155Amounts, setErc1155Amounts] = useState<number[]>([]);


    return (
        <div>
                <Fieldset legend="Stake ERC20 Tokens">
                    <TextInput  value={erc20Token} onChange={(e) => setErc20Token(e.target.value)} label="Token Address" placeholder="0x0" />
                    <TextInput value={erc20Amount} onChange={(e) => setErc20Amount(Number(e.target.value))}label="Amount" placeholder="0.0" mt="md" />

                <Group justify="flex-end" mt="md">
                <Button onClick={() => depositErc20ToPortal(erc20Token,erc20Amount)} disabled={!rollups}>
                    Deposit ERC20
                </Button>
                </Group>
                </Fieldset>

                <Fieldset legend="Stake ERC721 NFT">
                    <TextInput  value={erc721} onChange={(e) => setErc721(e.target.value)} label="Token Address" placeholder="0x0" />
                    <TextInput value={erc721Id} onChange={(e) => setErc721Id(Number(e.target.value))} label="Token ID" placeholder="0" mt="md" />

                <Group justify="flex-end" mt="md">
                <Button onClick={() => transferNftToPortal(erc721,erc721Id)} disabled={!rollups}>
                    Deposit ERC721
                </Button>
                </Group>
                </Fieldset>
        </div>
    );
};
