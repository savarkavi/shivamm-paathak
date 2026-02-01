import { allison } from "@/fonts";
import { Globe } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-gray-500 px-4 py-3">
      <div className="flex flex-1/3 items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Globe className="size-4" />
          <span>IN / DEL</span>
        </div>
        <div>TC 16:36:45</div>
      </div>
      <p className={`${allison.className} flex-1/3 text-center text-4xl`}>
        Shivamm Paathak
      </p>
      <div className="flex flex-1/3 items-center justify-end gap-3">
        <p>Menu Dial</p>
        <div className="relative h-6 w-6">
          <Image
            src="/menu-dial-icon.png"
            alt="Icon created by Juicy fish solid"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
