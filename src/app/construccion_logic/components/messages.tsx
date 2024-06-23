import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/app/objects/user';


import { useUserStore } from '@/app/store/user';

interface Message {
    text: string;
    author: string;
    attachments: string[];
    recipient: string;
    timestamp: string;
    sentAt: string;
    materials: any[];  
}

const sendMessage = async (message: { text: string; author: string; timestamp: string; materials: any[] }) => {
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

const getUsers = async () => {
    try {
        const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const data = await response.json();
        return data.users; // assuming the API response is { users: [...] }
    } catch (error) {
        console.error(error);
        return { error: 'Error fetching users' };
    }
};

const MessageSection = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [recipient, setRecipient] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [materials, setMaterials] = useState<any[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState(0);
    
    const user = useUserStore((state) => state.user);

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
        const fetchMessages = async () => {
            const allMessages = await getMessages();
            const userMessages = allMessages.filter((msg: Message) => msg.author === (session?.user as any)?.fullname);
            setMessages(userMessages);
        };
        fetchMessages();
    }, [session]);

    const handleSendMessage = async () => {
        // Validate message content
        if (message.length < 1 || message.length > 50) {
            setConfirmation('El mensaje debe tener entre 1 y 50 caracteres');
            setTimeout(() => setConfirmation(''), 5000);
            return;
        }
        
        // Construct the new message object
        const newMessage = {
            text: message,
            author: (session?.user as any)?.fullname || 'Anonymous',
            attachments: [],
            recipient: recipient || 'Admin',
            timestamp: new Date().toLocaleTimeString(),
            sentAt: new Date().toISOString(),
            materials: selectedMaterial ? [{ id: selectedMaterial, quantity }] : [], // Include materials
        };
        
        try {
            // Send the new message
            await sendMessage(newMessage);
            console.log(newMessage);
    
            // Update Zustand materials if selectedMaterial and quantity are set
            if (selectedMaterial && quantity > 0) {
                await useUserStore.getState().sendMaterials(recipient, selectedMaterial);
            }
    
            // Clear input fields and show confirmation
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');
            setSelectedMaterial('');
            setQuantity(0);
            setConfirmation('Mensaje enviado');
            setTimeout(() => setConfirmation(''), 5000);
        } catch (error) {
            console.error(error);
            setConfirmation('Error al enviar el mensaje');
            setTimeout(() => setConfirmation(''), 5000);
        }
        console.log(newMessage);
    };

    return (
        <div className="fixed top-0 right-2/5 transform translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">
            <button onClick={() => setShowMessages(!showMessages)} className="block w-auto p-2 text-center bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 mb-4 z-5">
                {showMessages ? 'Close messages' : 'Open messages'}
            </button>
            {showMessages &&
                <div className="relative w-full">
                    <img src="/cart.jpg" alt="Background" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: '600px' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div className="w-full max-w-lg bg-transparent p-4 rounded-lg shadow-md" style={{ maxHeight: '500px', overflowY: 'auto', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', }}>
                            <div className="message-section" style={{ overflowY: 'auto', maxHeight: '300px', marginTop: '0.8rem', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', msOverflowStyle: 'none' }}>
                                <h2 style={{ textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)' }} className="text-4xl font-bold mb-6 text-center w-full text-red-500 mr-5"> MESSAGES </h2>
                                {messages.map((msg, index) => (
                                    <div key={index} style={{ border: '1px solid black', padding: '5px', margin: '5px', borderRadius: '5px' }}>
                                        <p style={{ fontSize: '17px', fontWeight: 'bold', color: 'black', textDecoration: 'underline', textUnderlineOffset: '0.15em' }}>To: "{msg.recipient}"</p>
                                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>{msg.text}</p>
                                        <p style={{ fontSize: '13px', color: 'black' }}>Sent at: {new Date(msg.sentAt).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your msg here..."
                                className="text-black p-2 w-full border border-black rounded-lg font-bold mt-2"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black' }}
                            />
                            <h2 className="text-black font-bold ml-2 mt-1 mb-1">From: "{(session?.user as any)?.fullname.toUpperCase()}", To:</h2>
                            <select
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                className="text-black p-2 w-full border border-black rounded-lg font-bold"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black' }}
                            >
                                <option value="">Select a user...</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.fullname}>
                                        {user.fullname === (session?.user as any)?.fullname.toUpperCase() ? 'You' : user.fullname}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2">
                                <h3 className="text-black font-bold mb-1">Select Material:</h3>
                                <select
                                    value={selectedMaterial}
                                    onChange={(e) => setSelectedMaterial(e.target.value)}
                                    className="text-black p-2 w-full border border-black rounded-lg font-bold"
                                    style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black' }}
                                >
                                    <option value="">Select a material...</option>
                                    {user.materials.map(material => (
                                        <option key={material.id} value={material.id}>
                                            {material.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-black font-bold mb-1">Quantity:</h3>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    placeholder="Quantity"
                                    className="text-black p-2 w-full border border-black rounded-lg font-bold"
                                    style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black' }}
                               
                                />
                            </div>
                            <button onClick={handleSendMessage} className="w-full p-1 text-black border border-black rounded-lg font-bold uppercase mt-2 hover:bg-lightgray">Enviar</button>
                            {confirmation && <p style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{confirmation}</p>}
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageSection;
