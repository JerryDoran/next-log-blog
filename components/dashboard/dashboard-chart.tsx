'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Category, Post } from '@/generated/prisma/client';

const chartConfig = {
  views: {
    color: '#2563eb',
  },
} satisfies ChartConfig;

type ChartProps = {
  data: Post[];
};

export default function DashboardChart({ data }: ChartProps) {
  return (
    <Card>
      <CardHeader className='flex flex-col w-full'>
        <CardTitle className='text-4xl font-semibold'>Views</CardTitle>
        <CardDescription className='text-lg font-medium'>
          Trending posts by views
        </CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <Bar dataKey='views' fill='var(--color-views)' radius={4} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
