
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppInstallStatusTable } from "@/components/reports/AppInstallStatusTable";
import { Search, Filter } from "lucide-react";

const mockApplications = [
  { id: "app1", name: "Microsoft Office 365", publisher: "Microsoft", platform: "Windows", type: "Productivity", version: "16.0.14931.20648" },
  { id: "app2", name: "Adobe Acrobat Reader", publisher: "Adobe", platform: "Windows", type: "Document Viewer", version: "22.003.20282" },
  { id: "app3", name: "Google Chrome", publisher: "Google", platform: "Windows", type: "Browser", version: "120.0.6099.110" },
  { id: "app4", name: "Zoom", publisher: "Zoom Video Communications", platform: "Windows", type: "Communication", version: "5.16.10.25170" },
  { id: "app5", name: "Slack", publisher: "Slack Technologies", platform: "Windows", type: "Communication", version: "4.35.131" },
  { id: "app6", name: "Microsoft Teams", publisher: "Microsoft", platform: "Windows", type: "Communication", version: "1.6.00.33064" },
  { id: "app7", name: "Visual Studio Code", publisher: "Microsoft", platform: "Windows", type: "Development", version: "1.85.2" },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [showInstallStatus, setShowInstallStatus] = useState(false);

  const handleViewReport = (appId: string) => {
    setSelectedApplication(appId);
    setShowInstallStatus(true);
  };

  const filteredApplications = mockApplications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedApp = mockApplications.find(app => app.id === selectedApplication);

  return (
    <AppLayout>
      <div className="flex-1 space-y-6 p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and view detailed reports on device compliance and application status
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Reports</CardTitle>
              <CardDescription>
                Select an application to view its installation status across all devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Add filters
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name ↑</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{app.name}</span>
                            <span className="text-sm text-muted-foreground">{app.publisher}</span>
                          </div>
                        </TableCell>
                        <TableCell>{app.platform}</TableCell>
                        <TableCell>{app.type}</TableCell>
                        <TableCell className="font-mono text-sm">{app.version}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm"
                            onClick={() => handleViewReport(app.id)}
                          >
                            View Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {showInstallStatus && selectedApp && (
            <AppInstallStatusTable 
              applicationId={selectedApplication}
              applicationName={selectedApp.name}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
