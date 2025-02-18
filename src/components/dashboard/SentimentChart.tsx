// "use client";

// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart";
// import { Bar, BarChart } from "recharts";

// interface SentimentItem {
//   sentiment: string;
//   _count: { sentiment: number };
// }

// interface SentimentChartProps {
//   data: SentimentItem[];
// }

// export default function SentimentChart({ data }: SentimentChartProps) {
//   // Transform the data to match Recharts format
//   const chartData = data.map((item) => ({
//     name: "item.sentiment",
//     value: 4,
//   }));

//   // Define chart configuration
//   const chartConfig = {
//     sentiment: {
//       label: "Sentiment Distribution",
//       colors: {
//         POSITIVE: "hsl(var(--chart-1))",
//         NEGATIVE: "hsl(var(--chart-2))",
//         NEUTRAL: "hsl(var(--chart-3))",
//       },
//     },
//   } satisfies ChartConfig;

//   return (
//     <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
//       <BarChart data={chartData}>
//         <Bar
//           dataKey="value"
//           fill={(entry) =>
//             entry.name === "POSITIVE"
//               ? chartConfig.sentiment.colors.POSITIVE
//               : entry.name === "NEGATIVE"
//               ? chartConfig.sentiment.colors.NEGATIVE
//               : chartConfig.sentiment.colors.NEUTRAL
//           }
//           radius={4}
//         />
//         <ChartTooltip content={<ChartTooltipContent />} />
//       </BarChart>
//     </ChartContainer>
//   );
// }
