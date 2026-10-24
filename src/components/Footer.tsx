import React from 'react';
import { ArrowUpRight, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { WoxwaffyLogo } from './WoxwaffyLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PageId } from './Navbar';
import { navigateLink } from '../utils/navigation';
import { BUSINESS, whatsappUrl } from '../data/business';

export const Footer: React.FC<{onNavigate:(p:PageId)=>void}> = ({onNavigate}) => <footer className="bg-[#2b140d] text-[#fffaf2] pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))]"><div className="page-shell">
  <div className="grid sm:grid-cols-2 lg:grid-cols-[minmax(0,320px)_minmax(0,480px)] lg:justify-between gap-6 pb-6 lg:gap-10">
    <div className="min-w-0"><WoxwaffyLogo size="lg"/><p className="text-white/75 max-w-xl lg:max-w-[320px] mt-4 text-sm leading-6">A joyful Sri Lankan chocolate spread brand in development. Final product and business information will be published after verification.</p></div>
    <div className="min-w-0 sm:justify-self-end lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4 lg:content-start"><p className="text-xs uppercase tracking-widest text-[#e8b777] mb-3 lg:mb-0 lg:col-span-2">Connect</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-2 lg:mb-0 lg:gap-x-8 lg:col-span-2"><a href={whatsappUrl('Hello Woxwaffy!')} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${BUSINESS.whatsappDisplay}`} className="flex items-center gap-2 text-sm text-white/75 hover:text-white"><WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366]"/>{BUSINESS.whatsappDisplay}</a>
      <a href={`tel:${BUSINESS.telephoneHref}`} aria-label={`Telephone ${BUSINESS.telephone}`} className="flex items-center gap-2 text-sm text-white/75 hover:text-white"><Phone className="w-4 h-4 shrink-0 text-[#e8b777]"/>{BUSINESS.telephone}</a></div>
      <p className="flex items-start gap-2 text-sm text-white/75 mb-3 lg:mb-0 lg:col-span-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#e8b777]"/><span>{BUSINESS.location}</span></p>
      {/* Delivery areas and timing to be confirmed. */}
      <div className="flex items-center gap-5 mt-3 min-h-11 lg:mt-0 lg:col-span-2">
        <button onClick={()=>onNavigate('contact')} className="inline-flex items-center gap-1 text-sm font-bold">Contact <ArrowUpRight className="w-4 h-4"/></button>
        <div className="flex items-center gap-2">
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Woxwaffy on Instagram" className="inline-flex items-center justify-center rounded-full border border-white/15 p-3 text-white/80 hover:bg-white/10 hover:text-white"><Instagram className="w-4 h-4"/></a>
          <a href={BUSINESS.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Woxwaffy on Facebook" className="inline-flex items-center justify-center rounded-full border border-white/15 p-3 text-white/80 hover:bg-white/10 hover:text-white"><Facebook className="w-4 h-4"/></a>
        </div>
      </div>
    </div>
  </div>
  <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/70"><p>© {new Date().getFullYear()} Woxwaffy. Brand details pending confirmation.</p><a href="/privacy/" onClick={event => navigateLink(event, () => onNavigate('privacy'))} className="self-start sm:self-auto min-h-11 hover:text-white">Privacy</a></div>
</div></footer>;
