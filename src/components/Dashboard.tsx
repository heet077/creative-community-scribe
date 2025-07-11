
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Palette, Heart, Star, Trophy, Sparkles, Zap, Rocket, Crown } from 'lucide-react';

interface DashboardProps {
  onStartRegistration: () => void;
  totalRegistrations: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartRegistration, totalRegistrations }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section with Creative Design */}
        <div className="text-center space-y-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <Crown className="h-24 w-24 text-purple-600 animate-pulse" />
                <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Creative Hub
            </h1>
            <p className="text-2xl text-muted-foreground font-light">
              Where creativity meets community ✨
            </p>
          </div>
        </div>

        {/* Creative Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">{totalRegistrations}</CardTitle>
              <CardDescription className="text-purple-100">Active Creators</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">4</CardTitle>
              <CardDescription className="text-blue-100">Creative Teams</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">8+</CardTitle>
              <CardDescription className="text-green-100">Skills Available</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-2">
              <Rocket className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <CardTitle className="text-3xl font-bold">∞</CardTitle>
              <CardDescription className="text-pink-100">Possibilities</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
          <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            <CardHeader className="text-center space-y-6 pt-12 pb-8">
              <div className="flex items-center justify-center space-x-4">
                <Zap className="h-16 w-16 text-yellow-500 animate-pulse" />
                <div>
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Ready to Create?
                  </CardTitle>
                  <CardDescription className="text-xl mt-3 text-muted-foreground">
                    Join our creative revolution today! 🎨
                  </CardDescription>
                </div>
                <Palette className="h-16 w-16 text-purple-500 animate-bounce" />
              </div>
            </CardHeader>
            
            <CardContent className="text-center pb-12">
              <Button 
                onClick={onStartRegistration}
                size="lg"
                className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 rounded-full"
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Start Your Creative Journey
                <Heart className="h-6 w-6 ml-3" />
              </Button>
              
              <p className="text-muted-foreground mt-6 text-lg">
                ✨ Quick & Easy • 🚀 2 Minutes • 💫 Join {totalRegistrations} Creators
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Creative Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="h-6 w-6 mr-3 text-orange-600" />
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Creative Teams
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                Join Pavitra, Param, Pulkit, or Parmanand - each team brings unique creative energy! 🌟
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Palette className="h-6 w-6 mr-3 text-teal-600" />
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Diverse Skills
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                From video editing to photography, sketching to designing - unleash your creativity! 🎭
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};
