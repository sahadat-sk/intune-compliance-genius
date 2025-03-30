
import { 
  Shield, 
  Laptop, 
  AlertCircle, 
  BarChart4, 
  RefreshCw, 
  MousePointerClick 
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ComplianceChart } from "@/components/dashboard/ComplianceChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { PolicyTable } from "@/components/dashboard/PolicyTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardSummary, insights, policies } from "@/data/mockData";
import { toast } from "sonner";

const Index = () => {
  // Handler for the refresh button
  const handleRefresh = () => {
    toast.success("Dashboard refreshed", {
      description: "Data has been updated to the latest version",
    });
  };

  // Get top non-compliant policies (limited to 3)
  const topPolicies = policies.sort((a, b) => b.affectedDevices - a.affectedDevices).slice(0, 3);

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Intune Compliance Dashboard</h1>
            <p className="text-gray-500">AI-driven insights for your device fleet</p>
          </div>
          <Button onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Devices" 
            value={dashboardSummary.deviceStats.total} 
            icon={<Laptop size={20} />} 
          />
          <StatCard 
            title="Compliance Rate" 
            value={`${dashboardSummary.complianceRate}%`} 
            icon={<Shield size={20} />} 
            trend={{value: 5, isPositive: true}}
          />
          <StatCard 
            title="Non-Compliant Devices" 
            value={dashboardSummary.deviceStats.nonCompliant} 
            icon={<AlertCircle size={20} />} 
          />
          <StatCard 
            title="Critical Alerts" 
            value={dashboardSummary.criticalAlerts} 
            icon={<BarChart4 size={20} />} 
          />
        </div>

        {/* Charts and Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Compliance Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Device compliance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceChart data={dashboardSummary.deviceStats} />
              <div className="flex justify-center mt-4 space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#0AB727] rounded-full mr-2"></div>
                  <span>Compliant ({dashboardSummary.deviceStats.compliant})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#D13438] rounded-full mr-2"></div>
                  <span>Non-Compliant ({dashboardSummary.deviceStats.nonCompliant})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#8A8886] rounded-full mr-2"></div>
                  <span>Unknown ({dashboardSummary.deviceStats.unknown})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Actionable recommendations based on current data</CardDescription>
              </div>
              <MousePointerClick className="h-5 w-5 text-dashboard-purple" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.slice(0, 3).map((insight) => (
                  <InsightCard
                    key={insight.id}
                    title={insight.title}
                    description={insight.description}
                    deviceCount={insight.deviceCount}
                    recommendedAction={insight.recommendedAction}
                    actionType={insight.actionType}
                    severity={insight.severity}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policies Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Non-Compliant Policies</CardTitle>
                <CardDescription>Policies with the highest number of affected devices</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success("Batch update initiated", {
                  description: "Updates are being pushed to all affected devices"
                })}
              >
                Push All Updates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PolicyTable policies={topPolicies} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
