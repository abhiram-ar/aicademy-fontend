import { TrendingUp } from "lucide-react";
import { Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetUserCountQuery } from "./AdminOverviewApiSlice";

const chartData = [
    { signups: 3, period: "2024-12-01" },
    { signups: 2, period: "2024-12-02" },
    { signups: 0, period: "2024-12-03" },
    { signups: 5, period: "2024-12-04" },
    { signups: 1, period: "2024-12-05" },
    { signups: 2, period: "2024-12-06" },
    { signups: 4, period: "2024-12-07" },
    { signups: 0, period: "2024-12-08" },
    { signups: 6, period: "2024-12-09" },
    { signups: 1, period: "2024-12-10" },
    { signups: 1, period: "2024-12-11" },
    { signups: 0, period: "2024-12-12" },
    { signups: 3, period: "2024-12-13" },
    { signups: 2, period: "2024-12-14" },
    { signups: 1, period: "2024-12-15" },
    { signups: 5, period: "2024-12-16" },
    { signups: 3, period: "2024-12-17" },
    { signups: 0, period: "2024-12-18" },
    { signups: 1, period: "2024-12-19" },
    { signups: 7, period: "2024-12-20" },
];

const chartConfig = {
    desktop: {
        label: "user",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function NoOfUsersChart() {
    const { data } = useGetUserCountQuery({});

    // live data - user in production
    // let chartData;
    // if (data) {
    //     chartData = data.result;
    // }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Singups</CardTitle>
                <CardDescription>
                    {new Date(
                        Date.now() - 3 * 30 * 24 * 60 * 60 * 1000
                    ).toDateString()}{" "}
                    - {new Date(Date.now()).toDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {data && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-32 w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 10)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="signups"
                                type="natural"
                                stroke="var(--color-desktop)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Total users: {data && data.totalUsers}
                    <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    );
}
