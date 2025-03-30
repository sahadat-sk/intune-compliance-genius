
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PolicyTable } from "@/components/dashboard/PolicyTable";
import { Search, PlusCircle, Filter } from "lucide-react";
import { policies, PolicyType } from "@/data/mockData";
import { toast } from "sonner";

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<PolicyType | "all">("all");

  // Filter policies based on search term and filters
  const filteredPolicies = policies.filter(policy => {
    // Search filter
    const matchesSearch = !searchTerm || 
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === "all" || policy.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleAddPolicy = () => {
    toast.info("Feature coming soon", {
      description: "The ability to add custom policies will be available in a future update",
    });
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Compliance Policies</h1>
            <p className="text-gray-500">Manage and deploy compliance policies to your devices</p>
          </div>
          <Button 
            className="mt-3 sm:mt-0" 
            onClick={handleAddPolicy}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Policy
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search policies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Policy Type:</span>
          </div>
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as PolicyType | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Policy Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="encryption">Encryption</SelectItem>
              <SelectItem value="firewall">Firewall</SelectItem>
              <SelectItem value="antivirus">Antivirus</SelectItem>
              <SelectItem value="updates">Updates</SelectItem>
              <SelectItem value="password">Password</SelectItem>
              <SelectItem value="app">App Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Policies Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <PolicyTable policies={filteredPolicies} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Policies;
