// app/(routes)/settings/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full p-2 border rounded"
                  placeholder="Tell us about yourself"
                  rows={4}
                ></textarea>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </div>
        );
      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch id="sms-notifications" />
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
              </div>
              <Button type="submit">Update Security Settings</Button>
            </form>
          </div>
        );
      case "integrations":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Integrations</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Google Calendar</h3>
                  <p className="text-sm text-gray-500">Sync your events with Google Calendar</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Slack</h3>
                  <p className="text-sm text-gray-500">Receive notifications in Slack</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Zapier</h3>
                  <p className="text-sm text-gray-500">Automate your workflows</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex">
      <div className="w-64 mr-8">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <ul className="space-y-2">
          <li>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === "security" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("security")}
            >
              Security
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === "integrations" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("integrations")}
            >
              Integrations
            </Button>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}