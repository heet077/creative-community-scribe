
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Palette, Heart, Star, Trophy, Sparkles } from 'lucide-react';

interface DashboardProps {
  onStartRegistration: () => void;
  totalRegistrations: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartRegistration, totalRegistrations }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-6">
          <Heart className="h-16 w-16 text-purple-600 mr-4" />
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Creative Community Hub
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Join our vibrant community of creative minds and showcase your artistic talents!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold text-purple-700">
              {totalRegistrations}
            </CardTitle>
            <CardDescription className="text-purple-600">
              Active Members
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="text-center">
            <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold text-blue-700">
              4
            </CardTitle>
            <CardDescription className="text-blue-600">
              Creative Groups
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="text-center">
            <Star className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold text-green-700">
              8+
            </CardTitle>
            <CardDescription className="text-green-600">
              Creative Skills
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Main Registration Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-12 w-12 text-primary mr-3" />
            <div>
              <CardTitle className="text-3xl font-bold">Ready to Join?</CardTitle>
              <CardDescription className="text-lg mt-2">
                Start your creative journey with us today! 🎨
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <span className="text-muted-foreground">Personal Info</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <span className="text-muted-foreground">Contact Details</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <span className="text-muted-foreground">Room & Group</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <span className="text-muted-foreground">Skills & Tools</span>
            </div>
          </div>
          
          <Button 
            onClick={onStartRegistration}
            size="lg"
            className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Start Your Registration
          </Button>
          
          <p className="text-sm text-muted-foreground">
            It only takes 2-3 minutes to complete!
          </p>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Creative Groups
            </CardTitle>
            <CardDescription>
              Join one of our four creative groups: Pavitra, Param, Pulkit, or Parmanand
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2 text-primary" />
              Diverse Skills
            </CardTitle>
            <CardDescription>
              From video editing to photography, sketching to designing - we welcome all creative minds
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
