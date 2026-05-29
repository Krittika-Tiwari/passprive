interface Props {
  title: string
  className?: string
}

export function SectionHeader({ title, className = '' }: Props) {
  return (
    <div className={`px-4 md:px-6 ${className}`}>
      <h2 className="text-[17px] md:text-[19px] font-bold text-gray-900">{title}</h2>
    </div>
  )
}
