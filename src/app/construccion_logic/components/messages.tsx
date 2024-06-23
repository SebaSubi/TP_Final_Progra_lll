import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/app/objects/user';
import { useUserStore } from '@/app/store/user';

interface Message {
    text: string;
    author: string;
    recipient: string;
    timestamp: string;
    sentAt: string;
    attachments: any[];
}

const MessageSection = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [recipient, setRecipient] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<string>(''); // State for selected material
    const [materials, setMaterials] = useState<string[]>([]); // State for user's materials
    const [quantity, setQuantity] = useState(0); // State for quantity of material to send

    const user = useUserStore(state => state.user);
    const updateMaterials = useUserStore(state => state.updateMaterials);

    useEffect(() => {
        // Fetch users and user's materials
        fetchUsers();
        fetchUserMaterials();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const data = await response.json();
            setUsers(data.users); // Assuming the API response structure
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserMaterials = () => {
        // Assuming useUserStore provides a way to fetch user's materials
        const userMaterials = user.materials; // Assuming user.materials is an array of strings
        setMaterials(userMaterials);
    };

    const handleSendMessage = async () => {
        // Validation checks for message length, etc.
        if (message.length < 1 || message.length > 50) {
            setConfirmation('El mensaje debe tener entre 1 y 50 caracteres');
            setTimeout(() => setConfirmation(''), 5000);
            return;
        }

        // Prepare the new message object
        console.log(selectedMaterial.toString(), quantity.toString())
        const newMessage: Message = {
            text: message,
            author: (session?.user as any)?.fullname || 'Anonymous',
            recipient: recipient || 'Admin',
            timestamp: new Date().toLocaleTimeString(),
            sentAt: new Date().toISOString(),
            attachments: [selectedMaterial.toString(), quantity.toString()]
        };

        try {
            console.log(JSON.stringify(newMessage))
            await sendMessage(newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
            // setMessage('');
            setConfirmation('Mensaje enviado');
            setTimeout(() => setConfirmation(''), 5000);

            // If a material is selected, send it
            if (selectedMaterial) {
                await sendMaterial(selectedMaterial, quantity);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setConfirmation('Error al enviar el mensaje');
            setTimeout(() => setConfirmation(''), 5000);
        }
    };

    const sendMessage = async (message: Message) => {
        try {
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
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    };

    const sendMaterial = async (material: string, quantity: number) => {
      try {
        // Update user's materials locally first
        updateMaterials(material, - quantity);

        // Prepare the material sending message
        const materialMessage: Message = {
            text: `Sent ${material} to ${recipient}`,
            author: (session?.user as any)?.fullname || 'Anonymous',
            recipient,
            timestamp: new Date().toLocaleTimeString(),
            sentAt: new Date().toISOString(),
            attachments: [material, quantity]
        };

        // Send the material message
        await sendMessage(materialMessage);
    } catch (error) {
        console.error('Error sending material:', error);
        // Rollback the local state update if needed
        // updateMaterials(material, 1); // Uncomment and implement if rollback is needed
        throw error;
    }
    };

    return (
        <div className="fixed top-0 right-2/5 transform translate-x-1/2 mt-4 flex flex-col items-center w-full max-w-2xl z-10">            
            <button onClick={() => setShowMessages(!showMessages)} className="block w-auto p-2 text-center bg-[#f7cd8d] font-comic mt1 text-[#b7632b] border-[3px] border-[#b7632b] rounded-lg font-bold uppercase duration-200 mb-4 z-5">
                {showMessages ? 'Close messages' : 'Open messages'}
            </button>
            {showMessages && 
                <div className="relative w-full">
                    <img src="/messages1.png" alt="Background" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: '700px' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div className="w-full max-w-lg bg-transparent p-4 rounded-lg" style={{ maxHeight: '500px', overflowY: 'auto', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', }}>
                            <div className="message-section" style={{ overflowY: 'auto', maxHeight: '300px', marginTop: '0.8rem', scrollbarWidth: 'none', scrollbarColor: 'transparent transparent', msOverflowStyle: 'none' }}>
                            <h2 style={{textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)'}} className="text-4xl font-comic mt1 font-bold mb-6 text-center w-full text-red-500 mr-5"> MESSAGES </h2>
                                {messages.map((msg, index) => (
                                    <div className="font-comic mt1" key={index} style={{ border: '1px solid black', padding: '5px', margin: '5px', borderRadius: '5px' }}>
                                        <p style={{ fontSize: '17px', fontWeight: 'bold', color: 'black', textDecoration: 'underline', textUnderlineOffset: '0.15em' }}>To: {msg.recipient}</p>
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
                                className="text-black font-comic mt1 p-2 w-full border border-black rounded-lg font-bold mt-2"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black'}}
                            />
                            {/* <input 
                                type="text"
                                value={recipient} 
                                onChange={(e) => setRecipient(e.target.value)} 
                                placeholder="Send To.."
                                className="text-black p-2 mb-4 w-full border border-black rounded-lg font-bold"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black'}}
                            /> */}
                            <h2 className="text-black font-comic mt1 font-bold ml-2 mt-1 mb-1">From: {(session?.user as any)?.fullname.toUpperCase()}, To:</h2>                            
                            <select 
                                value={recipient} 
                                onChange={(e) => setRecipient(e.target.value)} 
                                className="text-black font-comic mt1 p-2 w-full border border-black rounded-lg font-bold"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black'}}
                            >
                                <option className="font-comic mt1" value="">Select a user...</option>
                                {users.map(user => (
                                    <option className="font-comic mt1" key={user.id} value={user.fullname}>
                                        {user.fullname === (session?.user as any)?.fullname.toUpperCase() ? 'You' : user.fullname}
                                    </option>
                                ))}
                            </select>
                            <h2 className="text-black font-comic mt1 font-bold ml-2 mt-1 mb-1">Select a material</h2> 
                                
                            <select 
                                value={selectedMaterial}
                                onChange={(e) => setSelectedMaterial(e.target.value)}
                                className="text-black font-comic mt1 p-2 w-full border border-black rounded-lg font-bold"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black' }}
                            >
                                <option className="font-comic mt1" value="">Select a material...</option>
                                {user.materials.map((material, index) => (
                                    <option className="font-comic mt1" key={index} >
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} 
                                className="text-black font-comic mt1 p-2 w-full border border-black rounded-lg font-bold"
                                style={{ backgroundColor: 'rgba(200, 200, 200, 0.6)', color: 'black' }}
                                min="1"
                            />

                            <button onClick={handleSendMessage} className="w-full p-1 text-black font-comic mt1 border border-black rounded-lg font-bold uppercase mt-2 hover:bg-lightgray">SEND</button>
                            {confirmation && <p className="font-comic mt1" style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{confirmation}</p>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageSection;
