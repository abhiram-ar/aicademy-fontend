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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetEarningsByMonthQuery } from "./OverviewPageApiSlice";
import { getRandomColor } from "@/utils/randomColorGenerator";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const Saleschart = () => {
    const { data } = useGetEarningsByMonthQuery({ months: 6 });
    let chartData;
    const map = new Map();
    const set = new Set();
    if (data) {
        for (const item of data.result) {
            if (map.has(item.time)) {
                const existingObj = map.get(item.time);
                existingObj[item.courseName] = item.revenue;
                map.set(item.time, existingObj);
            } else {
                map.set(item.time, {
                    time: item.time,
                    [item.courseName]: item.revenue,
                });
            }
        }
        for (const item of data.result) {
            if (!set.has(item.courseName)) {
                set.add(item.courseName);
            }
        }
    }

    if (map) chartData = Array.from(map.values());

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Earning by Course</CardTitle>
                <CardDescription>
                    from{" "}
                    {new Date(
                        Date.now() - 6 * 30 * 24 * 60 * 60 * 1000
                    ).toDateString()}{" "}
                    - {new Date(Date.now()).toDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-96 w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid
                            vertical={false}
                            className="opacity-25"
                        />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 8)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {data &&
                            set &&
                            Array.from(set).map((value) => (
                                <Bar
                                    key={value as string}
                                    dataKey={value as string}
                                    stackId="a"
                                    fill={getRandomColor()}
                                    radius={[0, 0, 5, 5]}
                                />
                            ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default Saleschart;
