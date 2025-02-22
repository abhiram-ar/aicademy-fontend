import { SquarePlus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const NewChatButton = () => {
    return (
        <div className="absolute top-2 right-3">
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger>
                        <SquarePlus className="fill-zinc-300 stroke-black/70 hover:stroke-black" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-publicSans">New chat</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default NewChatButton;
