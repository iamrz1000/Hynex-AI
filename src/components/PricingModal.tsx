import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  Zap,
  Shield,
  Layers,
  Crown,
  CreditCard,
} from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual' | 'Tally Special' | 'Top Up'>('Monthly');

  if (!isOpen) return null;

  const features = [
    'Unlock every frontier AI model (GPT 6.1, Claude Opus 4.5, Gemini 3.5)',
    'Ultra-fast priority reasoning & infinite standard conversations',
    'Full Document Studio exports (Assignments, DOCX, PPTX, PDF, Excel)',
    'Professional Nano Banana 2.1 photo & 4K Veo 2 cinematic video generation',
    '30+ Cloud Connectors & Model Context Protocol (MCP) servers',
    'Higher memory retention, custom system instructions & priority support',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#121214] text-zinc-100 rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Crown className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">HYNEX AI pricing</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Plan Tabs */}
        <div className="p-3 bg-zinc-900/60 border-b border-white/5 flex items-center justify-center gap-1">
          {(['Monthly', 'Annual', 'Tally Special', 'Top Up'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setBillingCycle(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === tab
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pricing Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Main Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/30 to-zinc-900/90 border border-purple-500/30 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Most Popular
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Unlock every model</h3>
                <p className="text-xs text-zinc-400">Everything you need for intelligence and creation</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-2xl font-black text-white">
                    {billingCycle === 'Annual' ? '₹849' : billingCycle === 'Tally Special' ? '₹1,499' : billingCycle === 'Top Up' ? '₹299' : '₹1,061'}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {billingCycle === 'Top Up' ? '/credits' : '/month'}
                  </span>
                </div>
                {billingCycle === 'Annual' && (
                  <span className="text-[10px] text-emerald-400 font-semibold block">Save 20% yearly</span>
                )}
              </div>
            </div>

            {/* Feature List */}
            <div className="pt-2 border-t border-white/10 space-y-2.5">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={() => {
                if (onSelectPlan) onSelectPlan(billingCycle);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Get Started with Pro</span>
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 text-center">
            Taxes may apply. Cancel anytime from your account settings.
          </p>
        </div>
      </div>
    </div>
  );
};
