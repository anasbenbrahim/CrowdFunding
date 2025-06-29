import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function PaymentDialog({ open, onOpenChange, communityId, amount: initialAmount }) {
    const [amount, setAmount] = useState(initialAmount ? initialAmount.toString() : '');
    const [currency, setCurrency] = useState('usd');

    const handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `amount=${amount * 100}&currency=${currency}&communityId=${communityId}` // Stripe expects amount in cents
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const sessionUrl = await response.text();
            window.location.href = sessionUrl;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Make a Payment</DialogTitle>
                    <DialogDescription>
                        Enter the amount and currency for your payment.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currency" className="text-right">
                            Currency
                        </Label>
                        <Input
                            id="currency"
                            type="text"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handlePayment}>Pay Now</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}