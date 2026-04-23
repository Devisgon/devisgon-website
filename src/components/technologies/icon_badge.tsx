import AllIcons from "@/components/icons";

type TechnologyIconBadgeProps = {
  iconName: string;
  size?: number;
};

export default function TechnologyIconBadge({ iconName, size = 18 }: TechnologyIconBadgeProps) {
  const safeName = iconName.trim() as keyof typeof AllIcons;
  const IconComponent = AllIcons[safeName];

  return (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-btn-primary/15 text-btn-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
      {IconComponent ? <IconComponent size={size} /> : <span className="text-[10px] font-semibold">?</span>}
    </div>
  );
}
