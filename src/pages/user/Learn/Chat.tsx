import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IMessage {
    role: "ai" | "user";
    message: string;
}

const mockMessages: IMessage[] = [
    {
        role: "user",
        message: "What is the capital of France?",
    },
    {
        role: "ai",
        message: "The capital of France is Paris.",
    },
    {
        role: "user",
        message: "Can you tell me about the Eiffel Tower?",
    },
    {
        role: "ai",
        message:
            "Sure! The Eiffel Tower is a wrought-iron lattice tower in Paris, France. It was completed in 1889 and is one of the most recognizable landmarks in the world.",
    },
    {
        role: "user",
        message: "What are some other famous landmarks in France?",
    },
    {
        role: "ai",
        message:
            "Some other famous landmarks in France include the Louvre Museum, Mont Saint-Michel, the Palace of Versailles, and the Notre-Dame Cathedral.",
    },
];
const Chat = () => {
    const [messages, setMessages] = useState<IMessage[]>(mockMessages);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        let resizeTextarea: () => void;

        if (textarea) {
            resizeTextarea = () => {
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
            };
            textarea.addEventListener("input", resizeTextarea);
        }
        return () => textarea?.removeEventListener("input", resizeTextarea);
    }, []);

    useEffect(() => {
        const div = scrollRef.current;
        if (div) {
            // instant scroll
            // div.scrollTop = div.scrollHeight;
            div.scrollTo({
                top: div.scrollHeight - div.clientHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const handleSend = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            const newMessage: IMessage = {
                role: "user",
                message: textarea.value,
            };
            setMessages([...messages, newMessage]);
            textarea.value = "";
        }
    };

    return (
        <div
            ref={scrollRef}
            className="font-mono bg-[#e3dff2] max-h-[79.5vh] min-h-[79.5vh] min-w-full overflow-y-auto"
        >
            <div className="mb-10 px-2">
                {messages.map((message) => (
                    <div
                        className={`flex ${
                            message.role === "ai"
                                ? "justify-start"
                                : "justify-end"
                        }`}
                    >
                        <div
                            className={`w-4/5 border  border-black rounded-t-lg my-1 p-2 font-publicSans ${
                                message.role === "ai"
                                    ? " bg-[#b299f9]  rounded-br-lg"
                                    : " bg-[#a8a8a8]  rounded-bl-lg"
                            }`}
                        >
                            {message.message}
                        </div>
                    </div>
                ))}
                <div className=" text-transparent">last</div>
            </div>

            {/* send message  */}
            <div className="absolute inset-x-0 bottom-0 border-t border-black py-4 p-5 flex justify-between gap-5 bg-white">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    className="w-full resize-none border-none outline-none overflow-hidden"
                    placeholder="How can I help you..."
                />
                <button onClick={handleSend}>
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
};

export default Chat;
