import React from "react";
import { ArrowRight, MapPin, Heart, Lightbulb } from "lucide-react";
import { PageId } from "../components/Navbar";
export const AboutPage: React.FC<{ onNavigate: (p: PageId) => void }> = ({
  onNavigate,
}) => (
  <div>
    <section className="py-12 sm:py-16 lg:py-28">
      <div className="page-shell grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <p className="eyebrow">The story, honestly told</p>
          <h1 className="display-title mt-5">
            Born from a<br />
            <em className="text-[#df3038] font-normal">simple joy.</em>
          </h1>
          <p className="body-large mt-7">
            Woxwaffy is being shaped as a Sri Lankan chocolate spread brand with
            a playful spirit and global ambition. Founder history, dates,
            sourcing and manufacturing details will be added only after
            verification.
          </p>
        </div>
        <div className="rounded-full aspect-square w-full max-w-xl mx-auto bg-[#df3038] text-white flex items-center justify-center p-8 sm:p-12 text-center">
          <p className="font-serif text-4xl md:text-6xl leading-none">
            Spread
            <br />
            happiness.
          </p>
        </div>
      </div>
    </section>
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="page-shell">
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            [
              Lightbulb,
              "The idea",
              "Turn an everyday spread into a bright, memorable ritual.",
            ],
            [Heart, "The feeling", "Warm, generous and never too serious."],
            [
              MapPin,
              "The roots",
              "Sri Lankan identity; exact production and sourcing claims to be confirmed.",
            ],
          ].map(([Icon, t, d]) => (
            <div key={t as string} className="rounded-[2rem] p-6 sm:p-8 bg-[#F5E7D5] border border-[rgba(43,20,13,0.12)] shadow-[0_12px_32px_rgba(72,35,18,0.12)]">
              <Icon className="text-[#df3038]" />
              <h2 className="font-serif text-3xl mt-5 lg:mt-8 text-[#df3038]">{t as string}</h2>
              <p className="text-[#6e4c3e] mt-4 leading-7">{d as string}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-12 sm:py-16 lg:py-28 bg-[#f1dfc8]">
      <div className="page-shell max-w-3xl text-center">
        <p className="eyebrow">Our standard</p>
        <h2 className="section-title mt-5">Specific beats spectacular.</h2>
        <p className="body-large mt-7">
          When production facts are ready, this page will explain who makes
          Woxwaffy, where it is made, how ingredients are selected and what
          packaging claims can be substantiated.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="button-primary mt-8"
        >
          Talk to the team <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  </div>
);
