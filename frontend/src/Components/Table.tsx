import { Table } from '@mantine/core';
import { Token } from '../Interfaces';

interface TokenTableProps {
  weights: Token[];
  catg: string
}


function TokenTable(props: TokenTableProps) {
    const rows = props.weights.map((element) => (
        <Table.Tr key={element.address}>
          <Table.Td>{element.label}</Table.Td>
          <Table.Td>{element.weight}</Table.Td>
        </Table.Tr>
      ));

    const ths = (
      <Table.Tr>
      <Table.Th>{props.catg}</Table.Th>
    </Table.Tr>
  );
  
  return (
    <Table withRowBorders={false}>
       <Table.Thead>{ths}</Table.Thead>
      {rows}
    </Table>
  );
}

export default TokenTable