
// Mock data for the Intune compliance dashboard

// Types for our data models
export type ComplianceStatus = 'compliant' | 'non-compliant' | 'unknown';
export type DeviceType = 'desktop' | 'laptop' | 'mobile' | 'tablet';
export type OSType = 'Windows' | 'MacOS' | 'iOS' | 'Android';
export type ActionType = 'restart' | 'update' | 'reinstall' | 'notify';
export type PolicyType = 'encryption' | 'firewall' | 'antivirus' | 'updates' | 'password' | 'app';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  os: OSType;
  osVersion: string;
  lastSeen: string;
  complianceStatus: ComplianceStatus;
  owner: string;
  department: string;
  policies: {
    policyId: string;
    status: ComplianceStatus;
  }[];
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  type: PolicyType;
  complianceRate: number;
  affectedDevices: number;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  message: string;
  timestamp: string;
  severity: AlertSeverity;
  resolved: boolean;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  deviceCount: number;
  recommendedAction: string;
  actionType: ActionType;
  severity: AlertSeverity;
}

// Generate mock devices
export const devices: Device[] = [
  {
    id: "dev-001",
    name: "LAPTOP-MARK123",
    type: "laptop",
    os: "Windows",
    osVersion: "11 Pro 22H2",
    lastSeen: "2023-11-04T14:30:00",
    complianceStatus: "compliant",
    owner: "Mark Johnson",
    department: "Engineering",
    policies: [
      { policyId: "pol-001", status: "compliant" },
      { policyId: "pol-002", status: "compliant" },
      { policyId: "pol-003", status: "compliant" }
    ]
  },
  {
    id: "dev-002",
    name: "DESKTOP-SARAH456",
    type: "desktop",
    os: "Windows",
    osVersion: "10 Enterprise 21H2",
    lastSeen: "2023-11-04T09:15:00",
    complianceStatus: "non-compliant",
    owner: "Sarah Miller",
    department: "Finance",
    policies: [
      { policyId: "pol-001", status: "compliant" },
      { policyId: "pol-002", status: "non-compliant" },
      { policyId: "pol-004", status: "compliant" }
    ]
  },
  {
    id: "dev-003",
    name: "iPhone-David",
    type: "mobile",
    os: "iOS",
    osVersion: "16.1",
    lastSeen: "2023-11-03T18:45:00",
    complianceStatus: "compliant",
    owner: "David Wilson",
    department: "Sales",
    policies: [
      { policyId: "pol-003", status: "compliant" },
      { policyId: "pol-006", status: "compliant" }
    ]
  },
  {
    id: "dev-004",
    name: "LAPTOP-EMMA789",
    type: "laptop",
    os: "MacOS",
    osVersion: "Ventura 13.1",
    lastSeen: "2023-11-04T11:20:00",
    complianceStatus: "non-compliant",
    owner: "Emma Thompson",
    department: "Marketing",
    policies: [
      { policyId: "pol-001", status: "non-compliant" },
      { policyId: "pol-005", status: "compliant" }
    ]
  },
  {
    id: "dev-005",
    name: "Galaxy-Tab-John",
    type: "tablet",
    os: "Android",
    osVersion: "13",
    lastSeen: "2023-11-03T16:10:00",
    complianceStatus: "unknown",
    owner: "John Davis",
    department: "HR",
    policies: [
      { policyId: "pol-003", status: "unknown" },
      { policyId: "pol-006", status: "unknown" }
    ]
  },
  {
    id: "dev-006",
    name: "DESKTOP-ROBERT101",
    type: "desktop",
    os: "Windows",
    osVersion: "11 Pro 22H2",
    lastSeen: "2023-11-04T13:05:00",
    complianceStatus: "non-compliant",
    owner: "Robert Brown",
    department: "Engineering",
    policies: [
      { policyId: "pol-001", status: "compliant" },
      { policyId: "pol-002", status: "non-compliant" },
      { policyId: "pol-004", status: "non-compliant" }
    ]
  },
  {
    id: "dev-007",
    name: "MacBook-Jennifer",
    type: "laptop",
    os: "MacOS",
    osVersion: "Monterey 12.6",
    lastSeen: "2023-11-04T10:30:00",
    complianceStatus: "compliant",
    owner: "Jennifer White",
    department: "Design",
    policies: [
      { policyId: "pol-001", status: "compliant" },
      { policyId: "pol-005", status: "compliant" }
    ]
  },
  {
    id: "dev-008",
    name: "iPhone-Michael",
    type: "mobile",
    os: "iOS",
    osVersion: "15.7",
    lastSeen: "2023-11-03T19:20:00",
    complianceStatus: "non-compliant",
    owner: "Michael Garcia",
    department: "Sales",
    policies: [
      { policyId: "pol-003", status: "non-compliant" },
      { policyId: "pol-006", status: "compliant" }
    ]
  },
  {
    id: "dev-009",
    name: "LAPTOP-LISA234",
    type: "laptop",
    os: "Windows",
    osVersion: "10 Pro 21H2",
    lastSeen: "2023-11-04T14:45:00",
    complianceStatus: "compliant",
    owner: "Lisa Martinez",
    department: "Finance",
    policies: [
      { policyId: "pol-001", status: "compliant" },
      { policyId: "pol-002", status: "compliant" },
      { policyId: "pol-004", status: "compliant" }
    ]
  },
  {
    id: "dev-010",
    name: "Galaxy-James",
    type: "mobile",
    os: "Android",
    osVersion: "12",
    lastSeen: "2023-11-04T08:15:00",
    complianceStatus: "unknown",
    owner: "James Taylor",
    department: "Marketing",
    policies: [
      { policyId: "pol-003", status: "unknown" },
      { policyId: "pol-006", status: "unknown" }
    ]
  }
];

