
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  Shield, 
  RotateCcw, 
  Bell, 
  Trash2, 
  MessageSquare,
  Monitor,
  Download
} from "lucide-react";
import { devices, policies, alerts } from "@/data/mockData";
import { toast } from "sonner";

const DeviceDetail = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the device from our mock data
  const device = devices.find(d => d.id === deviceId);
  
  // If device not found, show error
  if (!device) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-red-500">Device Not Found</h1>
          </div>
          <p>The device with ID {deviceId} could not be found.</p>
        </div>
      </AppLayout>
    );
  }
  
  // Find related policies for this device
  const devicePolicies = device.policies.map(p => {
    const policyDetails = policies.find(policy => policy.id === p.policyId);
    return {
      ...policyDetails,
      status: p.status
    };
  });
  
  // Find alerts for this device
  const deviceAlerts = alerts.filter(a => a.deviceId === device.id);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="h-3 w-3 mr-1" /> Compliant
          </Badge>
        );
      case "non-compliant":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="h-3 w-3 mr-1" /> Non-Compliant
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <HelpCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const handleAction = (action: string) => {
    toast.success(`${action} initiated for ${device.name}`, {
      description: `Action will be completed shortly.`
    });
  };
  
  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-start">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{device.name}</h1>
                <div className="ml-3">{getStatusBadge(device.complianceStatus)}</div>
              </div>
              <p className="text-gray-500">{device.owner} • {device.department}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => handleAction("Restart")}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Restart
            </Button>
            <Button variant="outline" onClick={() => handleAction("Sync")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync
            </Button>
            <Button variant="outline" onClick={() => handleAction("Notification")}>
              <Bell className="mr-2 h-4 w-4" />
              Notify
            </Button>
            <Button variant="destructive" onClick={() => {
              toast.error("Device removal initiated", {
                description: "This action cannot be undone"
              });
            }}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
        
        {/* Device Details */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Device Type:</dt>
                      <dd className="text-sm capitalize">{device.type}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Operating System:</dt>
                      <dd className="text-sm">{device.os} {device.osVersion}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Last Seen:</dt>
                      <dd className="text-sm">{formatDate(device.lastSeen)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Compliance Status:</dt>
                      <dd className="text-sm">{getStatusBadge(device.complianceStatus)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Smart suggestions based on device status</CardDescription>
                </CardHeader>
                <CardContent>
                  {device.complianceStatus === "compliant" ? (
                    <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-md">
                      <Check className="h-5 w-5 mr-3" />
                      <p>This device is fully compliant with all assigned policies.</p>
                    </div>
                  ) : device.complianceStatus === "non-compliant" ? (
                    <div className="space-y-4">
                      <div className="flex items-start p-4 bg-red-50 text-red-700 rounded-md">
                        <AlertCircle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Non-compliant policies detected</p>
                          <p className="text-sm mt-1">The device is not meeting some compliance requirements.</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Recommended actions:</p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <RotateCcw className="h-4 w-4 mr-2 text-dashboard-blue" />
                            Restart the device to apply pending updates
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-dashboard-blue" />
                            Refresh policy assignments
                          </li>
                          <li className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-dashboard-blue" />
                            Contact user for assistance
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center p-4 bg-gray-50 text-gray-700 rounded-md">
                      <HelpCircle className="h-5 w-5 mr-3" />
                      <p>Unable to determine compliance status. Device may be offline.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Key metrics based on device telemetry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-6 justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">CPU Usage</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-dashboard-blue rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>45%</span>
                        <span>Normal</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Memory Usage</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-dashboard-blue rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>65%</span>
                        <span>Normal</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Storage</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-dashboard-purple rounded-full" style={{ width: "82%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>82%</span>
                        <span>Warning</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Application Health</h3>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-3 text-sm font-medium border-b">
                        <div className="p-3">Application</div>
                        <div className="p-3">Status</div>
                        <div className="p-3">Version</div>
                      </div>
                      <div className="grid grid-cols-3 text-sm border-b">
                        <div className="p-3">Microsoft Office</div>
                        <div className="p-3 text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" /> Healthy
                        </div>
                        <div className="p-3">16.0.15427</div>
                      </div>
                      <div className="grid grid-cols-3 text-sm border-b">
                        <div className="p-3">Antivirus</div>
                        <div className="p-3 text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" /> Healthy
                        </div>
                        <div className="p-3">4.18.2</div>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <div className="p-3">VPN Client</div>
                        <div className="p-3 text-yellow-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> Needs Update
                        </div>
                        <div className="p-3">2.1.5</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Applied Policies</span>
                  <Button variant="outline" size="sm" onClick={() => handleAction("Policy Refresh")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Policies
                  </Button>
                </CardTitle>
                <CardDescription>
                  The following compliance policies are applied to this device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {devicePolicies.map((policy) => (
                        <tr key={policy.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{policy.name}</div>
                            <div className="text-sm text-gray-500">{policy.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">
                              {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(policy.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAction(`Remediate ${policy.name}`)}
                              disabled={policy.status === "compliant"}
                            >
                              {policy.status === "compliant" ? "No action needed" : "Remediate"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Device Alerts</span>
                  <Button variant="outline" size="sm" onClick={() => handleAction("Export Alerts")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
                <CardDescription>
                  Recent alerts and notifications for this device
                </CardDescription>
              </CardHeader>
              <CardContent>
                {deviceAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {deviceAlerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`p-4 rounded-md flex items-start ${
                          alert.severity === "critical" ? "bg-red-50" :
                          alert.severity === "high" ? "bg-orange-50" :
                          alert.severity === "medium" ? "bg-yellow-50" :
                          "bg-blue-50"
                        }`}
                      >
                        <div className="mr-3">
                          <AlertCircle className={`h-5 w-5 ${
                            alert.severity === "critical" ? "text-red-500" :
                            alert.severity === "high" ? "text-orange-500" :
                            alert.severity === "medium" ? "text-yellow-500" :
                            "text-blue-500"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{alert.message}</div>
                            {getSeverityBadge(alert.severity)}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatDate(alert.timestamp)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={alert.resolved ? "ghost" : "outline"}
                          onClick={() => {
                            if (!alert.resolved) {
                              toast.success("Alert marked as resolved", {
                                description: `Alert: ${alert.message}`,
                              });
                            }
                          }}
                          disabled={alert.resolved}
                        >
                          {alert.resolved ? "Resolved" : "Resolve"}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Monitor className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
                    <p className="text-gray-500 mt-2">This device has no active alerts or notifications.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DeviceDetail;
