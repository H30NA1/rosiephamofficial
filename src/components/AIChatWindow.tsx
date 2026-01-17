import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatWithRosieAI, ChatMessage } from "@/lib/ai-storage";
import { cn } from "@/lib/utils";

interface AIChatWindowProps {
    onClose: () => void;
    isOpen: boolean;
}

const AIChatWindow = ({ onClose, isOpen }: AIChatWindowProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: 'Hello! I am Rosie Pham\'s AI Assistant. How can I help you with your trading today?' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const [sessionId, setSessionId] = useState<string>('');

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', content: inputValue.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            // Pass history and current session ID
            const { text, sessionId: newSessionId } = await chatWithRosieAI([...messages, userMsg], sessionId);

            if (newSessionId && (!sessionId || sessionId !== newSessionId)) {
                setSessionId(newSessionId);
            }

            const aiMsg: ChatMessage = { role: 'assistant', content: text };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <Card className="fixed bottom-24 right-6 w-[350px] md:w-[400px] z-50 shadow-2xl animate-in slide-in-from-bottom-2 duration-300 border-primary/20">
            <CardHeader className="p-4 bg-primary/5 border-b flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage src="/lovable-uploads/rosie-avatar.png" alt="AI" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base">Rosie AI Assistant</CardTitle>
                        <p className="text-xs text-muted-foreground">Ask me anything about trading</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-start gap-2.5 max-w-[85%]",
                                    message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                    message.role === 'user' ? "bg-secondary" : "bg-primary/10 border-primary/20"
                                )}>
                                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                                </div>

                                <div className={cn(
                                    "p-3 rounded-2xl text-sm leading-relaxed",
                                    message.role === 'user'
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : "bg-secondary/50 text-foreground rounded-tl-sm border border-border"
                                )}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-2.5 mr-auto max-w-[85%]">
                                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-primary" />
                                </div>
                                <div className="p-3 rounded-2xl bg-secondary/50 rounded-tl-sm border border-border flex items-center">
                                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                    <span className="ml-2 text-xs text-muted-foreground">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="p-3 border-t bg-background/50 backdrop-blur-sm">
                <div className="flex w-full items-center space-x-2">
                    <Input
                        placeholder="Type your question..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="flex-1 focus-visible:ring-primary/20"
                    />
                    <Button size="icon" onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default AIChatWindow;
