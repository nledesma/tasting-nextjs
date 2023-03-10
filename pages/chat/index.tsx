import Bubble from "../../components/chat/bubble";
import { MdSend } from "react-icons/md";
import { useState } from "react";
import { ConversationContext, Sender } from "../../interfaces/interfaces";
import { updateContext } from "../../model/context";
import Writing from "../../components/chat/writing";

const initialContext: ConversationContext = {
  conversation: [],
  contextualPrompt: ''
}

const Chat = () => {
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [context, setContext] = useState(initialContext);
  const [messageInput, setMessageInput] = useState('');

  const handleSend = async () => {      
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context
      })
    });
    setContext(await response.json());
    setLoadingResponse(false);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && messageInput.trim() !== '') {
      setLoadingResponse(true);
      const userUpdatedContext = updateContext(context, {
        sender: Sender.user,
        time: new Date(),
        content: messageInput
      });
      setContext(userUpdatedContext); 
      setMessageInput('');
      handleSend();
    }
  }

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => setMessageInput(e.target.value);
  const conversationDisplay = context.conversation.slice(0).reverse()

  return (
    <div className="flex h-full flex-col items-center justify-center py-2">
      <h2 className="text-4xl font-bold">
        Chat with GPT
      </h2>
      <div className="flex flex-1 w-full flex-col justify-between">
        <div className="flex w-full flex-col-reverse max-h-[75vh] overflow-auto pr-2 scrollbar">
          {loadingResponse && <Writing />}
          {conversationDisplay.map(conversationItem => <Bubble sender={conversationItem.sender} content={conversationItem.content} />)}
        </div>
        <div className="flex w-full flex-row pr-2">
          <input
            className="border-2 w-full p-4 rounded-lg border-indigo-200 focus:outline-indigo-400" placeholder="Say something"
            onChange={onType}
            value={messageInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="flex place-self-center justify-center h-14 w-12 mx-2 bg-green-300 rounded-xl border-2 border-green-400"
            onClick={handleSend}
          >
            <MdSend
              className="flex place-self-center text-green-800"
              size={'1.4em'} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

