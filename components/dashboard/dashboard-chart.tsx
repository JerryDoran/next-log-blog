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
  categories: Category[];
};

export default function DashboardChart({ data, categories }: ChartProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
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
    </div>
  );
}
