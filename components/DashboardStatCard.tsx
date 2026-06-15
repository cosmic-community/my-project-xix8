interface DashboardStatCardProps {
  label: string
  value: number | string
  icon: string
  accent?: string
}

export default function DashboardStatCard({ label, value, icon, accent = '#1e293b' }: DashboardStatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
          style={{ backgroundColor: `${accent}1a` }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}