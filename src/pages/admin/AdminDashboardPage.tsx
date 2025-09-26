import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useMockData } from '../../hooks/useMockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Wrench, CheckCircle } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { issues } = useMockData();

  const chartData = [
    { name: 'Pothole', resolved: 40, pending: 24 },
    { name: 'Garbage', resolved: 30, pending: 30 },
    { name: 'Streetlight', resolved: 20, pending: 8 },
    { name: 'Waterlogging', resolved: 27, pending: 12 },
    { name: 'Other', resolved: 18, pending: 5 },
  ];

  return (
    <PageLayout title="Admin Dashboard" showBottomNav={false}>
      <div className="p-4 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card padding="md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent-100 rounded-xl"><Clock className="w-6 h-6 text-accent-500" /></div>
              <div>
                <p className="text-sm text-text-secondary">New Reports</p>
                <p className="text-xl font-bold">72</p>
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-xl"><Wrench className="w-6 h-6 text-yellow-500" /></div>
              <div>
                <p className="text-sm text-text-secondary">Pending Assignments</p>
                <p className="text-xl font-bold">15</p>
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary-100 rounded-xl"><CheckCircle className="w-6 h-6 text-secondary-500" /></div>
              <div>
                <p className="text-sm text-text-secondary">Avg. Resolution Time</p>
                <p className="text-xl font-bold">2.5 days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold mb-4">Performance by Category</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="resolved" fill="#2e7d32" name="Resolved" />
                <Bar dataKey="pending" fill="#f57c00" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Issue Queue */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold mb-4">Issue Queue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.slice(0, 10).map(issue => (
                  <tr key={issue.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{issue.title}</td>
                    <td className="px-4 py-3 capitalize">{issue.category}</td>
                    <td className="px-4 py-3">
                      <Badge variant={issue.status === 'resolved' ? 'success' : 'info'} size="sm" className="capitalize">
                        {issue.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{issue.timeAgo}</td>
                    <td className="px-4 py-3">
                      <button className="font-medium text-primary-500 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminDashboardPage;
