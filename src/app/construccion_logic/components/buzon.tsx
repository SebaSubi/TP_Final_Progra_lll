import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { all } from "axios";
import { useUserStore } from "@/app/store/user";

interface Message {
  _id: string;
  text: string;
  author: string;
  sentAt: string;
  readed: boolean;
  attachments: string[];
  recipient: string;
  timestamp: string;
}

const getMessages = async () => {
  try {
    const response = await fetch("/api/messages");

    if (!response.ok) {
      throw new Error("Error fetching messages");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Error fetching messages" };
  }
};

const updateMessageReadedStatus = async (id: string) => {
  try {
    const response = await fetch("/api/messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, readed: true }),
    });

    if (!response.ok) {
      throw new Error("Error updating message");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Error updating message" };
  }
};

const InboxSection = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessages, setShowMessages] = useState(false);
  const [newMessageNotification, setNewMessageNotification] = useState(false);
  const updateMaterials = useUserStore((state) => state.updateMaterials);

  useEffect(() => {
    const fetchMessages = async () => {
      const allMessages = await getMessages();
      const userMessages = allMessages.filter(
        (msg: Message) => msg.recipient === (session?.user as any)?.fullname
      );
      setMessages(userMessages);

      if (userMessages.length > 0) {
        setNewMessageNotification(true);
      }
      if(allMessages[allMessages.length - 1].attachments.length > 0) { 
        console.log(Number(allMessages[allMessages.length - 1].attachments[1]))
        updateMaterials(allMessages[allMessages.length - 1].attachments[0], Number(allMessages[allMessages.length - 1].attachments[1]));

        allMessages[allMessages.length - 1].attachments = [];
    }

    };
    fetchMessages();
  }, [session]);

  const handleOpenInbox = async () => {
    setShowMessages((prevShowMessages) => !prevShowMessages);
    if (newMessageNotification) {
      const unreadMessages = messages.filter((msg) => !msg.readed);
      await Promise.all(
        unreadMessages.map((msg) => updateMessageReadedStatus(msg._id))
      );
      setNewMessageNotification(false);
      setMessages(messages.map((msg) => ({ ...msg, readed: true })));
    }
  };

  return (
    <div className="fixed top-0 right-2/5 transform -translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">
      <button
        onClick={handleOpenInbox}
        className="p-2 font-comic mt1 bg-[#f7cd8d] text-[#b7632b] border-[3px] border-[#b7632b] rounded-lg font-bold uppercase duration-200 mb-2"
      >
        {showMessages ? "Close inbox" : "Open inbox"}
      </button>
      {newMessageNotification && <div>New message!</div>}
      {showMessages && (
        <div className="relative w-full">
          <img
            src="/messages1.png"
            alt="Background"
            className="w-full object-cover rounded-lg"
            style={{ height: "700" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div
              className="w-full max-w-lg bg-transparent p-4 rounded-lg"
              style={{
                maxHeight: "500px",
                scrollbarWidth: "none",
                scrollbarColor: "transparent transparent",
                overflowY: "auto",
              }}
            >
              <h2
                style={{ textShadow: "3px 3px 2px rgba(255, 0, 0, 0.5)" }}
                className="text-4xl font-comic mt1 font-bold mb-6 text-center w-full text-[#b7632b] mr-5"
              >
                {" "}
                INBOX{" "}
              </h2>
              <div
                className="message-section"
                style={{
                  overflowY: "auto",
                  maxHeight: "300px",
                  marginTop: "0.8rem",
                  scrollbarWidth: "none",
                  scrollbarColor: "transparent transparent",
                  msOverflowStyle: "none",
                }}
              >
                {messages.map((msg, index) => (
                  <div
                    className="font-comic mt1"
                    key={index}
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                        textDecoration: "underline",
                        textUnderlineOffset: "0.15em",
                      }}
                    >
                      From: {msg.author === msg.recipient ? "You" : msg.author}
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {msg.text}
                    </p>
                    <p style={{ fontSize: "12px", color: "black" }}>
                      {new Date(msg.sentAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxSection;
