import React, { useState, useRef, useEffect } from 'react';
import { IoCloseCircle } from "react-icons/io5";

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null); // Reference to the modal container

  const handleSend = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { user: 'user', text: message }];
    setChat(newChat);

    try {
      const response = await fetch('http://127.0.0.1:8000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the chatbot');
      }

      const data = await response.json();

      if (data.reply.status === 'success') {
        const scholarships = data.reply.scholarships.map((scholarship) => (
          `<div>
            <h3>${scholarship.name}</h3>
            <p><strong>Description:</strong> ${scholarship.description}</p>
            <p><strong>Link:</strong> <a href="${scholarship.links}" target="_blank" rel="noopener noreferrer">Click Here</a></p>
          </div>`
        ));
        setChat([...newChat, { user: 'bot', text: scholarships.join('<br/>') }]);
      } else {
        setChat([...newChat, { user: 'bot', text: data.reply.message }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setChat([...newChat, { user: 'bot', text: 'Error: Could not get a response from the chatbot.' }]);
    }

    setMessage('');
  };

  // Detect clicks outside the modal and close it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Button to open the chatbot */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full"
      >
        Open Chatbot
      </button>

      {/* Modal for Chatbot */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          {/* Modal container */}
          <div ref={modalRef} className="bg-white top-10 left-[35%] w-96 h-[500px] rounded-lg shadow-lg relative">
            <div className="p-4">
              <h2 className="text-xl font-bold">Scholarship Chatbot</h2>
              <div className="overflow-y-auto h-64 border-b mb-4 p-2">
                {chat.map((c, index) => (
                  <p key={index} className={c.user === 'user' ? 'user-msg' : 'bot-msg'}>
                    <strong>{c.user === 'user' ? 'You: ' : 'Bot: '}</strong>
                    <span dangerouslySetInnerHTML={{ __html: c.text }} />
                  </p>
                ))}
              </div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about scholarships..."
                className="border w-full p-2 mb-4"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Send
              </button>
            </div>

            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <IoCloseCircle size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
