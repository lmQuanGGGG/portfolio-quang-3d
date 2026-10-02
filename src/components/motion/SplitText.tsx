"use client";

type SplitTextProps = {
  text: string;
  mode: "chars" | "words" | "lines";
  className?: string;
  pieceClassName?: string;
};

export default function SplitText({ text, mode, className = "", pieceClassName = "" }: SplitTextProps) {
  const pieces = mode === "chars" ? Array.from(text) : mode === "words" ? text.split(/\s+/) : text.split("\n");

  return (
    <span className={`split-text ${className}`} aria-label={text}>
      {pieces.map((piece, index) => (
        <span className={`split-piece ${pieceClassName}`} aria-hidden="true" key={`${index}-${piece}`}>
          {piece === " " ? "\u00a0" : piece}{mode === "words" && index < pieces.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  );
}
