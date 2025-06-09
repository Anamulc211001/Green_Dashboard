import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Key,
  Globe,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      timezone: 'America/New_York',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      marketingEmails: false,
      securityAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    appearance: {
      theme: 'light',
      sidebarCollapsed: false,
      compactMode: false,
      animations: true
    },
    data: {
      dataRetention: '365',
      autoBackup: true,
      exportFormat: 'json'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User size={16} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={16} /> },
    { id: 'security', name: 'Security', icon: <Shield size={16} /> },
    { id: 'appearance', name: 'Appearance', icon: <Palette size={16} /> },
    { id: 'data', name: 'Data & Privacy', icon: <Database size={16} /> },
  ];

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => updateSetting('profile', 'name', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => updateSetting('profile', 'email', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.profile.timezone}
              onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-gray-900 font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-600 text-sm">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications in browser'}
                  {key === 'weeklyReports' && 'Get weekly analytics reports'}
                  {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                  {key === 'securityAlerts' && 'Get alerts for security-related events'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-gray-900 font-medium">Two-Factor Authentication</h4>
              <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Expiry (days)
              </label>
              <select
                value={settings.security.passwordExpiry}
                onChange={(e) => updateSetting('security', 'passwordExpiry', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['light', 'dark', 'auto'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateSetting('appearance', 'theme', theme)}
                  className={`p-3 rounded-lg border transition-colors capitalize ${
                    settings.appearance.theme === theme
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300 text-gray-700'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.appearance).filter(([key]) => key !== 'theme').map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-gray-900 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {key === 'sidebarCollapsed' && 'Start with sidebar collapsed'}
                    {key === 'compactMode' && 'Use compact layout for better space utilization'}
                    {key === 'animations' && 'Enable smooth animations and transitions'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => updateSetting('appearance', key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention (days)
              </label>
              <select
                value={settings.data.dataRetention}
                onChange={(e) => updateSetting('data', 'dataRetention', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <select
                value={settings.data.exportFormat}
                onChange={(e) => updateSetting('data', 'exportFormat', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-gray-900 font-medium">Automatic Backup</h4>
              <p className="text-gray-600 text-sm">Automatically backup your data daily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.data.autoBackup}
                onChange={(e) => updateSetting('data', 'autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-red-700 font-medium mb-2">Danger Zone</h4>
            <p className="text-red-600 text-sm mb-4">
              These actions are irreversible. Please proceed with caution.
            </p>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                Export All Data
              </button>
              <button className="w-full px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'data':
        return renderDataSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              {renderTabContent()}
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-sm">
                    Changes are saved automatically
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;