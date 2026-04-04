import Image from "next/image";
import { ITeamMember } from "@/types";
import { Facebook, Whatsapp, Linkedin } from "../icons";

export default function TeamMemberCard({
  teamMember,
}: {
  teamMember: ITeamMember;
}) {
  const { image, name, designation, facebook, whatsapp, linkedin } =
    teamMember;

  return (
    <article className="group relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-300 hover:border-purple-300/40">
      
      {/* Image */}
      <div className="relative m-3 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Info */}
      <div className="px-4 pb-5 pt-2">
        <h3 className="text-white text-xl font-bold tracking-tight">
          {name}
        </h3>
        <p className="text-purple-200 text-sm font-medium mt-0.5">
          {designation}
        </p>
      </div>

      {/* Social */}
      <div className="opacity-0 absolute bottom-20 left-0 right-0 px-4 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-transform duration-300">
        <div className="flex gap-5">
          
          <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook aria-hidden />
          </a>

          <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Whatsapp aria-hidden />
          </a>

          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin aria-hidden />
          </a>

        </div>
      </div>
    </article>
  );
}