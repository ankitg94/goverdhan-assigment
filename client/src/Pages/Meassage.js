import React, { useState, useEffect } from 'react';
import { sendMessageApi, getMessagesApi } from '../Api/AllApi'; 
import io from 'socket.io-client';
const socket = io('http://localhost:4000'); 

const Message = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const fetchMessages = async () => {
    try {
      const res = await getMessagesApi(senderId, receiverId);
      setMessages(res.data); 
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    socket.on('receiveMessage', (newMessage) => {
      if (newMessage.sender === receiverId) { 
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    
    return () => {
      socket.off('receiveMessage');
    };
  }, [receiverId, senderId]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim()) return; 

    try {
      const newMessage = {
        senderId,
        receiverId,
        content: message,
      };
      const res = await sendMessageApi(newMessage);
      setMessages([...messages, res.data]);
      setMessage(''); 
      socket.emit('sendMessage', newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === senderId ? 'sent' : 'received'}`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Message;
