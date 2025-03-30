
import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DevicesTable } from "@/components/devices/DevicesTable";
import { devices, ComplianceStatus, DeviceType, OSType } from "@/data/mockData";
import { toast } from "sonner";

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<DeviceType | "all">("all");
  const [osFilter, setOSFilter] = useState<OSType | "all">("all");

  // Filter devices based on search term and filters
  const filteredDevices = devices.filter(device => {
    // Search filter
    const matchesSearch = !searchTerm || 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      device.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || device.complianceStatus === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === "all" || device.type === typeFilter;
    
    // OS filter
    const matchesOS = osFilter === "all" || device.os === osFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesOS;
  });

  const handleExport = () => {
    toast.success("Exporting device data", {
      description: "Your report will be ready to download shortly",
    });
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Device Management</h1>
            <p className="text-gray-500">View and manage all enrolled devices</p>
          </div>
          <Button 
            className="mt-3 sm:mt-0" 
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search devices or users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as ComplianceStatus | "all")}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value as DeviceType | "all")}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Device Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={osFilter}
              onValueChange={(value) => setOSFilter(value as OSType | "all")}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All OS</SelectItem>
                <SelectItem value="Windows">Windows</SelectItem>
                <SelectItem value="MacOS">MacOS</SelectItem>
                <SelectItem value="iOS">iOS</SelectItem>
                <SelectItem value="Android">Android</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Devices Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <DevicesTable devices={filteredDevices} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Devices;
