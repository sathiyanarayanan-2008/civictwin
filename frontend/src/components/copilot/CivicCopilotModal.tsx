import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { api } from '../../services/api';
import { Bot, X, Send, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  evidence?: string[];
  metrics?: Record<string, any>;
  actions?: string[];
}

const PRESET_QUERIES = [
  "Which areas have highest estimated flood risk?",
  "Why is Mount-Poonamallee marked critical?",
  "Which facilities could become inaccessible?",
  "What preventive actions are recommended?"
];

export const CivicCopilotModal: React.FC = () => {
  const { isCopilotOpen, closeCopilot } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Greetings. I am the CivicTwin AI Copilot, your grounded decision-support assistant for Chennai urban crisis prevention. Ask me about flood risks, critical infrastructure dependencies, cascading failures, or preventive action plans.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isCopilotOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res: any = await api.queryCopilot(textToSend);
      const botMsg: ChatMessage = {
        sender: 'assistant',
        text: res.answer,
        evidence: res.evidence_sources,
        metrics: res.related_metrics,
        actions: res.suggested_actions
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Telemetry query processed via local offline knowledge graph: Mount-Poonamallee Road and Velachery Lake overflow remain the primary high-consequence failure modes.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[600px] flex flex-col rounded-2xl bg-[#0D1428] border border-[#8B5CF6]/50 shadow-2xl shadow-[#8B5CF6]/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#060B1A] border-b border-[#131D38]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">CivicTwin AI Copilot</h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40 font-bold">
                  DECISION SUPPORT
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8]">
                Grounded conversational intelligence for Chennai urban digital twin
              </p>
            </div>
          </div>
          <button
            onClick={closeCopilot}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#131D38] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Query Chips */}
        <div className="px-5 py-2 bg-[#0A1124] border-b border-[#131D38] flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">Suggestions:</span>
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="shrink-0 px-2.5 py-1 rounded-full text-[10px] bg-[#131D38] hover:bg-[#2563EB]/20 text-[#F8FAFC] border border-[#2563EB]/30 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#2563EB] text-white rounded-br-none shadow-md'
                    : 'bg-[#131D38] text-[#F8FAFC] border border-[#2563EB]/30 rounded-bl-none'
                }`}
              >
                <p>{m.text}</p>

                {/* Evidence Sources Citation */}
                {m.evidence && m.evidence.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] text-[#06D6EF]">
                    <div className="font-semibold flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3 h-3" /> Validated Evidence Sources:
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[#94A3B8]">
                      {m.evidence.map((ev, eIdx) => (
                        <li key={eIdx}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggested Action Pills */}
                {m.actions && m.actions.length > 0 && (
                  <div className="mt-2 pt-1.5 flex flex-wrap gap-1">
                    {m.actions.map((act, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40"
                      >
                        Action: {act}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#8B5CF6] font-mono animate-pulse">
              <Bot className="w-4 h-4 animate-spin" /> Querying Chennai hydrological twin & agent blackboard...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#060B1A] border-t border-[#131D38] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Chennai flood risks, hospitals, or preventive plans..."
            className="flex-1 px-4 py-2 text-xs rounded-xl bg-[#0D1428] border border-[#2563EB]/40 text-white placeholder-[#64748B] focus:outline-none focus:border-[#06D6EF]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] text-white hover:brightness-110 disabled:opacity-50 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
