"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

const ExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRate = async () => {
    try {
      const res = await fetch("http://localhost:3001/exchange-rate/eur-pln");
      const data = await res.json();
      setRate(data.exchange_rate);
    } catch (err) {
      setError("Failed to fetch exchange rate");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();

    const interval = setInterval(() => {
      fetchRate();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{ padding: 4, textAlign: "center", marginTop: 10 }}
        >
          <Typography variant="h6" gutterBottom>
            EUR to PLN
          </Typography>
          <Typography variant="h4">{rate}</Typography>
        </Paper>
      )}
    </>
  );
};

export default ExchangeRate;
