import { imageProps } from '../utils/imageProps';
import React, { useLayoutEffect, useRef } from "react";

import { X, AlertCircle } from "lucide-react";
import { Product } from "../data/products";
export const ProductModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onInquire: (p: Product) => void;
}> = ({ product, onClose, onInquire }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    if (!product) return;
    const dialog = dialogRef.current!;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [product]);
  return <dialog
    ref={dialogRef}
    aria-labelledby="product-dialog-title"
    aria-describedby="product-dialog-description"
    className="product-dialog"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex="0"]'));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
  >
    {product && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="liquid-glass-card rounded-[1.5rem] sm:rounded-[2rem] max-w-4xl w-full max-h-[96svh] sm:max-h-[90vh] overflow-auto relative"
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 bg-white rounded-full p-3 shadow"
            aria-label="Close"
          >
            <X />
          </button>
          <div className="grid md:grid-cols-2">
            <div className="bg-[#f1dfc8] min-h-64 sm:min-h-80 md:min-h-96 flex items-center justify-center p-6 sm:p-10">
              <img
                src={product.image}
                {...imageProps(product.image, '(min-width: 768px) 360px, calc(100vw - 64px)')}
                alt={product.name}
                className="max-h-64 sm:max-h-80 lg:max-h-[420px] max-w-full object-contain drop-shadow-xl"
              />
            </div>
            <div className="liquid-glass-card p-6 sm:p-8 lg:p-12">
              <span className="placeholder-chip">Concept product</span>
              <h2 id="product-dialog-title" className="font-serif text-3xl sm:text-4xl leading-tight mt-5">
                {product.name}
              </h2>
              <p id="product-dialog-description" className="text-[#6e4c3e] mt-5 leading-7">
                {product.description}
              </p>
              <div className="liquid-glass-card mt-7 p-4 rounded-2xl flex gap-3 text-sm text-[#6e4c3e]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>
                  Variant, weight, ingredients, allergens, nutrition, price and
                  availability are placeholders pending confirmation.
                </p>
              </div>
              <button
                onClick={() => onInquire(product)}
                className="button-primary mt-7"
              >
                Ask about this product
              </button>
            </div>
          </div>
        </div>
    )}
  </dialog>;
};
