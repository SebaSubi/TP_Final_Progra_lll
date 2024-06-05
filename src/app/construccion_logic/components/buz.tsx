import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Message {
    text: string;
    author: string;
    sentAt: string;
    attachments: string[];
    recipient: string;
    timestamp: string;
}

const getMessages = async () => {
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
            throw new Error('Error fetching messages');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return { error: 'Error fetching messages' };
    }
}

const InboxSection1 = () => {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [showMessages, setShowMessages] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchMessages = async () => {
            const allMessages = await getMessages();
            if (allMessages.error) {
                console.error(allMessages.error);
                return;
            }
            const userMessages = allMessages.filter((msg: Message) => msg.recipient === (session?.user as any)?.fullname);
            console.log('User messages:', userMessages);
            setMessages(userMessages);
        };
        fetchMessages();
    }, [session]);

    const handleReply = (author: string) => {
        console.log('Replying to:', author);
        router.push({
            pathname: '/send-message',
            query: { recipient: author },
        });
    };

    return (
        <div className="fixed top-0 right-2/5 transform -translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">
            <button onClick={() => setShowMessages(!showMessages)} className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 mb-4">
                {showMessages ? 'Close inbox' : 'Open inbox'}
            </button>
            {showMessages &&
                <div className="relative w-full">
                    <img src="/cart.jpg" alt="Background" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: '600px' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div className="w-full max-w-lg bg-transparent p-4 rounded-lg shadow-md" style={{ maxHeight: '500px', overflowY: 'auto', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent' }}>
                            <h2 style={{ textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)' }} className="text-4xl font-bold mb-6 text-center w-full text-red-500 mr-5"> INBOX </h2>
                            <div className="message-section" style={{ overflowY: 'auto', maxHeight: '300px', marginTop: '0.8rem', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', msOverflowStyle: 'none' }}>
                                {messages.map((msg, index) => (
                                    <div key={index} style={{ border: '1px solid black', padding: '5px', margin: '5px', borderRadius: '5px' }}>
                                        <p style={{ fontSize: '17px', fontWeight: 'bold', color: 'black', textDecoration: 'underline', textUnderlineOffset: '0.15em' }}>
                                            From: "{msg.author === msg.recipient ? 'You' : msg.author}"
                                        </p>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>{msg.text}</p>
                                        <p style={{ fontSize: '12px', color: 'black' }}>{new Date(msg.sentAt).toLocaleString()}</p>
                                        <button onClick={() => handleReply(msg.author)} className="mt-2 p-1 bg-blue-500 text-white rounded">Responder</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default InboxSection1;
