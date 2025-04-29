import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, AlertTriangle, AlertCircle } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import LineChart from "@/components/admin/seo/LineChart";

interface SEOMetrics {
  overallScore: number;
  keywordUsage: number;
  readability: number;
  technicalSEO: number;
}

const getScoreColorClass = (score: number) => {
  if (score > 80) return "bg-emerald-500";
  if (score > 50) return "bg-amber-500";
  return "bg-destructive";
};

const MetricsOverview = ({ seoMetrics }: { seoMetrics: SEOMetrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Keyword Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{Math.round(seoMetrics.keywordUsage)}%</div>
          <div className="mt-4">
            <Progress
              value={seoMetrics.keywordUsage}
              className="h-2"
              indicatorClassName={getScoreColorClass(seoMetrics.keywordUsage)}
            />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Target keywords are used effectively.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Readability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{Math.round(seoMetrics.readability)}%</div>
          <div className="mt-4">
            <Progress
              value={seoMetrics.readability}
              className="h-2"
              indicatorClassName={getScoreColorClass(seoMetrics.readability)}
            />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Content is easy to read and understand.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Technical SEO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{Math.round(seoMetrics.technicalSEO)}%</div>
          <div className="mt-4">
            <Progress
              value={seoMetrics.technicalSEO}
              className="h-2"
              indicatorClassName={getScoreColorClass(seoMetrics.technicalSEO)}
            />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Technical aspects are well optimized.
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold flex items-center gap-2">
            {seoMetrics.overallScore > 80 ? (
              <Check className="h-6 w-6 text-emerald-500" />
            ) : seoMetrics.overallScore > 50 ? (
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-destructive" />
            )}
            {Math.round(seoMetrics.overallScore)}
          </div>
          <div className="mt-4">
            <Progress
              value={seoMetrics.overallScore}
              className="h-2"
              indicatorClassName={getScoreColorClass(seoMetrics.overallScore)}
            />
          </div>
          <div className="mt-3">
            <ChartContainer config={{ score: seoMetrics.overallScore }} className="h-[120px]">
              <LineChart />
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
