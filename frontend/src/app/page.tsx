import ExchangeRate from "@/Components/ExchangeRate/ExchangeRate";
import ExchangeButton from "@/Components/ExchangeButton/ExchangeButton";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      bgcolor="#f5f5f5"
      minHeight="100vh"
      flexDirection="column"
      alignItems="center"
    >
      <ExchangeRate />
      <ExchangeButton />
    </Box>
  );
}
