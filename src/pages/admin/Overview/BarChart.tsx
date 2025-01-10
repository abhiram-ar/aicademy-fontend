import { useGetRevenueAndProfitDataQuery } from "./AdminOverviewApiSlice";
import FilterRangeDropDown from "./FilterRangeDropDown";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    revenue: {
        label: "revenue",
    },
    profit: {
        label: "profit",
    },
} satisfies ChartConfig;

const Saleschart = () => {
    const [filter, setFilter] = useState<"monthly" | "daily">("monthly");
    const { data: query } = useGetRevenueAndProfitDataQuery({
        interval: filter,
    });
    console.log(query);

    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle>Monthly Earning by Course</CardTitle>
                <CardDescription>
                    from{" "}
                    {new Date(
                        Date.now() - 6 * 30 * 24 * 60 * 60 * 1000
                    ).toDateString()}{" "}
                    - {new Date(Date.now()).toDateString()}
                </CardDescription>
                <div className="absolute right-14">
                    <FilterRangeDropDown setFilter={setFilter} />
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-96 w-full">
                    <BarChart accessibilityLayer data={query?.data}>
                        <CartesianGrid
                            vertical={false}
                            className="opacity-25"
                        />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 8)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {query && (
                            <>
                                <Bar
                                    dataKey="revenue"
                                    stackId="a"
                                    fill="#555"
                                    radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                    dataKey="profit"
                                    stackId="a"
                                    fill="#7ade80"
                                    radius={[5, 5, 0, 0]}
                                />
                            </>
                        )}
                        <ChartLegend
                            className="bg-gree"
                            content={<ChartLegendContent />}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default Saleschart;
