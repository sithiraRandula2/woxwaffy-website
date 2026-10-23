import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, whatsappUrl } from "../data/business";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export const ContactPage: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-28">
      <div className="page-shell grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <p className="eyebrow">Let’s talk chocolate</p>
          <h1 className="display-title mt-5">Say hello.</h1>
          <p className="body-large mt-7 max-w-lg">
            Ask about products, retail or wholesale. Fill in your details to prepare
            a WhatsApp message, then review it and tap Send in WhatsApp.
          </p>
          <div className="mt-10 space-y-4">
            <a
              href="https://wa.me/94744108853"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-center hover:text-[#df3038]"
              aria-label={`WhatsApp ${BUSINESS.whatsappDisplay}`}
            >
              <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
              {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={`tel:${BUSINESS.telephoneHref}`}
              className="flex gap-3 items-center hover:text-[#df3038]"
              aria-label={`Telephone ${BUSINESS.telephone}`}
            >
              <Phone className="text-[#df3038]" />
              {BUSINESS.telephone}
            </a>
            <p className="flex gap-3 items-center min-w-0">
              <Mail className="text-[#df3038] shrink-0" />
              <span className="break-all">{BUSINESS.email}</span>
              {/* Confirm this email address before launch. */}
            </p>
            <p className="flex items-start gap-3 text-[#6e4c3e]">
              <MapPin className="w-5 h-5 shrink-0 text-[#df3038]" />
              <span>{BUSINESS.location}</span>
            </p>
            <div className="flex gap-3">
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Woxwaffy on Instagram"
                className="rounded-full border border-[#2b140d]/15 p-3 hover:bg-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Woxwaffy on Facebook"
                className="rounded-full border border-[#2b140d]/15 p-3 hover:bg-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-[#6e4c3e]">{BUSINESS.delivery}</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fields = new FormData(form);
            const name = String(fields.get('name') ?? '').trim();
            const contact = String(fields.get('contact') ?? '').trim();
            const message = String(fields.get('message') ?? '').trim();
            const url = whatsappUrl(`Hello Woxwaffy!\n\nName: ${name}\nEmail or phone: ${contact}\n\nMessage:\n${message}`);
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
          className="liquid-glass-card rounded-[2rem] p-5 sm:p-7 lg:p-10"
        >
          <div className="grid gap-5">
            <label className="text-sm font-bold">
              Name
              <input
                required
                name="name"
                autoComplete="name"
                className="mt-2 w-full rounded-xl bg-[#fffaf2] border border-[#2b140d]/12 p-4 font-normal"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-bold">
              Email or phone
              <input
                required
                className="mt-2 w-full rounded-xl bg-[#fffaf2] border border-[#2b140d]/12 p-4 font-normal"
                name="contact"
                autoComplete="off"
                placeholder="How should we reach you?"
              />
            </label>
            <label className="text-sm font-bold">
              Message
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full rounded-xl bg-[#fffaf2] border border-[#2b140d]/12 p-4 font-normal resize-none"
                placeholder="Tell us what you would like to know"
              />
            </label>
            {/* TODO: Send preview enquiry — implement a database-backed enquiry submission in the future. */}
            <button type="submit" className="liquid-glass-green inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white transition">Continue in WhatsApp</button>
          </div>
        </form>
      </div>
    </section>
  );
};
