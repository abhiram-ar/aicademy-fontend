import { useGetRevenueAndProfitDataQuery } from "./AdminOverviewApiSlice";
import FilterRangeDropDown from "./FilterRangeDropDown";
import { useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
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
        color: "black",
    },
    profit: {
        label: "profit",
        color: "abcece",
    },
} satisfies ChartConfig;

const Saleschart = () => {
    const [filter, setFilter] = useState<"monthly" | "daily">("daily");
    const { data: query } = useGetRevenueAndProfitDataQuery({
        interval: filter,
    });
    console.log(query);

    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle>
                    Revenue and profit for last{" "}
                    {filter === "monthly" ? "6 months" : "28 days"}
                </CardTitle>
                <CardDescription>
                    <CardDescription>
                        from{" "}
                        {filter === "monthly"
                            ? new Date(
                                  Date.now() - 6 * 30 * 24 * 60 * 60 * 1000
                              ).toDateString()
                            : new Date(
                                  Date.now() - 1000 * 60 * 60 * 24 * 28
                              ).toDateString()}
                        - {new Date(Date.now()).toDateString()}
                    </CardDescription>
                </CardDescription>
                <div className="absolute right-14">
                    <FilterRangeDropDown setFilter={setFilter} />
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[28rem] w-full"
                >
                    <BarChart accessibilityLayer data={query?.data}>
                        <XAxis
                            dataKey="period"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value.slice(0, 10)}
                        />
                        <Bar
                            dataKey="revenue"
                            stackId="a"
                            fill="#292828"
                            radius={[0, 0, 4, 4]}
                            animationDuration={0}
                        />
                        <Bar
                            dataKey="profit"
                            stackId="a"
                            fill="#005a31"
                            radius={[4, 4, 0, 0]}
                            animationDuration={0}
                            animationEasing="ease-out"
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                            cursor={false}
                            defaultIndex={1}
                        />
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
