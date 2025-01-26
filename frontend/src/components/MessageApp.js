// frontend/src/components/MessageApp.js
import React, { useState, useEffect } from 'react';
import { getMessages, createMessage, updateMessage, deleteMessage } from '../services/messageService';
import './MessageApp.css';

function MessageApp() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      showNotification('Message content cannot be empty!', 'error');
      return;
    }

    if (editId) {
      await updateMessage(editId, content);
      showNotification('Message updated successfully!', 'success');
      setEditId(null);
    } else {
      await createMessage(content);
      showNotification('Message added successfully!', 'success');
    }
    setContent('');
    fetchMessages();
  };

  const handleEdit = (message) => {
    setContent(message.content);
    setEditId(message.id);
    showNotification('Editing message...', 'info');
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    showNotification('Message deleted successfully!', 'success');
    fetchMessages();
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="message-app">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
        {editId && (
          <button type="button" onClick={() => { setContent(''); setEditId(null); }}>
            Cancel
          </button>
        )}
      </form>
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className="message-item">
            <span>{message.content}</span>
            <div className="message-actions">
              <button className="edit" onClick={() => handleEdit(message)}>Edit</button>
              <button onClick={() => handleDelete(message.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageApp;
