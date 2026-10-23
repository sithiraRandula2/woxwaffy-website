import React from 'react';
import { PageId } from '../components/Navbar';
import { BUSINESS } from '../data/business';

export const PrivacyPage: React.FC<{ onNavigate: (p: PageId) => void }> = ({ onNavigate }) => (
  <article className="py-20 md:py-28">
    <div className="page-shell max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="section-title mt-5">Privacy, in plain language.</h1>
      <div className="mt-10 space-y-9 text-[#6e4c3e] leading-7">
        <section>
          <h2 className="font-serif text-2xl text-[#2b140d] mb-3">Who we are</h2>
          <p>Woxwaffy is based at {BUSINESS.location}. This page explains the website’s current enquiry process.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-[#2b140d] mb-3">Enquiries through WhatsApp</h2>
          <p>The contact form uses your name, email address or telephone number, and message to prepare a WhatsApp enquiry. Selecting Continue in WhatsApp passes these details to WhatsApp through a prefilled message link. Review the message and tap Send in WhatsApp to deliver it to Woxwaffy. The website cannot send it automatically.</p>
          <p className="mt-3">The website does not submit these fields to an enquiry server or save them in an application database. If you send the message, Woxwaffy receives the information through WhatsApp and uses it to respond to your enquiry.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-[#2b140d] mb-3">Third-party services</h2>
          <p>WhatsApp processes information under its own privacy policy. Links to Instagram and Facebook also take you to services with their own privacy policies. The site loads fonts from Google Fonts; font requests may share technical information such as your IP address and browser details with Google.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-[#2b140d] mb-3">Cookies, analytics, and hosting</h2>
          <p>The website code currently includes no analytics integration or tracking cookies. The hosting provider has not yet been finalized. Hosting providers may process technical request logs; the relevant provider and handling details will be added when hosting is selected.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-[#2b140d] mb-3">Future changes</h2>
          <p>If we introduce a database-backed form, ordering, or analytics, this policy will be updated to describe the information collected, purposes, service providers, retention periods, and applicable rights.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-[#2b140d] mb-3">Privacy enquiries</h2>
          <p>For questions about your information, contact Woxwaffy by telephone or WhatsApp at {BUSINESS.whatsappDisplay}.</p>
        </section>
      </div>
      <button onClick={() => onNavigate('contact')} className="button-secondary mt-10">Contact page</button>
    </div>
  </article>
);
