import AllIcons from "@/components/icons";

type IconBadgeProps = {
  iconName: string;
  size?: number;
};

export default function IndustryIconBadge({ iconName, size = 18 }: IconBadgeProps) {
  const safeName = iconName.trim() as keyof typeof AllIcons;
  const IconComponent = AllIcons[safeName];

  return (
    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--primary)] text-t-primary">
      {IconComponent ? <IconComponent size={size} /> : <span className="text-[10px] font-semibold">?</span>}
    </div>
  );
}

