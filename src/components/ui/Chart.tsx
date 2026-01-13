import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Sector,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import { AxisDomain } from "recharts/types/util/types"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Chart Context

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    color?: string
    icon?: React.ComponentType
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

// Chart Container

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactElement
  }
>(({ config, children, className, ...props }, ref) => {
  const chartConfig = React.useMemo(() => ({ config }), [config])

  return (
    <ChartContext.Provider value={chartConfig}>
      <div
        ref={ref}
        className={cn(
          "w-full h-[250px] flex flex-col justify-between lg:h-[400px]",
          className
        )}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

// Chart Tooltip

const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Card> & TooltipProps<any, any> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    formatter?: (value: number, name: string, item: any) => React.ReactNode
    indicator?: "line" | "dot" | "dashed"
  }
>(({
  active,
  payload,
  label,
  className,
  hideLabel = false,
  hideIndicator = false,
  formatter,
  indicator = "dot",
  ...props
}, ref) => {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <Card ref={ref} className={cn("w-56 p-2 text-sm shadow-lg border", className)} {...props}>
      {!hideLabel && label && (
        <div className="p-1 font-medium">{label}</div>
      )}
      <div className="p-1 space-y-1">
        {payload.map((item, index) => {
          const name = item.name as string
          const itemConfig = config[name]
          const color = item.color || item.payload.fill || itemConfig?.color

          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!hideIndicator && (
                  <span
                    className={cn("w-2.5 h-2.5 shrink-0", {
                      "rounded-full": indicator === "dot",
                      "w-1": indicator === "line",
                    })}
                    style={{ backgroundColor: color }}
                  />
                )}
                <p className="text-muted-foreground">{itemConfig?.label || name}</p>
              </div>
              <p className="font-medium text-right">
                {formatter ? formatter(item.value, name, item) : item.value}
              </p>
            </div>
          )
        })}
      </div>
    </Card>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

// Chart Legend

const ChartLegend = ({ ...props }) => (
  <div className="flex items-center justify-center gap-4 mt-4" {...props} />
)

const ChartLegendItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    name: string
  }
>(({ className, name, ...props }, ref) => {
  const { config } = useChart()
  const itemConfig = config[name]
  const color = itemConfig?.color

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 cursor-pointer text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{itemConfig?.label || name}</span>
    </div>
  )
})
ChartLegendItem.displayName = "ChartLegendItem"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  // Re-exporting recharts components for convenience
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
}

export type { AxisDomain }