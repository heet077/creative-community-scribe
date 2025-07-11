
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, Download, Trash2, TrendingUp, Award, Palette, Camera, Edit, Code, Brush, User, Phone, Home, UserCheck, Star, Trophy, Zap, Target, Loader2 } from 'lucide-react';

interface RegistrationData {
  id: string;
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

interface AdminPanelProps {
  registrations: RegistrationData[];
  onExportData: () => void;
  onClearData: () => void;
  onDeleteRegistration: (id: string) => void;
  isLoading: boolean;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  registrations, 
  onExportData, 
  onClearData,
  onDeleteRegistration,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
          <p className="text-lg text-muted-foreground">Loading registrations...</p>
        </div>
      </div>
    );
  }

  // Data processing for charts
  const groupData = registrations.reduce((acc: any, reg) => {
    acc[reg.groupName] = (acc[reg.groupName] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupData).map(([name, value]) => ({
    name,
    value,
    count: value
  }));

  const interestsData = registrations
    .flatMap(reg => reg.interests)
    .reduce((acc: any, interest) => {
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {});

  const interestsChartData = Object.entries(interestsData)
    .map(([name, value]) => ({ name, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 8);

  const softwareData = registrations
    .flatMap(reg => reg.software)
    .reduce((acc: any, software) => {
      acc[software] = (acc[software] || 0) + 1;
      return acc;
    }, {});

  const softwareChartData = Object.entries(softwareData)
    .map(([name, value]) => ({ name, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 8);

  // Mock data for trends (you can replace with real time-based data)
  const trendData = [
    { day: 'Mon', registrations: 12 },
    { day: 'Tue', registrations: 19 },
    { day: 'Wed', registrations: 8 },
    { day: 'Thu', registrations: 15 },
    { day: 'Fri', registrations: 22 },
    { day: 'Sat', registrations: 18 },
    { day: 'Sun', registrations: 14 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <Zap className="h-12 w-12 text-yellow-500 ml-3 animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground">
            Creative Community Analytics & Management ✨
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">{registrations.length}</CardTitle>
              <CardDescription className="text-purple-100">Total Registrations</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">{Object.keys(groupData).length}</CardTitle>
              <CardDescription className="text-blue-100">Active Groups</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">{Object.keys(interestsData).length}</CardTitle>
              <CardDescription className="text-green-100">Unique Skills</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">{Object.keys(softwareData).length}</CardTitle>
              <CardDescription className="text-pink-100">Software Tools</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Group Distribution Pie Chart */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 mr-2 text-purple-600" />
                Group Distribution
              </CardTitle>
              <CardDescription>Registration distribution across creative teams</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Registration Trends */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Registration Trends
              </CardTitle>
              <CardDescription>Daily registration activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#8884d8" 
                    fill="url(#colorGradient)" 
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Creative Interests */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Palette className="h-6 w-6 mr-2 text-pink-600" />
                Top Creative Interests
              </CardTitle>
              <CardDescription>Most popular creative skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={interestsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Software Usage */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Code className="h-6 w-6 mr-2 text-blue-600" />
                Software Usage
              </CardTitle>
              <CardDescription>Most used creative software</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={softwareChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Zap className="h-6 w-6 mr-2 text-purple-600" />
              Admin Actions
            </CardTitle>
            <CardDescription>Manage your registration data</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button 
              onClick={onExportData}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
            <Button 
              onClick={onClearData}
              variant="destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        {registrations.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <UserCheck className="h-6 w-6 mr-2 text-green-600" />
                Recent Registrations
              </CardTitle>
              <CardDescription>Latest members who joined the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {registrations.slice(-10).reverse().map((registration, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="font-medium">{registration.fullName}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm">{registration.mobileNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-sm">Room {registration.roomNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-orange-600" />
                        <Badge variant="secondary">{registration.groupName}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {registration.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {registration.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{registration.interests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Registrations Table */}
        {registrations.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 mr-2 text-indigo-600" />
                All Registrations
              </CardTitle>
              <CardDescription>Complete registration data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-blue-50 text-left">
                      <th className="p-4 border-b font-semibold text-gray-600">#</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Full Name</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Mobile Number</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Room Number</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Group Name</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Interests</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Software</th>
                      <th className="p-4 border-b font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration, index) => (
                      <tr key={registration.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b">{index + 1}</td>
                        <td className="p-4 border-b font-medium">{registration.fullName}</td>
                        <td className="p-4 border-b">{registration.mobileNumber}</td>
                        <td className="p-4 border-b">{registration.roomNumber}</td>
                        <td className="p-4 border-b">
                          <Badge variant="secondary">{registration.groupName}</Badge>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex flex-wrap gap-1">
                            {registration.interests.map((interest) => (
                              <Badge key={interest} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex flex-wrap gap-1">
                            {registration.software.map((sw) => (
                              <Badge key={sw} variant="outline" className="text-xs bg-blue-50">
                                {sw}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this registration?')) {
                                onDeleteRegistration(registration.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
