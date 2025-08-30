"use client";

import { useState, useEffect } from 'react';
import { Reminder, NotificationPreferences } from '../types/email';

interface EmailReminderSettingsProps {
  userId: string;
}

export default function EmailReminderSettings({ userId }: EmailReminderSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    userId,
    email: {
      enabled: true,
      frequency: 'daily',
      categories: {
        bills: true,
        budgets: true,
        goals: true,
        investments: true,
        market: false,
        system: true
      }
    },
    push: {
      enabled: false,
      categories: {
        bills: true,
        budgets: true,
        goals: true,
        investments: false,
        market: false,
        system: false
      }
    },
    sms: {
      enabled: false,
      phoneNumber: '',
      categories: {
        urgent: true,
        bills: false
      }
    },
    updatedAt: new Date()
  });

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserPreferences();
    loadReminders();
  }, [userId]);

  const loadUserPreferences = async () => {
    try {
      // This would load from your database
      // For now, using default preferences
      console.log('Loading user preferences...');
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const loadReminders = async () => {
    try {
      // This would load from your database
      const mockReminders: Reminder[] = [
        {
          id: '1',
          userId,
          type: 'bill_payment',
          title: 'Internet Bill Due',
          description: 'Comcast bill payment reminder',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          priority: 'medium',
          isRecurring: true,
          isActive: true,
          nextSend: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          metadata: { billId: 'internet-bill-001' }
        },
        {
          id: '2',
          userId,
          type: 'budget_review',
          title: 'Monthly Budget Review',
          description: 'Review your spending for this month',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          priority: 'low',
          isRecurring: true,
          isActive: true,
          nextSend: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
          metadata: {}
        }
      ];
      setReminders(mockReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      setLoading(true);
      const updatedPreferences = { ...preferences, ...newPreferences, updatedAt: new Date() };
      setPreferences(updatedPreferences);

      // This would save to your database
      console.log('Saving preferences:', updatedPreferences);

      // Show success message
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Error updating preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleEmailCategory = (category: keyof typeof preferences.email.categories) => {
    const newPreferences = {
      ...preferences,
      email: {
        ...preferences.email,
        categories: {
          ...preferences.email.categories,
          [category]: !preferences.email.categories[category]
        }
      }
    };
    updatePreferences(newPreferences);
  };

  const togglePushCategory = (category: keyof typeof preferences.push.categories) => {
    const newPreferences = {
      ...preferences,
      push: {
        ...preferences.push,
        categories: {
          ...preferences.push.categories,
          [category]: !preferences.push.categories[category]
        }
      }
    };
    updatePreferences(newPreferences);
  };

  const sendTestEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        alert('Test email sent successfully!');
      } else {
        throw new Error('Failed to send test email');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Error sending test email. Please check your email settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Email Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Enable Email Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive important updates via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.email.enabled}
                onChange={(e) => updatePreferences({
                  email: { ...preferences.email, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {preferences.email.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Email Frequency</label>
                <select
                  value={preferences.email.frequency}
                  onChange={(e) => updatePreferences({
                    email: { ...preferences.email, frequency: e.target.value as any }
                  })}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="immediate">Immediate</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Summary</option>
                </select>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Email Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(preferences.email.categories).map(([category, enabled]) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => toggleEmailCategory(category as keyof typeof preferences.email.categories)}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Push Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Enable Push Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive notifications in your browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.push.enabled}
                onChange={(e) => updatePreferences({
                  push: { ...preferences.push, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {preferences.push.enabled && (
            <div>
              <h4 className="font-semibold mb-2">Push Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(preferences.push.categories).map(([category, enabled]) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => togglePushCategory(category as keyof typeof preferences.push.categories)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Reminders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Active Reminders</h2>

        <div className="space-y-4">
          {reminders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No active reminders</p>
          ) : (
            reminders.map((reminder) => (
              <div key={reminder.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{reminder.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reminder.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Due: {reminder.dueDate.toLocaleDateString()}
                    </p>
                    {reminder.nextSend && (
                      <p className="text-sm text-blue-600">
                        Next reminder: {reminder.nextSend.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    reminder.priority === 'high' ? 'bg-red-100 text-red-800' :
                    reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {reminder.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Test Email */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Test Email</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Send a test email to verify your email settings are working correctly.
        </p>
        <button
          onClick={sendTestEmail}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Test Email'}
        </button>
      </div>
    </div>
  );
}
