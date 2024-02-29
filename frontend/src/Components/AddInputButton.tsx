import React, { useState } from "react";
import { ethers } from "ethers";
import { useRollups } from "../useRollups";
import { useWallets } from "@web3-onboard/react";
import { Button } from "@mantine/core";

interface IInputPropos {
    payload: string
    label: string
}

export const AddInputButton: React.FC<IInputPropos> = (props) => {
    const dappAddress = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"
    const rollups = useRollups(dappAddress);
    const [connectedWallet] = useWallets();
    const provider = new ethers.providers.Web3Provider(
        connectedWallet.provider
    );

    const addInput = async (payload: string) => {
        if (rollups) {
            try {
                await rollups.inputContract.addInput(dappAddress, payload);
            } catch (e) {
                console.log(`${e}`);
            }
        }
    };

    return (
                <Button onClick={() => addInput(props.payload)} disabled={!rollups}>
                    {props.label}
                </Button>
    );
};

export default AddInputButton
