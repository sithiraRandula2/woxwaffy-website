import { imageProps } from '../utils/imageProps';
import { ToastReveal } from '../components/ToastReveal';
import React, { useRef } from "react";
import { ArrowRight, MoveDown, Play, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PRODUCTS, Product } from "../data/products";
import { RECIPES, Recipe } from "../data/recipes";
import { PageId } from "../components/Navbar";
import plainToast from "../../assets/story-plain-bread.webp";
import chocolateToast from "../../assets/story-chocolate-bread.webp";
import toastJarFusion from "../../assets/Waffy Chocolate Peanut Toast-Jar Fusion.webp";

export const HomePage: React.FC<{
  onNavigate: (p: PageId) => void;
  onSelectProduct: (p: Product) => void;
  onSelectRecipe: (r: Recipe) => void;
}> = ({ onNavigate, onSelectProduct, onSelectRecipe }) => {
  const story = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: story,
    offset: ["start start", "end end"],
  });
  const plainToastOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.76, 1],
    [1, 1, 0, 0],
  );
  const chocolateToastOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.76, 1],
    [0, 0, 1, 1],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1.03, 0.96],
  );
  const haloScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.75, 1.12, 0.9],
  );
  return (
    <div className="overflow-x-clip">
      <section className="relative lg:min-h-[calc(100svh-5rem)] flex items-center py-10 sm:py-12 lg:py-16 grain">
        <div className="absolute -top-32 right-[-10rem] w-[35rem] h-[35rem] rounded-full bg-[#f1d6ad]/55 blur-3xl" />
        <div className="page-shell grid lg:grid-cols-12 gap-10 items-center relative">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 z-10"
          >
            <p className="eyebrow mb-6">
              A joyful chocolate spread from Sri Lanka
            </p>
            <h1 className="display-title">
              Chocolate makes
              <br />
              <span className="text-[#df3038] italic font-normal">
                everything
              </span>{" "}
              better.
            </h1>
            <p className="body-large max-w-xl mt-7">
              A deliciously playful chocolate spread imagined for toast, waffles
              and the occasional straight-from-the-spoon moment.
            </p>
            {/* Product composition and origin details are pending confirmation. */}
            <div className="flex flex-wrap gap-3 mt-9">
              <button
                onClick={() => onNavigate("products")}
                className="button-primary"
              >
                Meet the spread <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="button-secondary"
              >
                <Play className="w-4 h-4" /> Our story
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-5 relative min-h-[340px] sm:min-h-[430px] lg:min-h-[460px] flex items-center justify-center"
          >
            <div className="absolute w-[86%] sm:max-lg:max-w-[400px] aspect-square rounded-full bg-[#f2d69f]" />
            <div className="absolute w-[68%] sm:max-lg:max-w-[316px] aspect-square rounded-full border border-white/80" />
            <img
              src="/assets/woxwaffy-chocolate-spread-jar.webp"
              {...imageProps('/assets/woxwaffy-chocolate-spread-jar.webp', '(min-width: 1024px) 360px, (min-width: 640px) 300px, 255px')}
              loading="eager"
              fetchPriority="high"
              alt="Woxwaffy chocolate spread jar"
              className="jar-drift relative z-10 max-h-[340px] sm:max-h-[400px] lg:max-h-[480px] max-w-full w-auto drop-shadow-[0_35px_40px_rgba(68,32,17,.25)]"
            />
            <div className="liquid-glass-card absolute bottom-5 left-0 rounded-2xl p-4 rotate-[-5deg]">
              <p className="font-serif text-xl">Spread happiness.</p>
              <p className="text-xs text-[#6e4c3e]">One spoon at a time.</p>
            </div>
          </motion.div>
        </div>
        <MoveDown className="hidden lg:block absolute bottom-6 left-1/2 w-5 h-5 text-[#6e4c3e] animate-bounce" />
      </section>

      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="page-shell text-center">
          <p className="eyebrow">The simple pleasure</p>
          <h2 className="section-title mt-5">
            Cocoa. Crunch.
            <br />A little happiness.
          </h2>
          <p className="body-large max-w-2xl mx-auto mt-7">
            Warm, familiar and made to turn everyday food into something worth
            pausing for. The final ingredient and allergen story will appear
            here once verified.
          </p>
        </div>
      </section>

      <section
        ref={story}
        className="relative bg-[#2b140d] text-[#fffaf2] grain"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,#713a22_0%,#2b140d_56%)]" />
        <ToastReveal reducedMotion={reducedMotion}/>
        <div className="page-shell relative hidden lg:grid lg:grid-cols-2">
          <div className="relative z-20">
            {[
              [
                "Chapter one · The reveal",
                <>
                  From quiet jar
                  <br />
                  to{" "}
                  <em className="text-[#e8b777] font-normal">
                    main character.
                  </em>
                </>,
                "One everyday jar, ready to turn an ordinary moment into something worth looking forward to.",
              ],
              [
                "Chapter two · The promise",
                <>
                  Chocolate joy.
                  <br />
                  <em className="text-[#e8b777] font-normal">
                    A playful crunch.
                  </em>
                </>,
                "Rich, generous and made for spreading. Final composition and ingredient language will be added after verification.",
              ],
              [
                "Chapter three · Your moment",
                <>
                  Mornings. Midnight spoons.
                  <br />
                  <em className="text-[#e8b777] font-normal">
                    Everything between.
                  </em>
                </>,
                "Spread it on something warm, drizzle it over a favourite, or make up a ritual entirely your own.",
              ],
            ].map(([label, title, copy]) => (
              <motion.div
                key={label as string}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ duration: 0.55 }}
                className="flex flex-col justify-center py-12 sm:py-16 lg:min-h-[100svh] lg:py-28 lg:pr-16"
              >
                <p className="text-[#e8b777] text-xs font-bold uppercase tracking-[.2em]">
                  {label}
                </p>
                <h2 className="section-title mt-6">{title}</h2>
                <p className="text-white/65 max-w-md mt-6 leading-7">{copy}</p>

              </motion.div>
            ))}
          </div>
          <div className="hidden lg:block lg:relative lg:w-auto">
            <div className="sticky top-20 h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden">
              <motion.div
                aria-hidden="true"
                style={reducedMotion ? undefined : { scale: haloScale }}
                className="absolute h-[32vw] max-h-[480px] w-[32vw] max-w-[480px] rounded-full bg-[#e8b777]/20 blur-2xl"
              />
              <motion.div
                style={reducedMotion ? undefined : { scale: imageScale }}
                className="relative z-10 aspect-square w-full max-w-[620px]"
              >
                <motion.img
                  style={{ opacity: reducedMotion ? 0 : plainToastOpacity }}
                  src={plainToast}
                  loading="lazy"
                  {...imageProps(plainToast, '(min-width: 1280px) 620px, 50vw')}
                  alt="Stack of plain bread slices before adding chocolate spread"
                  className="absolute inset-0 h-full w-full object-contain mix-blend-screen drop-shadow-[0_35px_50px_rgba(0,0,0,.5)]"
                />
                <motion.img
                  style={{ opacity: reducedMotion ? 1 : chocolateToastOpacity }}
                  src={chocolateToast}
                  loading="lazy"
                  {...imageProps(chocolateToast, '(min-width: 1280px) 620px, 50vw')}
                  alt="Stack of bread slices covered with chocolate spread"
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,.5)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-24 lg:pb-10 bg-[#fffaf2] text-center grain">
        <motion.div
          className="page-shell"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, once: true }}
        >
          <p className="eyebrow">The story continues</p>
          <h2 className="section-title mt-5">Meet the jars.</h2>
          <p className="body-large max-w-xl mx-auto mt-6">
            A growing collection of chocolate-spread ideas, presented as
            concepts until every product detail is confirmed.
          </p>
        </motion.div>
      </section>

      <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-28 bg-[#fffaf2]">
        <div className="page-shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-14">
            <div>
              <p className="eyebrow">The collection</p>
              <h2 className="section-title mt-4">Meet the jars.</h2>
            </div>
            {/* The lineup below is a design preview. Names, variants, sizes, prices and availability remain to be confirmed. */}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <motion.button
                whileHover={{ y: -6 }}
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="text-left rounded-[2rem] overflow-hidden border border-[#2b140d]/8 bg-[#f3dfbe]"
              >
                <div className="h-[18rem] sm:h-[22rem] lg:h-[26rem] flex items-center justify-center p-6 sm:p-8 relative">
                  <span className="placeholder-chip absolute top-6 left-6">
                    Preview details
                  </span>
                  <img
                    loading="lazy"
                    src={p.image}
                    {...imageProps(p.image, '(min-width: 1024px) 360px, (min-width: 768px) 42vw, calc(100vw - 80px)')}
                    alt={p.name}
                    className="max-h-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-7 border-t border-[#2b140d]/8">
                  <p className="text-xs uppercase tracking-widest text-[#b72a30]">
                    Concept product
                  </p>
                  <div className="flex justify-between gap-4 mt-2">
                    <h3 className="font-serif text-2xl">{p.name}</h3>
                    <ArrowRight className="shrink-0" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <button
            onClick={() => onNavigate("products")}
            className="button-secondary mt-8"
          >
            Explore product details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="page-shell">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="relative isolate overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-[#f8efe2] p-7 md:p-14 min-h-[460px] md:min-h-[600px]">
              <div className="relative z-10 w-[66%] sm:w-[62%] md:w-[48%] lg:w-[60%]">
                <p className="eyebrow">Made for the moment</p>
                <h2 className="section-title mt-5">
                  Toast it.
                  <br />
                  Drizzle it.
                  <br />
                  <em className="text-[#df3038] font-normal">Love it.</em>
                </h2>
              </div>
              <img
                loading="lazy"
                src={toastJarFusion}
                {...imageProps(toastJarFusion, '(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 768px) 72vw, 100vw')}
                alt="Waffy chocolate peanut toast and jar fusion"
                className="fusion-drift absolute z-20 bottom-[-7%] sm:bottom-[-9%] md:bottom-[-11%] lg:bottom-[-9%] right-[-18%] sm:right-[-13%] md:right-[-5%] lg:right-[-12%] w-[108%] sm:w-[94%] md:w-[72%] lg:w-[90%] max-w-none object-contain drop-shadow-xl pointer-events-none"
              />
            </div>
            <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative min-h-[460px] md:min-h-[600px] bg-[#ead4b6]">
              <img
                loading="lazy"
                src="/assets/lifestyle.webp"
                {...imageProps('/assets/lifestyle.webp', '(min-width: 1280px) 640px, (min-width: 1024px) 50vw, calc(100vw - 32px)')}
                alt="Woxwaffy serving inspiration"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 pt-28 bg-gradient-to-t from-[#2b140d]/90 to-transparent text-white">
                <p className="eyebrow !text-[#f4c987]">Recipe inspiration</p>
                <h3 className="font-serif text-3xl sm:text-4xl mt-2">
                  Small rituals, better days.
                </h3>
                <button
                  onClick={() => onSelectRecipe(RECIPES[0])}
                  className="mt-5 inline-flex items-center gap-2 font-bold"
                >
                  See recipes <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-28 bg-[#f1dfc8]">
        <div className="page-shell grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div>
            <p className="eyebrow">Our roots</p>
            <h2 className="section-title mt-5">
              A Sri Lankan idea with a world-sized appetite.
            </h2>
            <p className="body-large mt-7 max-w-xl">
              Woxwaffy’s verified founder, sourcing and manufacturing story will
              live here. Until then, this space intentionally avoids claims we
              cannot substantiate.
            </p>
            <button
              onClick={() => onNavigate("about")}
              className="button-secondary mt-8"
            >
              Discover our story
            </button>
          </div>
          <div className="aspect-square max-w-xl mx-auto rounded-full bg-[#df3038] flex items-center justify-center text-white text-center p-8 sm:p-12">
            <div>
              <Sparkles className="mx-auto mb-6" />
              <p className="font-serif text-4xl md:text-6xl leading-none">
                Made to spread
                <br />
                happiness.
              </p>
              <p className="mt-5 text-white">
                Brand promise · not a manufacturing claim
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-28 bg-[#fffaf2]">
        <div className="page-shell rounded-[2rem] md:rounded-[2.5rem] bg-[#df3038] text-white p-7 sm:p-10 md:p-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-white">
            Ready when the details are
          </p>
          <h2 className="section-title mt-5">
            Save room for something wonderful.
          </h2>
          <p className="max-w-xl mx-auto mt-5 text-white">
            Ordering, pricing and delivery will be enabled after the business
            information is confirmed.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="button-secondary mt-8"
          >
            Make an enquiry
          </button>
          {/* Product and commercial details shown here are preview content pending brand confirmation. */}
        </div>
      </section>
    </div>
  );
};
