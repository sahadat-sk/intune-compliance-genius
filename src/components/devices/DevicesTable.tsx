
import { useNavigate } from "react-router-dom";
import { Device } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, HelpCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface DevicesTableProps {
  devices: Device[];
}

export const DevicesTable = ({ devices }: DevicesTableProps) => {
  const navigate = useNavigate();

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

  const handleRestartDevice = (deviceId: string, deviceName: string) => {
    toast.success(`Restart initiated for ${deviceName}`, {
      description: "Device will restart and apply pending updates",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Device / Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              OS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Seen
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {devices.map((device) => (
            <tr key={device.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/devices/${device.id}`)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{device.name}</div>
                <div className="text-sm text-gray-500">{device.owner} ({device.department})</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                {device.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>{device.os}</div>
                <div className="text-xs text-gray-500">{device.osVersion}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(device.complianceStatus)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(device.lastSeen)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestartDevice(device.id, device.name)}
                >
                  <RotateCcw className="h-4 w-4 mr-1" /> Restart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
