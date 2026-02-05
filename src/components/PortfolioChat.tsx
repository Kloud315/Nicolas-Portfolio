 import { useState, useRef, useEffect } from 'react';
 import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import ReactMarkdown from 'react-markdown';
 
 type Message = {
   role: 'user' | 'assistant';
   content: string;
 };
 
 const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`;
 
 export function PortfolioChat() {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([
     {
       role: 'assistant',
       content: "Hi! I'm John Patrick's portfolio assistant. Ask me anything about his skills, projects, or how he can help with your needs!",
     },
   ]);
   const [input, setInput] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);
 
   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   };
 
   useEffect(() => {
     scrollToBottom();
   }, [messages]);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!input.trim() || isLoading) return;
 
     const userMessage: Message = { role: 'user', content: input.trim() };
     setMessages((prev) => [...prev, userMessage]);
     setInput('');
     setIsLoading(true);
 
     let assistantContent = '';
 
     try {
       const response = await fetch(CHAT_URL, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
         },
         body: JSON.stringify({
           messages: [...messages.slice(1), userMessage].map((m) => ({
             role: m.role,
             content: m.content,
           })),
         }),
       });
 
       if (!response.ok) {
         throw new Error('Failed to get response');
       }
 
       const reader = response.body?.getReader();
       if (!reader) throw new Error('No reader available');
 
       const decoder = new TextDecoder();
       let textBuffer = '';
 
       while (true) {
         const { done, value } = await reader.read();
         if (done) break;
 
         textBuffer += decoder.decode(value, { stream: true });
 
         let newlineIndex: number;
         while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
           let line = textBuffer.slice(0, newlineIndex);
           textBuffer = textBuffer.slice(newlineIndex + 1);
 
           if (line.endsWith('\r')) line = line.slice(0, -1);
           if (line.startsWith(':') || line.trim() === '') continue;
           if (!line.startsWith('data: ')) continue;
 
           const jsonStr = line.slice(6).trim();
           if (jsonStr === '[DONE]') break;
 
           try {
             const parsed = JSON.parse(jsonStr);
             const content = parsed.choices?.[0]?.delta?.content as string | undefined;
             if (content) {
               assistantContent += content;
               setMessages((prev) => {
                 const last = prev[prev.length - 1];
                 if (last?.role === 'assistant' && prev.length > 1) {
                   return prev.map((m, i) =>
                     i === prev.length - 1 ? { ...m, content: assistantContent } : m
                   );
                 }
                 return [...prev, { role: 'assistant', content: assistantContent }];
               });
             }
           } catch {
             textBuffer = line + '\n' + textBuffer;
             break;
           }
         }
       }
     } catch (error) {
       console.error('Chat error:', error);
       setMessages((prev) => [
         ...prev,
         {
           role: 'assistant',
           content: "I'm having trouble responding right now. Please try again or use the contact form to reach out directly!",
         },
       ]);
     } finally {
       setIsLoading(false);
     }
   };
 
   return (
     <>
       {/* Chat Toggle Button */}
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
         aria-label={isOpen ? 'Close chat' : 'Open chat'}
       >
         {isOpen ? (
           <X className="w-6 h-6" />
         ) : (
           <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
         )}
       </button>
 
       {/* Chat Window */}
       {isOpen && (
         <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
           {/* Header */}
           <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
               <Bot className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-semibold">Portfolio Assistant</h3>
               <p className="text-xs opacity-80">Ask me about John Patrick!</p>
             </div>
           </div>
 
           {/* Messages */}
           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
             {messages.map((msg, i) => (
               <div
                 key={i}
                 className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 {msg.role === 'assistant' && (
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                     <Bot className="w-4 h-4 text-primary" />
                   </div>
                 )}
                 <div
                   className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                     msg.role === 'user'
                       ? 'bg-primary text-primary-foreground rounded-br-md'
                       : 'bg-muted text-foreground rounded-bl-md'
                   }`}
                 >
                   {msg.role === 'assistant' ? (
                     <div className="prose prose-sm dark:prose-invert max-w-none">
                       <ReactMarkdown>{msg.content}</ReactMarkdown>
                     </div>
                   ) : (
                     <p className="text-sm">{msg.content}</p>
                   )}
                 </div>
                 {msg.role === 'user' && (
                   <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                     <User className="w-4 h-4 text-primary-foreground" />
                   </div>
                 )}
               </div>
             ))}
             {isLoading && messages[messages.length - 1]?.role === 'user' && (
               <div className="flex gap-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                   <Bot className="w-4 h-4 text-primary" />
                 </div>
                 <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                   <div className="flex gap-1">
                     <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                     <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                     <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
           </div>
 
           {/* Input */}
           <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
             <div className="flex gap-2">
               <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Ask about skills, projects..."
                 className="flex-1 px-4 py-2 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                 disabled={isLoading}
               />
               <Button
                 type="submit"
                 size="icon"
                 className="rounded-full"
                 disabled={isLoading || !input.trim()}
               >
                 <Send className="w-4 h-4" />
               </Button>
             </div>
           </form>
         </div>
       )}
     </>
   );
 }