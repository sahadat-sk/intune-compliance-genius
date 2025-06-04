
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AppInstallStatusTableProps {
  applicationId: string;
  applicationName: string;
}

interface AppInstallStatus {
  deviceId: string;
  applicationId: string;
  deviceName: string;
  userPrincipalName: string;
  username: string;
  platform: string;
  appVersion: string;
  errorCode: string;
  installState: string;
  installStateDetails: string;
  lastModifiedTime: string;
  hexErrorCode: string;
  installCount: number;
}

const mockInstallStatusData: AppInstallStatus[] = [
  {
    deviceId: "dev-001",
    applicationId: "app1",
    deviceName: "LAPTOP-001",
    userPrincipalName: "john.doe@company.com",
    username: "john.doe",
    platform: "Windows",
    appVersion: "16.0.14931.20648",
    errorCode: "0",
    installState: "Installed",
    installStateDetails: "Successfully installed",
    lastModifiedTime: "2024-06-03T14:30:00Z",
    hexErrorCode: "0x00000000",
    installCount: 1
  },
  {
    deviceId: "dev-002",
    applicationId: "app1",
    deviceName: "LAPTOP-002",
    userPrincipalName: "jane.smith@company.com",
    username: "jane.smith",
    platform: "Windows",
    appVersion: "16.0.14931.20648",
    errorCode: "0x80070005",
    installState: "Failed",
    installStateDetails: "Access denied during installation",
    lastModifiedTime: "2024-06-03T12:15:00Z",
    hexErrorCode: "0x80070005",
    installCount: 3
  },
  {
    deviceId: "dev-003",
    applicationId: "app1",
    deviceName: "MACBOOK-001",
    userPrincipalName: "mike.johnson@company.com",
    username: "mike.johnson",
    platform: "macOS",
    appVersion: "16.0.14931.20648",
    errorCode: "0",
    installState: "Installing",
    installStateDetails: "Installation in progress",
    lastModifiedTime: "2024-06-03T15:45:00Z",
    hexErrorCode: "0x00000000",
    installCount: 1
  },
  {
    deviceId: "dev-004",
    applicationId: "app1",
    deviceName: "TABLET-001",
    userPrincipalName: "sarah.wilson@company.com",
    username: "sarah.wilson",
    platform: "iOS",
    appVersion: "16.0.14931.20648",
    errorCode: "0",
    installState: "Available",
    installStateDetails: "Available for installation",
    lastModifiedTime: "2024-06-03T10:20:00Z",
    hexErrorCode: "0x00000000",
    installCount: 0
  },
  {
    deviceId: "dev-005",
    applicationId: "app1",
    deviceName: "PHONE-001",
    userPrincipalName: "alex.brown@company.com",
    username: "alex.brown",
    platform: "Android",
    appVersion: "16.0.14931.20648",
    errorCode: "0x80070643",
    installState: "Failed",
    installStateDetails: "Installation failed - insufficient storage",
    lastModifiedTime: "2024-06-03T09:30:00Z",
    hexErrorCode: "0x80070643",
    installCount: 2
  }
];

const getInstallStateBadge = (state: string) => {
  switch (state.toLowerCase()) {
    case "installed":
      return <Badge className="bg-green-100 text-green-800">Installed</Badge>;
    case "failed":
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    case "installing":
      return <Badge className="bg-blue-100 text-blue-800">Installing</Badge>;
    case "available":
      return <Badge className="bg-gray-100 text-gray-800">Available</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{state}</Badge>;
  }
};

export const AppInstallStatusTable = ({ applicationId, applicationName }: AppInstallStatusTableProps) => {
  const filteredData = mockInstallStatusData.filter(item => item.applicationId === applicationId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Install Status: {applicationName}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Showing installation status for {filteredData.length} devices
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Device Name</TableHead>
                <TableHead>User Principal Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>App Version</TableHead>
                <TableHead>Install State</TableHead>
                <TableHead>Error Code</TableHead>
                <TableHead>Hex Error Code</TableHead>
                <TableHead>Install Count</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Install Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.deviceId}>
                  <TableCell className="font-mono text-sm">{item.deviceId}</TableCell>
                  <TableCell className="font-medium">{item.deviceName}</TableCell>
                  <TableCell className="text-sm">{item.userPrincipalName}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.platform}</TableCell>
                  <TableCell className="font-mono text-sm">{item.appVersion}</TableCell>
                  <TableCell>{getInstallStateBadge(item.installState)}</TableCell>
                  <TableCell className="font-mono text-sm">{item.errorCode}</TableCell>
                  <TableCell className="font-mono text-sm">{item.hexErrorCode}</TableCell>
                  <TableCell className="text-center">{item.installCount}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(item.lastModifiedTime).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm max-w-xs truncate" title={item.installStateDetails}>
                    {item.installStateDetails}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
