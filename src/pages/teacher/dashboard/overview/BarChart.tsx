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
let chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    { month: "July", desktop: 305, mobile: 200 },
    { month: "Augest ", desktop: 237, mobile: 120 },
    { month: "September", desktop: 73, mobile: 190 },
    { month: "October", desktop: 209, mobile: 130 },
    { month: "November", desktop: 214, mobile: 140 },
    { month: "December", desktop: 214, mobile: 140 },
];

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
    console.log(data);

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

    console.log(Array.from(set));

    if (map) chartData = Array.from(map.values());

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Earning by Course</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-96 w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}  className="opacity-25" />
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
