import Link from "next/link";
import { CodeXmlIcon } from "lucide-react";
import Image from "next/image";
import LO from "@/photos/ChatGPT Image Aug 9, 2025, 02_51_11 PM.png"
export function Logo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const iconSize =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const textSize =
    size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
      aria-label="DevSpot Home"
    >
      <Image src={LO} width={40} height={40} alt="" className="rounded-full hover:ring-2" />
      {/* <CodeXmlIcon
        className={`${iconSize} text-primary group-hover:text-primary/90 transition-colors`}
      /> */}
      <span
        className={`${textSize} font-bold text-foreground group-hover:text-primary transition-colors`}
      >
        Codeaxe
      </span>
    </Link>
  );
}
