import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

import {
  Code2,
  Plus,
  Users,
  Clock,
  LogOut,
  Home,
  FolderCode,
  TrendingUp,
  Activity,
  Trash2,
  Copy,
} from 'lucide-react';

import { useState, useEffect } from 'react';

import {
  useUser,
  useClerk,
} from '@clerk/clerk-react';

import {
  fetchUserRooms,
  createRoom,
  joinRoom,
  deleteRoom,
} from '../services/roomsApi';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('rooms');
  const { user } = useUser();
  const { signOut } = useClerk();
  const [recentRooms, setRecentRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadRooms();
    }
  }, [user]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const rooms = await fetchUserRooms(user.id);
      setRecentRooms(rooms);
    } catch (err) {
      console.error('Failed to load rooms:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    const projectName = window.prompt('Enter project name');
    if (!projectName?.trim()) return;

    try {
      const { roomId } = await createRoom(user.id, projectName);
      window.location.href = `/editor/${roomId}`;
    } catch (err) {
      alert('Failed to create room: ' + err.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await deleteRoom(roomId, user.id);
      setRecentRooms(prev => prev.filter(r => r.id !== roomId));
    } catch (err) {
      alert('Failed to delete room: ' + err.message);
    }
  };

  const handleJoinRoom = async () => {
    const roomId = window.prompt('Enter Room ID');
    if (!roomId?.trim()) return;

    try {
      await joinRoom(user.id, roomId);
      window.location.href = `/editor/${roomId}`;
    } catch (err) {
      alert('Failed to join room: ' + err.message);
    }
  };

  const handleCopyRoomLink = async (roomId) => {
    const link = `${window.location.origin}/editor/${roomId}`;
    await navigator.clipboard.writeText(link);
    alert('Room link copied!');
  };

  const stats = [
    {
      label: 'Total Sessions',
      value: 'stay tuned',
      icon: Activity,
      color: 'blue',
    },
    {
      label: 'Active Rooms',
      value: recentRooms.length,
      icon: FolderCode,
      color: 'purple',
    },
    {
      label: 'Collaborators',
      value: 'stay tuned',
      icon: Users,
      color: 'pink',
    },
    {
      label: 'Hours Coded',
      value: 'stay tuned',
      icon: TrendingUp,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
      <div className="flex">
        <aside className="w-64 border-r border-white/10 bg-gray-900/50 backdrop-blur-xl min-h-screen p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>

            <span className="text-xl text-white">
              CodeSync
            </span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === 'rooms'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />

              <span>My Rooms</span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === 'recent'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Clock className="w-5 h-5" />

              <span>Recent</span>
            </button>
          </nav>

          <div className="mt-auto flex flex-col gap-1 pb-2">
            <Link to="/profile">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all">
                <img
                  src={user?.imageUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1 text-left min-w-0">
                  <p className="text-white text-sm truncate">
                    {user?.fullName}
                  </p>

                  <p className="text-gray-400 text-xs truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </button>
            </Link>

            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 text-gray-300 px-4 py-3 rounded-xl hover:bg-white/5"
              onClick={() =>
                signOut(() => (window.location.href = '/'))
              }
            >
              <LogOut className="w-5 h-5" />

              Log out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl text-white mb-2">
                  Welcome back, {user?.firstName || 'Developer'}
                </h1>

                <p className="text-gray-400">
                  Ready to code together?
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleJoinRoom}
                >
                  <Plus className="w-5 h-5" />

                  Join Room
                </Button>

                <Button
                  variant="primary"
                  onClick={handleCreateRoom}
                >
                  <Plus className="w-5 h-5" />

                  Create Room
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label} glass hover>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        {stat.label}
                      </p>

                      <p className="text-3xl text-white">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}
                    >
                      <stat.icon
                        className={`w-5 h-5 text-${stat.color}-400`}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl text-white mb-4">
                Recent Rooms
              </h2>

              <div className="grid gap-4">
                {recentRooms.map((room) => (
                  <Link
                    key={room.id}
                    to={`/editor/${room.id}`}
                  >
                    <Card glass hover className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Code2 className="w-6 h-6 text-white" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-white text-lg mb-1">
                              {room.name}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <FolderCode className="w-4 h-4" />
                                {room.language}
                              </span>

                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {room.members} members
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {room.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            className="group-hover:bg-white/10"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCopyRoomLink(room.link);
                            }}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            className="group-hover:bg-red-500/10 text-red-400"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteRoom(room.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            className="group-hover:bg-white/10"
                          >
                            Open
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}