// Generate mock policies
export const policies: Policy[] = [
  {
    id: "pol-001",
    name: "Device Encryption",
    description: "Ensures all devices have disk encryption enabled",
    type: "encryption",
    complianceRate: 85,
    affectedDevices: 3,
    createdAt: "2023-09-01T10:00:00",
    updatedAt: "2023-10-15T14:30:00"
  },
  {
    id: "pol-002",
    name: "Windows Firewall",
    description: "Ensures Windows Firewall is enabled on all Windows devices",
    type: "firewall",
    complianceRate: 72,
    affectedDevices: 4,
    createdAt: "2023-09-01T10:15:00",
    updatedAt: "2023-10-20T11:45:00"
  },
  {
    id: "pol-003",
    name: "Mobile Device Security",
    description: "Security settings for iOS and Android devices",
    type: "password",
    complianceRate: 90,
    affectedDevices: 2,
    createdAt: "2023-09-02T09:30:00",
    updatedAt: "2023-10-18T16:20:00"
  },
  {
    id: "pol-004",
    name: "Windows Update Compliance",
    description: "Ensures Windows devices are updated with latest patches",
    type: "updates",
    complianceRate: 68,
    affectedDevices: 3,
    createdAt: "2023-09-03T14:20:00",
    updatedAt: "2023-10-25T10:10:00"
  },
  {
    id: "pol-005",
    name: "MacOS Security",
    description: "Security standards for MacOS devices",
    type: "antivirus",
    complianceRate: 95,
    affectedDevices: 1,
    createdAt: "2023-09-05T11:45:00",
    updatedAt: "2023-10-17T09:35:00"
  },
  {
    id: "pol-006",
    name: "Mobile App Compliance",
    description: "Ensures required apps are installed and up-to-date",
    type: "app",
    complianceRate: 78,
    affectedDevices: 4,
    createdAt: "2023-09-10T13:30:00",
    updatedAt: "2023-10-22T15:40:00"
  }
];

