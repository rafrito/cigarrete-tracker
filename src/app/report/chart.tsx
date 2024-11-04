"use client"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Label } from "@/components/ui/label"

const chartConfig = {
    quantity: {
        label: "Quantity",
        color: "#2563eb",
    }
} satisfies ChartConfig

export function Report({ chartData }: { chartData: any }) {
    return (
        <div className="sm:p-4 p-2 flex flex-col gap-4 text-center border shadow-md rounded-lg">
            <Label className="md:text-lg font-bold ">
                Acompanhamento Diário
            </Label>
            <ChartContainer
                config={chartConfig}
            >
                <BarChart accessibilityLayer data={chartData}>
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="var(--color-quantity)" radius={6} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
