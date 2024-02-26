import { Button } from "@mantine/core";
import { useConnectWallet } from "@web3-onboard/react";


interface NoWalletButtonProps {
    label: string;
  }
  
  
  function NoWalletButton(props: NoWalletButtonProps) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    return (
    <Button onClick={() =>
            connect()
        }
    >
        {connecting ? "connecting wallet" : props.label}
    </Button>
    );
  }
  
  export default NoWalletButton