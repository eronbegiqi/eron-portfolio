import Image from "next/image";
import PlaceholderSlot from "./PlaceholderSlot";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Resolved server-side via imageExists() and passed down as a plain prop —
   *  this component never touches fs itself, so it stays safe to use from
   *  Client Components. */
  exists: boolean;
  width: number;
  height: number;
  sizes: string;
  /** CSS aspect-ratio value, e.g. "16 / 10". */
  aspect: string;
  dims: string;
  slotName: string;
  priority?: boolean;
  className?: string;
}

export default function ProjectImage({
  src,
  alt,
  exists,
  width,
  height,
  sizes,
  aspect,
  dims,
  slotName,
  priority,
  className,
}: ProjectImageProps) {
  if (!exists) {
    return (
      <PlaceholderSlot
        alt={alt}
        aspect={aspect}
        slotName={slotName}
        dims={dims}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ width: "100%", height: "auto", aspectRatio: aspect }}
    />
  );
}
