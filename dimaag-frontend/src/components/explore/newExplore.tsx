'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpDown,
  Calendar,
  Filter,
  Mail,
  Search,
  User,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/useUser';
import { userType } from '@/types/userType';
import { formatDate } from '@/utils/formatDate';
import { TopNavigation } from '../dashboard/utils/top-navigation';

export default function ExploreUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [dummyUsers, setDummyUsers] = useState<userType[]>([]);
  const users = useUser();
  useEffect(() => {
    if (users) {
      setDummyUsers(users);
    }
  }, [users]);
  if (dummyUsers.length === 0) {
    return <div>Loading</div>;
  }
  const filteredUsers = dummyUsers
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Coral theme colors
  const colors = {
    background: 'hsl(30 50% 98%)',
    foreground: 'hsl(20 14.3% 4.1%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(20 14.3% 4.1%)',
    primary: 'hsl(12 91% 55%)',
    primaryForeground: 'hsl(60 9.1% 97.8%)',
    secondary: 'hsl(30 60% 94%)',
    secondaryForeground: 'hsl(24 9.8% 10%)',
    muted: 'hsl(30 40% 96.1%)',
    mutedForeground: 'hsl(25 5.3% 44.7%)',
    accent: 'hsl(30 65% 60%)',
    accentForeground: 'hsl(60 9.1% 97.8%)',
    destructive: 'hsl(0 72.2% 50.6%)',
    destructiveForeground: 'hsl(60 9.1% 97.8%)',
    border: 'hsl(20 5.9% 90%)',
    input: 'hsl(20 5.9% 90%)',
    ring: 'hsl(12 91% 55%)',
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background, color: colors.foreground }}
    >
      <TopNavigation />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="h-6 w-6" style={{ color: colors.accent }} />
          <h1 className="text-3xl font-bold">Explore Users</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: colors.mutedForeground }}
            />
            <Input
              placeholder="Search users by name, bio or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              style={{
                backgroundColor: `${colors.secondary}30`,
                borderColor: `${colors.accent}33`,
                color: colors.foreground,
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              style={{
                borderColor: `${colors.accent}33`,
                color: colors.foreground,
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              style={{
                borderColor: `${colors.accent}33`,
                color: colors.foreground,
              }}
              onClick={toggleSortOrder}
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
            <div
              className="flex rounded-md overflow-hidden"
              style={{ border: `1px solid ${colors.accent}33` }}
            >
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                className="rounded-none"
                style={{
                  backgroundColor:
                    viewMode === 'grid' ? colors.accent : 'transparent',
                  color:
                    viewMode === 'grid'
                      ? colors.accentForeground
                      : colors.foreground,
                  borderColor:
                    viewMode === 'grid' ? colors.accent : `${colors.accent}33`,
                }}
                onClick={() => setViewMode('grid')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className="rounded-none"
                style={{
                  backgroundColor:
                    viewMode === 'list' ? colors.accent : 'transparent',
                  color:
                    viewMode === 'list'
                      ? colors.accentForeground
                      : colors.foreground,
                  borderColor:
                    viewMode === 'list' ? colors.accent : `${colors.accent}33`,
                }}
                onClick={() => setViewMode('list')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link to={`/explore/${user.username}`} className="block h-full">
                  <Card
                    className="overflow-hidden h-full border-2 transition-all duration-300"
                    style={{
                      backgroundColor: colors.card,
                      color: colors.cardForeground,
                      borderColor: 'transparent',
                    }}
                  >
                    <CardContent className="p-0">
                      <div
                        className="h-24"
                        style={{
                          background: `linear-gradient(to right, ${colors.accent}4D, ${colors.secondary})`,
                        }}
                      ></div>
                      <div className="p-6 pt-0 -mt-12">
                        <Avatar
                          className="h-20 w-20 border-4"
                          style={{ borderColor: colors.background }}
                        >
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback>
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold mt-3">
                          {user.username}
                        </h3>
                        <p
                          className="text-sm mb-4"
                          style={{ color: colors.mutedForeground }}
                        >
                          {user.email}
                        </p>
                        <p className="text-sm mb-4 line-clamp-2">{user.bio}</p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            style={{
                              backgroundColor: `${colors.accent}1A`,
                              color: colors.accent,
                              borderColor: `${colors.accent}33`,
                            }}
                          >
                            View Profile
                          </Badge>
                          <span
                            className="text-xs"
                            style={{ color: colors.mutedForeground }}
                          >
                            Joined{' '}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Link to={`/explore/${user.username}`} className="block">
                  <Card
                    className="overflow-hidden border transition-all duration-300"
                    style={{
                      backgroundColor: colors.card,
                      color: colors.cardForeground,
                      borderColor: colors.border,
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback>
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {user.username}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                            <span
                              className="flex items-center"
                              style={{ color: colors.mutedForeground }}
                            >
                              <Mail className="mr-1 h-3 w-3" />
                              {user.email}
                            </span>
                            <span
                              className="hidden sm:inline"
                              style={{ color: colors.mutedForeground }}
                            >
                              •
                            </span>
                            <span
                              className="flex items-center"
                              style={{ color: colors.mutedForeground }}
                            >
                              <Calendar className="mr-1 h-3 w-3" />
                              Joined {formatDate(user.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">
                            {user.bio}
                          </p>
                        </div>
                        <Button
                          className="shrink-0 hover:bg-accent/90"
                          style={{
                            backgroundColor: colors.accent,
                            color: colors.accentForeground,
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
