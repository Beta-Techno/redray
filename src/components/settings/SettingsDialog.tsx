import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  UserIcon, 
  PaletteIcon, 
  KeyboardIcon, 
  WrenchIcon,
  MonitorIcon,
  ShieldIcon,
  CloudIcon,
  BellIcon,
  MailIcon,
  GlobeIcon,
  EyeIcon,
  KeyIcon,
  X,
} from 'lucide-react';
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  darkMode: z.boolean().default(true),
  theme: z.enum(["system", "light", "dark"]),
  notifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  autoSave: z.boolean().default(true),
  syncEnabled: z.boolean().default(true),
  fontSize: z.string().default("14"),
  language: z.string().default("en"),
})

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colors = [
  { name: "slate", label: "Slate" },
  { name: "zinc", label: "Zinc" },
  { name: "stone", label: "Stone" },
  { name: "gray", label: "Gray" },
  { name: "neutral", label: "Neutral" },
  { name: "red", label: "Red" },
  { name: "rose", label: "Rose" },
  { name: "orange", label: "Orange" },
  { name: "green", label: "Green" },
  { name: "blue", label: "Blue" },
  { name: "yellow", label: "Yellow" },
  { name: "violet", label: "Violet" },
];

function ColorPreview({ colorName }: { colorName: string }) {
  const themeColors = {
    slate: { primary: "hsl(215, 25%, 27%)", background: "hsl(215, 20%, 99%)", hover: "hsl(215, 25%, 90%)" },
    zinc: { primary: "hsl(240, 5%, 34%)", background: "hsl(240, 5%, 99%)", hover: "hsl(240, 5%, 90%)" },
    stone: { primary: "hsl(25, 5%, 35%)", background: "hsl(25, 5%, 99%)", hover: "hsl(25, 5%, 90%)" },
    gray: { primary: "hsl(220, 5%, 35%)", background: "hsl(220, 5%, 99%)", hover: "hsl(220, 5%, 90%)" },
    neutral: { primary: "hsl(0, 0%, 35%)", background: "hsl(0, 0%, 99%)", hover: "hsl(0, 0%, 90%)" },
    red: { primary: "hsl(0, 95%, 50%)", background: "hsl(0, 95%, 99%)", hover: "hsl(0, 95%, 90%)" },
    rose: { primary: "hsl(346, 95%, 50%)", background: "hsl(346, 95%, 99%)", hover: "hsl(346, 95%, 90%)" },
    orange: { primary: "hsl(24, 95%, 50%)", background: "hsl(24, 95%, 99%)", hover: "hsl(24, 95%, 90%)" },
    green: { primary: "hsl(142, 76%, 36%)", background: "hsl(142, 76%, 99%)", hover: "hsl(142, 76%, 90%)" },
    blue: { primary: "hsl(217, 91%, 60%)", background: "hsl(217, 100%, 99%)", hover: "hsl(217, 91%, 90%)" },
    yellow: { primary: "hsl(45, 95%, 50%)", background: "hsl(45, 95%, 99%)", hover: "hsl(45, 95%, 90%)" },
    violet: { primary: "hsl(270, 95%, 50%)", background: "hsl(270, 95%, 99%)", hover: "hsl(270, 95%, 90%)" }
  };

  const colors = themeColors[colorName as keyof typeof themeColors];

  return (
    <div className="flex">
      <div 
        className="h-4 w-2 rounded-l-full" 
        style={{
          backgroundColor: colors.primary,
        }}
      />
      <div 
        className="h-4 w-2 rounded-r-full" 
        style={{
          backgroundColor: colors.background,
          border: `1px solid ${colors.primary}`
        }}
      />
    </div>
  );
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("general");
  const { setTheme, theme } = useTheme();
  const [currentColor, setCurrentColor] = React.useState(() => {
    // Try to get the saved color from localStorage, default to "slate" if not found
    if (typeof window !== 'undefined') {
      return localStorage.getItem('redray-color') || "slate";
    }
    return "slate";
  });

  React.useEffect(() => {
    // Save color to localStorage whenever it changes
    localStorage.setItem('redray-color', currentColor);
    // Update the data-theme attribute on the root element
    document.documentElement.setAttribute("data-theme", currentColor);
  }, [currentColor]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      darkMode: true,
      theme: "system",
      notifications: true,
      emailNotifications: true,
      autoSave: true,
      syncEnabled: true,
      fontSize: "14",
      language: "en",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`
          sm:max-w-[800px]
          [&>button]:absolute [&>button]:top-6 [&>button]:right-6
          [&>button]:opacity-70 [&>button]:transition-all [&>button]:hover:opacity-100
          [&>button]:hover:bg-accent [&>button]:rounded-sm [&>button]:p-2
          [&>button]:focus-visible:outline-none [&>button]:focus-visible:ring-2
          [&>button]:focus-visible:ring-ring [&>button]:active:translate-y-px
          [&>button_svg]:h-4 [&>button_svg]:w-4 [&>button_svg]:stroke-[1.5px]
          [&>button]:flex [&>button]:items-center [&>button]:justify-center
        `}
      >
        <DialogHeader className="border-b pb-4 px-6 pt-6">
          <DialogTitle className="text-xl font-medium flex items-center gap-2.5">
            <WrenchIcon className="w-5 h-5 text-muted-foreground" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex gap-8">
              {/* Left side - Tab list */}
              <div className="w-52">
                <TabsList className="flex flex-col h-auto bg-transparent gap-1">
                  <TabsTrigger 
                    value="general" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "general" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "general" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "general") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <WrenchIcon className="w-4 h-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "appearance" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "appearance" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "appearance") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <PaletteIcon className="w-4 h-4" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="keyboard" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "keyboard" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "keyboard" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "keyboard") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <KeyboardIcon className="w-4 h-4" />
                    Keyboard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="display" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "display" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "display" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "display") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <MonitorIcon className="w-4 h-4" />
                    Display
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "account" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "account" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "account") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <UserIcon className="w-4 h-4" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "security" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "security" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "security") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <ShieldIcon className="w-4 h-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sync" 
                    className="w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeTab === "sync" ? "hsl(var(--accent))" : "transparent",
                      color: activeTab === "sync" ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "sync") {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "hsl(var(--popover-foreground))";
                      }
                    }}
                  >
                    <CloudIcon className="w-4 h-4" />
                    Sync
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Right side - Content */}
              <div className="flex-1 min-h-[400px]">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <TabsContent value="general" className="mt-0 space-y-4">
                      <Card>
                        <CardContent className="space-y-6 p-6">
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="language"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <FormLabel>Language</FormLabel>
                                    <FormDescription>
                                      Select your preferred language
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="w-[180px]"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Separator />
                            <FormField
                              control={form.control}
                              name="autoSave"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <FormLabel>Auto-save</FormLabel>
                                    <FormDescription>
                                      Automatically save changes
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="appearance" className="mt-0">
                      <Card>
                        <CardContent className="space-y-8 p-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Theme</h3>
                            <p className="text-sm text-muted-foreground">
                              Choose between light, dark, or system theme
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant={theme === 'light' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setTheme('light')}
                                className="gap-2"
                              >
                                <Sun className="h-4 w-4" />
                                Light
                              </Button>
                              <Button
                                variant={theme === 'dark' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setTheme('dark')}
                                className="gap-2"
                              >
                                <Moon className="h-4 w-4" />
                                Dark
                              </Button>
                              <Button
                                variant={theme === 'system' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setTheme('system')}
                              >
                                System
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Colors</h3>
                            <p className="text-sm text-muted-foreground">
                              Choose your preferred color scheme
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {colors.map((color) => {
                                const themeColors = {
                                  slate: { primary: "hsl(215, 25%, 27%)", background: "hsl(215, 20%, 99%)", hover: "hsl(215, 25%, 90%)" },
                                  zinc: { primary: "hsl(240, 5%, 34%)", background: "hsl(240, 5%, 99%)", hover: "hsl(240, 5%, 90%)" },
                                  stone: { primary: "hsl(25, 5%, 35%)", background: "hsl(25, 5%, 99%)", hover: "hsl(25, 5%, 90%)" },
                                  gray: { primary: "hsl(220, 5%, 35%)", background: "hsl(220, 5%, 99%)", hover: "hsl(220, 5%, 90%)" },
                                  neutral: { primary: "hsl(0, 0%, 35%)", background: "hsl(0, 0%, 99%)", hover: "hsl(0, 0%, 90%)" },
                                  red: { primary: "hsl(0, 95%, 50%)", background: "hsl(0, 95%, 99%)", hover: "hsl(0, 95%, 90%)" },
                                  rose: { primary: "hsl(346, 95%, 50%)", background: "hsl(346, 95%, 99%)", hover: "hsl(346, 95%, 90%)" },
                                  orange: { primary: "hsl(24, 95%, 50%)", background: "hsl(24, 95%, 99%)", hover: "hsl(24, 95%, 90%)" },
                                  green: { primary: "hsl(142, 76%, 36%)", background: "hsl(142, 76%, 99%)", hover: "hsl(142, 76%, 90%)" },
                                  blue: { primary: "hsl(217, 91%, 60%)", background: "hsl(217, 100%, 99%)", hover: "hsl(217, 91%, 90%)" },
                                  yellow: { primary: "hsl(45, 95%, 50%)", background: "hsl(45, 95%, 99%)", hover: "hsl(45, 95%, 90%)" },
                                  violet: { primary: "hsl(270, 95%, 50%)", background: "hsl(270, 95%, 99%)", hover: "hsl(270, 95%, 90%)" }
                                };
                                const colors = themeColors[color.name as keyof typeof themeColors];
                                
                                return (
                                  <Button
                                    key={color.name}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentColor(color.name)}
                                    className="justify-start gap-2 relative overflow-hidden group transition-colors"
                                    style={{
                                      backgroundColor: currentColor === color.name ? colors.primary : colors.background,
                                      color: currentColor === color.name ? colors.background : colors.primary,
                                      borderColor: colors.primary,
                                      '--hover-bg': colors.hover,
                                      '--hover-color': colors.primary
                                    } as React.CSSProperties}
                                    onMouseEnter={(e) => {
                                      if (currentColor !== color.name) {
                                        e.currentTarget.style.backgroundColor = colors.hover;
                                        e.currentTarget.style.color = colors.primary;
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (currentColor !== color.name) {
                                        e.currentTarget.style.backgroundColor = colors.background;
                                        e.currentTarget.style.color = colors.primary;
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <ColorPreview colorName={color.name} />
                                      {color.label}
                                    </div>
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="account" className="mt-0">
                      <Card>
                        <CardContent className="space-y-6 p-6">
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="bg-[#333333] border-[#404040] text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    className="bg-[#333333] border-[#404040] text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="security" className="mt-0">
                      <Card>
                        <CardContent className="space-y-6 p-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium flex items-center gap-2">
                              <KeyIcon className="w-4 h-4" />
                              Security Settings
                            </h3>
                            <FormField
                              control={form.control}
                              name="notifications"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <FormLabel>Security notifications</FormLabel>
                                    <FormDescription>
                                      Receive notifications about security updates
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sync" className="mt-0">
                      <Card>
                        <CardContent className="space-y-6 p-6">
                          <FormField
                            control={form.control}
                            name="syncEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <FormLabel>Cloud sync</FormLabel>
                                  <FormDescription>
                                    Sync your settings across devices
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </form>
                </Form>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
} 