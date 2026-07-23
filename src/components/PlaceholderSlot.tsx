import { cn } from "@/lib/utils";

interface PlaceholderSlotProps {
  /** Real, future-facing description of what will occupy this slot. */
  alt: string;
  /** CSS aspect-ratio value, e.g. "16 / 10". Must be inline style, not a
   *  Tailwind class — Tailwind can't discover a class built from a runtime
   *  template string. */
  aspect: string;
  slotName: string;
  dims: string;
  className?: string;
}

export default function PlaceholderSlot({
  alt,
  aspect,
  slotName,
  dims,
  className,
}: PlaceholderSlotProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: aspect }}
      className={cn(
        "flex items-center justify-center border border-dashed border-[#ccc] bg-[#fafafa] px-4 text-center",
        className
      )}
    >
      <span aria-hidden="true" className="text-[11px] tracking-wide text-[#aaa]">
        {slotName} — {dims}
      </span>
    </div>
  );
}
