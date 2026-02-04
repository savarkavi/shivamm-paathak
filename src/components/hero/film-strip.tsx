import Image from "next/image";

interface FilmStripProps {
  images: string[] | undefined;
}

const filmColors = {
  base: "#9A5C39",
  dark: "#3B1F11",
  light: "#EAD0B5",
};

const FilmStrip = ({ images }: FilmStripProps) => {
  if (!images) return;

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(80, 45, 25, 0.9), rgba(140, 75, 40, 0.75) 20%, rgba(140, 75, 40, 0.75) 80%, rgba(80, 45, 25, 0.9))",
        borderColor: "rgba(40, 20, 10, 0.9)",
      }}
      className="relative flex h-full w-[100px] justify-between gap-1 p-1"
    >
      <div className="flex h-full flex-1 flex-col">
        {images.map((src, index) => (
          <div
            key={index}
            className="group relative h-full flex-1 shrink-0 overflow-hidden border-x-2"
            style={{ borderColor: filmColors.base }}
          >
            <Image
              src={src}
              alt={`Frame ${index}`}
              fill
              className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                filter:
                  "sepia(1) hue-rotate(-20deg) contrast(1.2) brightness(0.9)",
              }}
            />
            <span
              className="absolute right-2 bottom-1 font-mono text-[10px] font-bold"
              style={{ color: filmColors.dark }}
            >
              {index + 1}A
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmStrip;
