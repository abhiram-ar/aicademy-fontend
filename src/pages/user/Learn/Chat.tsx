import { RootState } from "@/redux/store";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NewChatButton from "./NewChatButton";

interface IMessage {
    role: "ai" | "user";
    message: string;
}

type Props = {
    title?: string;
    videokey?: string;
    aiStatus?: "processing" | "ready" | "failed";
};

// title = "elon musks advise to yound people",
// key = "6762d2e79e4e6d9d0f66202d/09eba1212026862d-elon.mp4",

const Chat: React.FC<Props> = ({ title, videokey, aiStatus }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const webSocketRef = useRef<WebSocket | null>(null);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(
            `ws://localhost:3000?authorization=Bearer ${token}`
        );

        ws.onopen = () => {
            setIsOnline(true);
            console.log("ws connection established");
            webSocketRef.current = ws;
        };

        ws.onerror = (event) => console.error("ws error", event);

        ws.onmessage = (message) => {
            console.log(message);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "ai", message: message.data },
            ]);
        };

        ws.onclose = (event) => {
            webSocketRef.current = null;
            setIsOnline(false);
            console.log("closed ws connection", event);
        };
        return () => {
            console.log("closing ws connection...");
            ws.close();
        };
    }, [token]);

    // load chat data from localstorage when component mounts
    useEffect(() => {
        const chatData = localStorage.getItem(`chatdata/${videokey}`);
        if (chatData) {
            try {
                const savedMessages = JSON.parse(chatData);
                setMessages(savedMessages);
            } catch (error) {
                console.error(
                    "error while loading saved message from local storage",
                    error
                );
            }
        }
    }, [videokey, setMessages]);

    // save messsages to localstroage when message update
    useEffect(() => {
        localStorage.setItem(`chatdata/${videokey}`, JSON.stringify(messages));
    }, [videokey, messages]);

    // resize text area on input
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
    }, [messages]);

    // scroll to last message
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
            if (textarea.value.trim() === "") return;

            const newUserMessage: IMessage = {
                role: "user",
                message: textarea.value,
            };
            setMessages([...messages, newUserMessage]);

            const data = {
                question: textarea.value,
                title,
                key: videokey,
            };

            if (webSocketRef.current)
                webSocketRef.current.send(JSON.stringify(data));

            textarea.value = "";
            textarea.style.height = "auto";
        }
    };

    const handleStartNewChat = () => {
        setMessages([]);
        localStorage.removeItem(`chatdata/${videokey}`);
    };

    return (
        <div className="flex flex-col justify-end font-mono bg-[#e3dff2] max-h-[79.5vh] min-h-[79.5vh] min-w-full">
            <div onClick={handleStartNewChat}>
                <NewChatButton />
            </div>
            <div ref={scrollRef} className="mb-10 px-2 h-full overflow-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
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
            <div
                className={`absolute inset-x-0 bottom-0 border-t border-black py-4 p-5 flex justify-between gap-5 bg-white ${
                    !isOnline && "bg-zinc-600"
                }`}
            >
                <textarea
                    ref={textareaRef}
                    rows={1}
                    className="w-full resize-none border-none outline-none overflow-hidden bg-transparent"
                    placeholder={`${isOnline ? "How can I help you..." : "Chat not available"}`}
                />
                <button disabled={!isOnline} onClick={handleSend}>
                    <SendHorizontal
                        className={`${!isOnline ? "stroke-zinc-700" : "stroke-slate-900/80 hover:stroke-slate-900"} `}
                    />
                </button>
            </div>
        </div>
    );
};

export default Chat;
