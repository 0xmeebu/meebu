import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
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
    myColor,
  }
});

function App() {
  return (
    <MantineProvider theme={theme}>
     <h1>"Hello"</h1>
    </MantineProvider>
  );
}

export default App