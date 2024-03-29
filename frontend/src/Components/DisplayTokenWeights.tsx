import { Accordion, Avatar, Group, Text} from "@mantine/core";
import { TokenInfo } from "../Interfaces";

interface DisplayTokenWeightsProps {
    Erc20Weights: any
    unitLabel?: string
    suffix?: string
}

function DisplayTokenWeights(props: DisplayTokenWeightsProps) {
    return(
    <Accordion chevronPosition="right" variant="contained">
          {props.Erc20Weights.map((token: TokenInfo, index: number) => (
            <Accordion.Item key={token.address} value={token.address}>
            <Accordion.Control icon={<Avatar src={token.uri} />}>
                <Group justify="space-between">
                    {token.label || "unknown token"}
                    <Text>{props.unitLabel} {token.weight} {props.suffix} </Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>{token.address}</Accordion.Panel>
            </Accordion.Item>
          ))}
    </Accordion>
    )
}


export default DisplayTokenWeights
