import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq-i18n";

/**
 * Native <details> accordion — answers reveal on tap/click without fragile height animations.
 * Works before and after React hydration (unlike Radix height animations on mobile).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-accordion w-full border-t border-border">
      {items.map((item, i) => (
        <details key={`${item.q}-${i}`} className="faq-accordion__item group border-b border-border">
          <summary className="faq-accordion__summary flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-serif text-lg text-ink transition-colors hover:text-gold">
            <span className="pr-2">{item.q}</span>
            <ChevronDown
              className="faq-accordion__chevron mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="faq-accordion__answer pb-5 text-base leading-relaxed text-muted-foreground">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
