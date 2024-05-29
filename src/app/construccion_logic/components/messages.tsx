import React, { useState } from 'react';

interface Message {
    text: string;
    timestamp: string;
}

const MessageSection = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [confirmation, setConfirmation] = useState('');

    const handleSendMessage = () => {
        const newMessage = {
            text: message,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage('');

        setConfirmation('Mensaje enviado');
        setTimeout(() => setConfirmation(''), 5000); //para que la confirmacion dure solo 5 segundos
    };

    return (
        <div> 
            <img src="/cart.jpg" alt="p11" style={{ width: '100%', height: 'auto' }}/>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0">
                <div style={{ width: '100%', maxWidth: '300px' }}>
                    <div className="message-section" style={{ overflowY: 'auto', maxHeight: '250px', marginTop: '0.8rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ border: '1px solid black', padding: '5px', margin: '5px', borderRadius: '5px' }}>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' ,color: 'black' }}>{msg.text}</p>
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
                            style={{ backgroundColor: 'transparent', color: 'black'}}
                        />
                    <button onClick={handleSendMessage} className="w-full p-1 text-black border border-black rounded-lg font-bold uppercase">Enviar</button>
                    {confirmation && <p style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{confirmation}</p>}
                </div>
            </div>
        </div> 
    );
};

export default MessageSection;