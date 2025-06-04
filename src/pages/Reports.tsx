
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppInstallStatusTable } from "@/components/reports/AppInstallStatusTable";

const mockApplications = [
  { id: "app1", name: "Microsoft Office 365", publisher: "Microsoft" },
  { id: "app2", name: "Adobe Acrobat Reader", publisher: "Adobe" },
  { id: "app3", name: "Google Chrome", publisher: "Google" },
  { id: "app4", name: "Zoom", publisher: "Zoom Video Communications" },
  { id: "app5", name: "Slack", publisher: "Slack Technologies" },
];

const Reports = () => {
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [showInstallStatus, setShowInstallStatus] = useState(false);

  const handleApplicationSelect = (appId: string) => {
    setSelectedApplication(appId);
    setShowInstallStatus(false);
  };

  const handleShowInstallStatus = () => {
    if (selectedApplication) {
      setShowInstallStatus(true);
    }
  };

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
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Select Application
                  </label>
                  <Select value={selectedApplication} onValueChange={handleApplicationSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an application..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockApplications.map((app) => (
                        <SelectItem key={app.id} value={app.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{app.name}</span>
                            <span className="text-sm text-muted-foreground">{app.publisher}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleShowInstallStatus}
                  disabled={!selectedApplication}
                >
                  View Install Status
                </Button>
              </div>

              {selectedApp && !showInstallStatus && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{selectedApp.name}</h4>
                  <p className="text-sm text-muted-foreground">Publisher: {selectedApp.publisher}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click "View Install Status" to see installation details across all devices
                  </p>
                </div>
              )}
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
