
import { Policy } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PolicyTableProps {
  policies: Policy[];
}

export const PolicyTable = ({ policies }: PolicyTableProps) => {
  // Function to handle policy actions
  const handlePushPolicy = (policyName: string) => {
    toast.success(`Policy update initiated: ${policyName}`, {
      description: "Pushing policy update to affected devices",
    });
  };

  // Function to determine status color
  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return "text-green-500";
    if (rate >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Policy Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Compliance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Affected Devices
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {policies.map((policy) => (
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
                <span className={`font-semibold ${getComplianceColor(policy.complianceRate)}`}>
                  {policy.complianceRate}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {policy.affectedDevices}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePushPolicy(policy.name)}
                >
                  Push Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
