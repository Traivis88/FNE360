import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send, Bot, Sparkles, CheckCircle2, User } from 'lucide-react';
import { useLanguage } from '../translations';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'ai',
    text: "Bonjour ! Je suis votre Coach Professionnel IA FNE360. Comment puis-je vous accompagner dans votre parcours professionnel aujourd'hui ?",
    time: 'Maintenant',
  },
];

const SUGGESTIONS = [
  "Comment optimiser mon CV pour le FNE ?",
  "Quelles sont les certifications gratuites disponibles ?",
  "Quels sont les critères pour le programme PED ?",
  "Conseils pour réussir un entretien d'embauche",
];

interface AssistantModalProps {
  onClose: () => void;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ onClose }) => {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (textToSend?: string) => {
    const text = textToSend ?? input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: 'Maintenant',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Merci pour votre message ! Le FNE vous propose un accompagnement personnalisé. N'hésitez pas à vous inscrire dans votre agence FNE la plus proche ou à consulter nos programmes certifiants sur FNE360.";
      const lower = text.toLowerCase();
      if (lower.includes('cv')) {
        reply = "Pour optimiser votre CV : mettez en avant vos compétences opérationnelles, vos certifications FNE360, et adaptez le titre à chaque offre d'emploi ciblée.";
      } else if (lower.includes('certif') || lower.includes('care')) {
        reply = "Le CARE (Certificat d'Aptitude à la Recherche d'Emploi) ainsi que les modules en gestion, bureautique et entrepreneuriat sont 100% gratuits et financés par le FNE.";
      } else if (lower.includes('programme') || lower.includes('ped')) {
        reply = "Le Programme Emploi Diplômé (PED) permet aux jeunes diplômés d'accéder à un premier contrat en entreprise avec une prise en charge partielle des indemnités de stage.";
      } else if (lower.includes('entretien')) {
        reply = "Lors de l'entretien : préparez une présentation claire de votre parcours en 2 minutes, documentez-vous sur l'entreprise, et montrez votre motivation à contribuer à leurs objectifs.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          time: 'Maintenant',
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[550px] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-blue/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white shadow-xs overflow-hidden">
              <img src="/assets/assistant-BnbvCQio.png" alt="FNE Assistant" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-foreground text-sm">FNE Assistant IA</h3>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-brand-blue font-medium">Coach professionnel disponible 24h/24</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.sender === 'ai' ? (
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-blue text-white shadow-xs">
                  <Bot className="h-4 w-4" />
                </div>
              ) : (
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-neutral-200 text-neutral-800 shadow-xs">
                  <User className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white rounded-tr-none'
                    : 'bg-surface-blue/50 text-foreground border border-border rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span>Le coach écrit une réponse...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="border-t border-border/60 bg-neutral-50/50 p-2 overflow-x-auto flex gap-1.5 no-scrollbar">
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendMessage(s)}
              className="shrink-0 rounded-full border border-border bg-white px-3 py-1 text-[11px] text-foreground hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'fr' ? 'Posez votre question au coach...' : 'Ask your coach a question...'}
            className="flex-1 rounded-full border border-border bg-neutral-50 px-4 py-2 text-xs text-foreground focus:border-brand-blue focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white shadow-xs hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
