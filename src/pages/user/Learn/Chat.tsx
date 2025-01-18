import { SendHorizontal } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Chat = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

    return (
        <div className="font-mono">
            <div className="absolute inset-x-0 border border-red-400 bottom-0 py-4 p-5 flex justify-between gap-5 bg-white">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    className="w-full resize-none border-none outline-none overflow-hidden"
                    placeholder="How can I help you..."
                />
                <button>
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
};

export default Chat;
