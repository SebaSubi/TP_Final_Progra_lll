import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import io from 'socket.io-client';


interface Message {
    text: string;
    author: string;
    sentAt: string;
    attachments: string[];
    recipient: string;
    timestamp: string;
}

// const sendMessage = async (message: { text: string; author: string; timestamp: string; }) => {
//     console.log(message);
//     const response = await fetch('/api/messages', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(message),
//     });

//     if (!response.ok) {
//         throw new Error('Error al enviar el mensaje');
//     }

//     return response.json();
// };

const getMessages = async () => {
    try {
        const response = await fetch('/api/messages');

        if(!response.ok) {
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

const InboxSection = () => {
    const { data: session } = useSession();
    // const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    // const [recipient, setRecipient] = useState('');
    // const [confirmation, setConfirmation] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    // const [userId, setUserId] = useState('defaultUserId');

    // useEffect(() => {
    //     const socket = io('http://localhost:3000');
    //     socket.on('new message', (msg) => {
    //         setMessages(prevMessages => [...prevMessages, msg]);
    //     });

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    useEffect(() => {
      const fetchMessages = async () => {
          const allMessages = await getMessages();
          const userMessages = allMessages.filter((msg: Message) => msg.recipient === (session?.user as any)?.fullname);
          setMessages(userMessages);
      };
      fetchMessages();
  }, [session]);

    // const handleSendMessage = async () => {
    //     if (message.length < 1 || message.length > 50) {
    //         setConfirmation('El mensaje debe tener entre 1 y 50 caracteres');
    //         setTimeout(() => setConfirmation(''), 5000); 
    //         return;
    //     }

    //     const newMessage = {
    //         text: message,
    //         author: (session?.user as any)?.fullname || 'Anonymous', // Aserción de tipo aquí
    //         sentAt: new Date().toLocaleTimeString(),
    //         attachments: [],
    //         recipient: recipient || 'Admin',
    //         timestamp: new Date().toLocaleTimeString(),
    //     };

    //     try {
    //         await sendMessage(newMessage);
    //         setMessages(prevMessages => [...prevMessages, newMessage]);
    //         setMessage('');
    //         setConfirmation('Mensaje enviado');
    //         setTimeout(() => setConfirmation(''), 5000);
    //     } catch (error) {
    //         console.error(error);
    //         setConfirmation('Error al enviar el mensaje');
    //         setTimeout(() => setConfirmation(''), 5000);
    //     }

        // setMessages(prevMessages => [...prevMessages, newMessage]);
        // setMessage('');

        // setConfirmation('Mensaje enviado');
        // setTimeout(() => setConfirmation(''), 5000);
    // };

    return (
        <div className="fixed top-0 right-2/5 transform -translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">
            <button onClick={() => setShowMessages(!showMessages)} className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 mb-4">
                {showMessages ? 'Close inbox' : 'Open inbox'}
            </button>
            {showMessages && 
                <div className="relative w-full">
                    <img src="/cart.jpg" alt="Background" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: '600px' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div className="w-full max-w-lg bg-transparent p-4 rounded-lg shadow-md" style={{ maxHeight: '500px',scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', overflowY: 'auto' }}>
                        <h2 style={{textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)'}} className="text-4xl font-bold mb-6 text-center w-full text-red-500 mr-5"> INBOX </h2>
                            <div className="message-section" style={{ overflowY: 'auto', maxHeight: '300px', marginTop: '0.8rem', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', msOverflowStyle: 'none' }}>
                            
                                {messages.map((msg, index) => (
                                    <div key={index} style={{ border: '1px solid black', padding: '5px', margin: '5px', borderRadius: '5px' }}>
                                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>{msg.text}</p>
                                        <p style={{ fontSize: '12px', color: 'black' }}>{msg.sentAt}</p>
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

export default InboxSection;