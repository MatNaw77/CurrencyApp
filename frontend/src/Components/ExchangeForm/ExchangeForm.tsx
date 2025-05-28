"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

type AmountDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
};

const AmountDialog = ({ open, onClose, onConfirm }: AmountDialogProps) => {
  const [amount, setAmount] = useState<string>("1");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid amount greater than 0.");
    } else {
      setError(null);
      onConfirm(value);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ p: 2, pt: 4, pl: 5, pr: 5 }}>
        Enter Amount in EUR
      </DialogTitle>
      <DialogContent sx={{ pb: 1, pt: 2, pl: 5, pr: 5 }}>
        <TextField
          autoFocus
          fullWidth
          label="Amount (EUR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          margin="dense"
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions sx={{ pt: 2, pb: 4, pr: 5, pl: 5 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AmountDialog;