// Generate mock alerts
export const alerts: Alert[] = [
  {
    id: "alert-001",
    deviceId: "dev-002",
    deviceName: "DESKTOP-SARAH456",
    message: "Firewall disabled on device",
    timestamp: "2023-11-04T09:15:00",
    severity: "high",
    resolved: false
  },
  {
    id: "alert-002",
    deviceId: "dev-004",
    deviceName: "LAPTOP-EMMA789",
    message: "Disk encryption not enabled",
    timestamp: "2023-11-04T11:20:00",
    severity: "critical",
    resolved: false
  },
  {
    id: "alert-003",
    deviceId: "dev-008",
    deviceName: "iPhone-Michael",
    message: "Required security app not installed",
    timestamp: "2023-11-03T19:20:00",
    severity: "medium",
    resolved: false
  },
  {
    id: "alert-004",
    deviceId: "dev-006",
    deviceName: "DESKTOP-ROBERT101",
    message: "Windows updates pending for 15+ days",
    timestamp: "2023-11-04T13:05:00",
    severity: "medium",
    resolved: false
  },
  {
    id: "alert-005",
    deviceId: "dev-010",
    deviceName: "Galaxy-James",
    message: "Device not checked in for 72+ hours",
    timestamp: "2023-11-04T08:15:00",
    severity: "low",
    resolved: true
  }
];

// Generate mock AI insights
export const insights: Insight[] = [
  {
    id: "insight-001",
    title: "Windows Firewall Disabled",
    description: "Several Windows devices have their firewall disabled, which poses a security risk.",
    deviceCount: 4,
    recommendedAction: "Push firewall policy update to affected devices",
    actionType: "update",
    severity: "high"
  },
  {
    id: "insight-002",
    title: "MacOS Devices Missing Latest Security Update",
    description: "2 MacOS devices are missing critical security updates released in the past week.",
    deviceCount: 2,
    recommendedAction: "Notify users to install updates immediately",
    actionType: "notify",
    severity: "medium"
  },
  {
    id: "insight-003",
    title: "Mobile App Compliance Issues",
    description: "Several mobile devices are missing required security apps or have outdated versions.",
    deviceCount: 3,
    recommendedAction: "Reinstall or update required apps on affected devices",
    actionType: "reinstall",
    severity: "medium"
  },
  {
    id: "insight-004",
    title: "Devices Requiring Restart for Updates",
    description: "5 devices have pending updates that require a restart to complete installation.",
    deviceCount: 5,
    recommendedAction: "Schedule automatic restart during non-business hours",
    actionType: "restart",
    severity: "low"
  }
];

// Dashboard summary data
export const dashboardSummary = {
  deviceStats: {
    total: devices.length,
    compliant: devices.filter(d => d.complianceStatus === "compliant").length,
    nonCompliant: devices.filter(d => d.complianceStatus === "non-compliant").length,
    unknown: devices.filter(d => d.complianceStatus === "unknown").length
  },
  complianceRate: 70, // Percentage
  criticalAlerts: alerts.filter(a => a.severity === "critical").length,
  osDistribution: {
    Windows: devices.filter(d => d.os === "Windows").length,
    MacOS: devices.filter(d => d.os === "MacOS").length,
    iOS: devices.filter(d => d.os === "iOS").length,
    Android: devices.filter(d => d.os === "Android").length
  },
  deviceTypeDistribution: {
    desktop: devices.filter(d => d.type === "desktop").length,
    laptop: devices.filter(d => d.type === "laptop").length,
    mobile: devices.filter(d => d.type === "mobile").length,
    tablet: devices.filter(d => d.type === "tablet").length
  },
  topNonCompliantPolicies: [
    { id: "pol-002", name: "Windows Firewall", affectedDevices: 4 },
    { id: "pol-004", name: "Windows Update Compliance", affectedDevices: 3 },
    { id: "pol-001", name: "Device Encryption", affectedDevices: 3 }
  ]
};
