import { Inconsolata, Allison } from "next/font/google";

export const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-inconsolata",
});

export const allison = Allison({
  subsets: ["latin"],
  weight: ["400"],
});
