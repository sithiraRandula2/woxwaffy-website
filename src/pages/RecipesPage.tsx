import { imageProps } from '../utils/imageProps';
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { RECIPES, Recipe } from "../data/recipes";
export const RecipesPage: React.FC<{
  selectedRecipe: Recipe | null;
  onSelectRecipe: (r: Recipe | null) => void;
}> = ({ selectedRecipe, onSelectRecipe }) => {
  const [active, setActive] = useState<Recipe | null>(selectedRecipe);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastRecipeId = useRef<string | null>(null);
  const focusAfterChange = useRef(false);
  useEffect(() => {
    if (!focusAfterChange.current) return;
    if (active) titleRef.current?.focus();
    else document.querySelector<HTMLButtonElement>(`[data-recipe-id="${lastRecipeId.current}"]`)?.focus();
    focusAfterChange.current = false;
  }, [active]);
  const choose = (r: Recipe | null) => {
    if (r) lastRecipeId.current = r.id;
    focusAfterChange.current = true;
    setActive(r);
    onSelectRecipe(r);
  };
  if (active)
    return (
      <article className="py-10 md:py-16">
        <div className="page-shell max-w-5xl">
          <button
            onClick={() => choose(null)}
            className="button-secondary mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All recipes
          </button>
          <div className="grid lg:grid-cols-2 rounded-[2rem] md:rounded-[2.5rem] bg-white overflow-hidden border border-[#2b140d]/8">
            <div className="bg-[#f1dfc8] p-6 sm:p-8 md:p-10 min-h-72 sm:min-h-96 flex items-center justify-center">
              <img
                src={active.image}
                {...imageProps(active.image, '(min-width: 1024px) 440px, calc(100vw - 80px)')}
                alt={active.title}
                className="max-h-96 object-contain drop-shadow-xl"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-12">
              <span className="placeholder-chip">Serving inspiration</span>
              <h1 ref={titleRef} tabIndex={-1} className="font-serif text-4xl md:text-5xl leading-tight mt-5">
                {active.title}
              </h1>
              <p className="text-[#6e4c3e] mt-5 leading-7">
                {active.description}
              </p>
              <p className="inline-flex items-center gap-2 mt-5 text-sm">
                <Clock className="w-4 h-4" />
                {active.prepTime} prep · {active.cookTime} cook
              </p>
              <h2 className="font-serif text-2xl mt-8">Ingredients</h2>
              <ul className="mt-3 space-y-2 text-sm text-[#6e4c3e]">
                {active.ingredients.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="font-serif text-3xl">Method</h2>
            <ol className="grid md:grid-cols-2 gap-4 mt-5">
              {active.instructions.map((x, i) => (
                <li key={x} className="liquid-glass-card rounded-2xl p-6 text-[#6e4c3e]">
                  <strong className="text-[#df3038]">
                    {String(i + 1).padStart(2, "0")}
                  </strong>
                  <p className="mt-3">{x}</p>
                </li>
              ))}
            </ol>
            <p className="text-xs text-[#6e4c3e] mt-6">
              Recipe content is serving inspiration and should be reviewed
              alongside the final product’s verified allergen and storage
              guidance.
            </p>
          </div>
        </div>
      </article>
    );
  const bento = [
    "md:col-span-6 md:row-span-4 lg:col-span-7",
    "md:col-span-3 md:row-span-2 lg:col-span-5",
    "md:col-span-3 md:row-span-2 lg:col-span-5",
    "md:col-span-3 md:row-span-3 lg:col-span-4",
    "md:col-span-3 md:row-span-3 lg:col-span-4",
    "md:col-span-3 md:row-span-3 lg:col-span-4",
    "md:col-span-6 md:row-span-3 lg:col-span-12",
  ];
  return (
    <div>
      <section className="py-12 sm:py-16 lg:py-28 text-center">
        <div className="page-shell">
          <p className="eyebrow">Serving inspiration</p>
          <h1 className="display-title mt-5">
            Make everyday
            <br />
            <em className="text-[#df3038] font-normal">delicious.</em>
          </h1>
          <p className="body-large max-w-2xl mx-auto mt-7">
            Simple ideas designed around warm bread, crisp waffles and small
            celebrations.
          </p>
        </div>
      </section>
      <section className="pb-16 lg:pb-28">
        <div className="page-shell grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 md:auto-rows-[7rem] lg:auto-rows-[11rem] grid-flow-dense gap-5">
          {RECIPES.map((r, i) => (
            <button
              key={r.id}
              data-recipe-id={r.id}
              onClick={() => choose(r)}
              className={`group relative min-h-80 text-left rounded-[2rem] overflow-hidden bg-[#f1dfc8] border border-[#2b140d]/8 shadow-[0_16px_50px_rgba(73,37,20,.07)] ${bento[i]}`}
            >
              <img
                loading="lazy"
                src={r.image}
                {...imageProps(r.image, i === 6 ? '(min-width: 1280px) 1280px, calc(100vw - 32px)' : i === 0 ? '(min-width: 1280px) 740px, (min-width: 1024px) 58vw, calc(100vw - 32px)' : '(min-width: 1280px) 540px, (min-width: 768px) 50vw, calc(100vw - 32px)')}
                alt={r.title}
                className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-[1.035] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b140d]/95 via-[#2b140d]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#f4c987]">
                  {r.category} · {r.prepTime}
                </p>
                <h2
                  className={`font-serif mt-2 leading-tight ${i === 0 || i === 6 ? "text-3xl md:text-4xl" : "text-2xl"}`}
                >
                  {r.title}
                </h2>
                <span className="inline-block mt-3 text-xs font-bold lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-focus-visible:opacity-100 lg:group-focus-visible:translate-y-0 transition-all">
                  Open recipe →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
