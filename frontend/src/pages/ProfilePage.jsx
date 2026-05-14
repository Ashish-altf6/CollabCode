import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useUser } from "@clerk/clerk-react";
import {
  Code2,
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Keyboard,
  ChevronLeft,
  Camera,
} from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useUser();

  const [theme, setTheme] = useState('dark');

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    chat: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
      <header className="border-b border-white/10 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>

            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>

              <span className="text-xl text-white">CodeSync</span>
            </Link>
          </div>

          <Link to="/dashboard">
            <Button variant="secondary">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl text-white mb-8">
          Settings & Profile
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <Card glass>
                <h2 className="text-xl text-white mb-6">
                  User Profile
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={user?.imageUrl}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />

                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-900 hover:bg-gray-700 transition-colors">
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-white text-lg mb-1">
                        Profile Picture
                      </h3>

                      <p className="text-gray-400 text-sm mb-3">
                        Update your profile photo
                      </p>

                      <Button variant="secondary" size="sm">
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      defaultValue={user?.fullName || ""}
                    />

                    <Input
                      label="Username"
                      defaultValue={user?.username || ""}
                    />

                    <Input
                      label="Email"
                      type="email"
                      defaultValue={
                        user?.primaryEmailAddress?.emailAddress || ""
                      }
                    />

                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <Input
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    className="h-24"
                  />

                  <div className="flex gap-3">
                    <Button variant="primary">
                      Save Changes
                    </Button>

                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card glass>
                <h2 className="text-xl text-white mb-6">
                  Editor Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-3">
                      Theme
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                      {['dark', 'light', 'auto'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === t
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                          }`}
                        >
                          <Palette className="w-6 h-6 text-white mb-2" />

                          <p className="text-white text-sm capitalize">
                            {t}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">
                        Font Size
                      </label>

                      <select
                        defaultValue="14px"
                        className="w-full px-4 py-2.5 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>12px</option>
                        <option>14px</option>
                        <option>16px</option>
                        <option>18px</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white mb-2">
                        Tab Size
                      </label>

                      <select
                        defaultValue="2 spaces"
                        className="w-full px-4 py-2.5 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>2 spaces</option>
                        <option>4 spaces</option>
                        <option>Tabs</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <Keyboard className="w-5 h-5 text-blue-400" />

                        <div>
                          <p className="text-white">
                            Enable Vim Mode
                          </p>

                          <p className="text-gray-400 text-sm">
                            Use Vim keybindings in the editor
                          </p>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded bg-white/5 border-gray-700 text-blue-600"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <Code2 className="w-5 h-5 text-purple-400" />

                        <div>
                          <p className="text-white">
                            Auto Save
                          </p>

                          <p className="text-gray-400 text-sm">
                            Automatically save changes
                          </p>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded bg-white/5 border-gray-700 text-blue-600"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-green-400" />

                        <div>
                          <p className="text-white">
                            Format on Save
                          </p>

                          <p className="text-gray-400 text-sm">
                            Automatically format code on save
                          </p>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded bg-white/5 border-gray-700 text-blue-600"
                      />
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary">
                      Save Preferences
                    </Button>

                    <Button variant="outline">
                      Reset to Default
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card glass>
                <h2 className="text-xl text-white mb-6">
                  Notification Settings
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                    <div>
                      <p className="text-white">
                        Email Notifications
                      </p>

                      <p className="text-gray-400 text-sm">
                        Receive updates via email
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          email: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-white/5 border-gray-700 text-blue-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                    <div>
                      <p className="text-white">
                        Push Notifications
                      </p>

                      <p className="text-gray-400 text-sm">
                        Get notified in your browser
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          push: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-white/5 border-gray-700 text-blue-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                    <div>
                      <p className="text-white">
                        Chat Messages
                      </p>

                      <p className="text-gray-400 text-sm">
                        Notify when you receive chat messages
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.chat}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          chat: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-white/5 border-gray-700 text-blue-600"
                    />
                  </label>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card glass>
                <h2 className="text-xl text-white mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white mb-4">
                      Change Password
                    </h3>

                    <div className="space-y-4">
                      <Input
                        type="password"
                        label="Current Password"
                        placeholder="••••••••"
                      />

                      <Input
                        type="password"
                        label="New Password"
                        placeholder="••••••••"
                      />

                      <Input
                        type="password"
                        label="Confirm New Password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-white mb-4">
                      Two-Factor Authentication
                    </h3>

                    <p className="text-gray-400 mb-4">
                      Add an extra layer of security to your account
                    </p>

                    <Button variant="secondary">
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary">
                      Update Security
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}