export default function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Icon className="h-4 w-4 text-secondary" />
        <span>{label}</span>
      </div>
      <p className="text-white/80 pl-6">{value}</p>
    </div>
  );
}