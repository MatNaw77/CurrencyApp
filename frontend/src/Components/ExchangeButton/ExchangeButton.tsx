"use client";

import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AmountDialog from "../ExchangeForm/ExchangeForm";

const ExchangeButton = () => {
  const [open, setOpen] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (amount: number) => {
    try {
      const res = await fetch("http://localhost:3001/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error("Failed to convert amount");
      }

      const data = await res.json();
      setConvertedAmount(data.convertedAmount);
    } catch (error) {
      alert("Failed to convert amount. Please try again.");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={handleOpen}
        sx={{
          top: 0,
          right: 0,
          mt: 3,
          px: 5,
          py: 2,
          fontSize: "1.2rem",
          borderRadius: 3,
          textTransform: "none",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#115293",
          },
        }}
      >
        Exchange EUR to PLN
      </Button>
      {convertedAmount !== null && (
        <Typography variant="h6" mt={2}>
          Converted Amount: {convertedAmount.toFixed(2)} PLN
        </Typography>
      )}
      <AmountDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ExchangeButton;
