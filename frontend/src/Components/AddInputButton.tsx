import React from "react";
import { useRollups } from "../useRollups";
import { Button } from "@mantine/core";

interface IInputPropos {
  payload: string
  label: string
}

export const AddInputButton: React.FC<IInputPropos> = (props) => {
  const rollups = useRollups();

  const addInput = async (payload: string) => {
    if (rollups) {
      try {
        await rollups.inputContract.addInput(rollups.dappAddress, payload);
      } catch (e) {
        console.log(`${e}`);
      }
    }
  };

  return (
    <Button onClick={() => addInput(props.payload)} disabled={!rollups || rollups.connecting}>
      {props.label}
    </Button>
  );
};

export default AddInputButton
