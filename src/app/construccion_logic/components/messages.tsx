import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';



interface Message {
    text: string;
    author: string;
    attachments: string[];
    recipient: string;
    timestamp: string;
}

const sendMessage = async (message: { text: string; author: string; timestamp: string; }) => {
    console.log(message);
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

const getMessages = async () => {
    try {
        const response = await fetch('/api/messages');

        if(!response.ok) {
            throw new Error('Error fetching messages');
        }
            
        const data = await response.json();
        console.log(data); // Print the data
        return data;
    } catch (error) {
        console.error(error);
        return { error: 'Error fetching messages' }; // Return an error message
    }
}

const MessageSection = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [recipient, setRecipient] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    // const [userId, setUserId] = useState('defaultUserId');

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await getMessages();
            setMessages(messages);
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (message.length < 1 || message.length > 50) {
            setConfirmation('El mensaje debe tener entre 1 y 50 caracteres');
            setTimeout(() => setConfirmation(''), 5000); 
            return;
        }

        const newMessage = {
            text: message,
            author: (session?.user as any)?.fullname || 'Anonymous', // Aserción de tipo aquí
            attachments: [],
            recipient: recipient || 'Admin',
            timestamp: new Date().toLocaleTimeString(),
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

        // setMessages(prevMessages => [...prevMessages, newMessage]);
        // setMessage('');

        // setConfirmation('Mensaje enviado');
        // setTimeout(() => setConfirmation(''), 5000);
    };

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">
            <button onClick={() => setShowMessages(!showMessages)} className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 mb-4">
                {showMessages ? 'Close messages' : 'Open messages'}
            </button>
            {showMessages && 
                <div className="relative w-full">
                    <img src="/cart.jpg" alt="Background" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: '600px' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div className="w-full max-w-lg bg-transparent p-4 rounded-lg shadow-md" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <div className="message-section" style={{ overflowY: 'auto', maxHeight: '300px', marginTop: '0.8rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <h2 style={{textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)'}} className="text-5xl font-bold mb-6 text-center w-full text-red-500 mr-5"> MESSAGES </h2>
                                {messages.map((msg, index) => (
                                    <div key={index} style={{ border: '1px solid black', padding: '5px', margin: '5px', borderRadius: '5px' }}>
                                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>{msg.text}</p>
                                        <p style={{ fontSize: '12px', color: 'black' }}>{msg.timestamp}</p>
                                    </div>
                                ))}
                            </div>
                            <input 
                                type="text"
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                placeholder="Write your msg here..."
                                className="text-black p-2 mb-4 w-full border border-black rounded-lg font-bold mt-2"
                                style={{ backgroundColor: 'gray', color: 'black'}}
                            />
                            {confirmation && <p style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{confirmation}</p>}
                            <input 
                                type="text"
                                value={recipient} 
                                onChange={(e) => setRecipient(e.target.value)} 
                                placeholder="Send To.."
                                className="text-black p-2 mb-4 w-full border border-black rounded-lg font-bold mt-2"
                                style={{ backgroundColor: 'gray', color: 'black'}}
                            />
                            <button onClick={handleSendMessage} className="w-full p-1 text-black border border-black rounded-lg font-bold uppercase">Enviar</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageSection;
