import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/app/objects/user';

interface Message {
    text: string;
    author: string;
    recipient: string;
    timestamp: string;
    sentAt: string;
}

const sendMessage = async (message: Message) => {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
    }

    return response.json();
};

const getMessages = async (author: string, recipient: string) => {
    const response = await fetch(`/api/messages?author=${author}&recipient=${recipient}`);
    if (!response.ok) {
        throw new Error('Error fetching messages');
    }
    return response.json();
};

const getUsers = async () => {
    const response = await fetch('/api/users');
    if (!response.ok) {
        throw new Error('Error fetching users');
    }
    const data = await response.json();
    return data.users;
};

const MessageSection = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [recipient, setRecipient] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [activeChat, setActiveChat] = useState<User | null>(null);

    useEffect(() => {
        getUsers().then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                setUsers(data);
            }
        });
    }, []);

    useEffect(() => {
        if (session && recipient) {
            const fetchMessages = async () => {
                const allMessages = await getMessages((session?.user as any)?.fullname, recipient);
                setMessages(allMessages);
            };
            fetchMessages();
        }
    }, [session, recipient]);

    const handleSendMessage = async () => {
        if (message.length < 1 || message.length > 50) {
            setConfirmation('El mensaje debe tener entre 1 y 50 caracteres');
            setTimeout(() => setConfirmation(''), 5000);
            return;
        }

        const newMessage: Message = {
            text: message,
            author: (session?.user as any)?.fullname || 'Anonymous',
            recipient: recipient,
            timestamp: new Date().toLocaleTimeString(),
            sentAt: new Date().toISOString(),
        };

        try {
            await sendMessage(newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');
            setConfirmation('Mensaje enviado');
            setTimeout(() => setConfirmation(''), 5000);
        } catch (error) {
            console.error(error);
            setConfirmation('Error al enviar el mensaje');
            setTimeout(() => setConfirmation(''), 5000);
        }
    };

    const handleUserClick = (user: User) => {
        setRecipient((session?.user as any)?.fullname);
        setActiveChat(user);
    };

    const userMessages = messages.filter(msg =>
        (msg.author === (session?.user as any)?.fullname && msg.recipient === recipient) ||
        (msg.recipient === (session?.user as any)?.fullname && msg.author === recipient)
    );

    return (
        <div style={{
            backgroundImage: `url("/cart.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
        }}>
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">
                <button onClick={() => setShowMessages(!showMessages)} className="block w-auto p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 mb-4">
                    {showMessages ? 'Close messages' : 'Open messages'}
                </button>
                {showMessages &&
                    <div className="relative w-full">
                        <div className="flex">
                            <div className="w-1/4 bg-black text-white p-4 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">Users: </h2>
                                {users.map(user => (
                                    <div key={user.id} className="cursor-pointer p-2 border-b" onClick={() => handleUserClick(user)}>
                                        {user.fullname}
                                    </div>
                                ))}
                            </div>
                            <div className="w-3/4 p-4">
                                {activeChat ? (
                                    <div className="flex flex-col h-full">
                                        <div className="flex-1 overflow-y-auto">
                                            <h2 className="text-2xl font-bold mb-4 text-white p-2 bg-black rounded-lg">Chat with {activeChat.fullname}</h2>
                                            {userMessages.map((msg, index) => (
                                                <div key={index} className={`mb-2 p-2 rounded-lg ${msg.author === (session?.user as any)?.fullname ? 'bg-blue-200 self-end' : 'bg-gray-200'}`}>
                                                    <p>{msg.text}</p>
                                                    <p className="text-xs text-gray-600">{new Date(msg.sentAt).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4">
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Write your msg here..."
                                                className="text-black p-2 w-full border border-black rounded-lg font-bold mt-2"
                                            />
                                            <button onClick={handleSendMessage} className="w-full p-2 mt-2 bg-black text-white rounded-lg">Send</button>
                                        </div>
                                        {confirmation && <p className="mt-2 text-center text-red-500 font-bold">{confirmation}</p>}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500">Select a user to start chatting</div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MessageSection;
