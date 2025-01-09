import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";



const Withdraw = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="reverse" size="lg" className="bg-green-400">
                    Withdraw
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Withdraw earning?</DialogTitle>
                    <DialogDescription>
                        min. Withdraw amount is ₹1000
                    </DialogDescription>
                </DialogHeader>
                <div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Withdraw;
