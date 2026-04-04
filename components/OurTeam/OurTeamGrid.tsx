import { ITeamMember } from "@/types";
import TeamMemberCard from "./TeamMemberCard";

export default function OurTeamGrid({
  teamMembers,
}: {
  teamMembers: ITeamMember[];
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {teamMembers.map((teamMember) => (
        <TeamMemberCard
          key={teamMember.name}
          teamMember={teamMember}
        />
      ))}
    </section>
  );
}
