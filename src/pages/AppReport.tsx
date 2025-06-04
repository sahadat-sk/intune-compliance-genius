
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { AppInstallStatusTable } from "@/components/reports/AppInstallStatusTable";
import { ArrowLeft } from "lucide-react";

const mockApplications = [
  { id: "app1", name: "Microsoft Office 365", publisher: "Microsoft", platform: "Windows", type: "Productivity", version: "16.0.14931.20648" },
  { id: "app2", name: "Adobe Acrobat Reader", publisher: "Adobe", platform: "Windows", type: "Document Viewer", version: "22.003.20282" },
  { id: "app3", name: "Google Chrome", publisher: "Google", platform: "Windows", type: "Browser", version: "120.0.6099.110" },
  { id: "app4", name: "Zoom", publisher: "Zoom Video Communications", platform: "Windows", type: "Communication", version: "5.16.10.25170" },
  { id: "app5", name: "Slack", publisher: "Slack Technologies", platform: "Windows", type: "Communication", version: "4.35.131" },
  { id: "app6", name: "Microsoft Teams", publisher: "Microsoft", platform: "Windows", type: "Communication", version: "1.6.00.33064" },
  { id: "app7", name: "Visual Studio Code", publisher: "Microsoft", platform: "Windows", type: "Development", version: "1.85.2" },
];

const AppReport = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();

  const selectedApp = mockApplications.find(app => app.id === appId);

  if (!selectedApp) {
    return (
      <AppLayout>
        <div className="flex-1 space-y-6 p-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/reports")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Application Not Found</h2>
            <p className="text-muted-foreground mt-2">The requested application could not be found.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-6 p-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/reports")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Application Report</h2>
          <p className="text-muted-foreground">
            Installation status report for {selectedApp.name}
          </p>
        </div>

        <AppInstallStatusTable 
          applicationId={appId!}
          applicationName={selectedApp.name}
        />
      </div>
    </AppLayout>
  );
};

export default AppReport;
