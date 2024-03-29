import { Accordion, Avatar, Group, Text} from "@mantine/core";
import { TokenInfo } from "../Interfaces";

interface DisplayWalletProps {
    balance: any[]
    unitLabel?: string
    suffix?: string
}

function DisplayWallet(props: DisplayWalletProps) {
    return(
    <Accordion chevronPosition="right" variant="contained">
          {props.balance.map((token: any, index: number) => (
            <Accordion.Item key={token.address} value={token.address}>
            <Accordion.Control icon={<Avatar src={token.uri} />}>
                <Group justify="space-between">
                    {token.label || "unknown token"}
                    <Text>{props.unitLabel} {token.balance} {props.suffix} </Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>{token.address}</Accordion.Panel>
            </Accordion.Item>
          ))}
    </Accordion>
    )
}


export default DisplayWallet
