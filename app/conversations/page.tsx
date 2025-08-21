'use client';
import { useState } from 'react';

export default function ConversationsPage() {
  const [feedback, setFeedback] = useState<{[key:string]: string}>({});
  const conversations = [
    { id: '1', title: 'Call with Client A' },
    { id: '2', title: 'Support: Complaint resolved' },
    { id: '3', title: 'Sales call: Prospect B' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      <ul className="space-y-4">
        {conversations.map(conv => (
          <li key={conv.id} className="p-4 border rounded">
            <p className="font-semibold">{conv.title}</p>
            <div className="space-x-2 mt-2">
              <button onClick={() => setFeedback({ ...feedback, [conv.id]: 'up' })}
                className={feedback[conv.id] === 'up' ? 'text-green-600 font-bold' : 'text-gray-600'}>
                👍
              </button>
              <button onClick={() => setFeedback({ ...feedback, [conv.id]: 'down' })}
                className={feedback[conv.id] === 'down' ? 'text-red-600 font-bold' : 'text-gray-600'}>
                👎
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}