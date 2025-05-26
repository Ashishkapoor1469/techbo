
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@radix-ui/react-switch';

export default function SettingsPage() {
  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences.</p>
      </header>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="theme-toggle" className="text-base font-medium">
                Theme
              </Label>
              <p className="text-sm text-muted-foreground">
                Select the application theme.
              </p>
            </div>
            <ThemeToggle />
          </div>
          {/* Example of another setting item structure */}
          <Separator />
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-toggle" className="text-base font-medium">
                Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Manage your notification preferences.
              </p>
            </div>
            <Switch id="notifications-toggle" disabled />
          </div>
        </CardContent>
      </Card>
      
      {/* Add more setting categories as new cards below */}
      {/* 
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Account settings will go here.</p>
        </CardContent>
      </Card>
      */}
    </section>
  );
}
