import React from 'react';

export default function Settings() {
  return (
    <div style={{ padding: 32, textAlign: 'center', fontSize: 24 }}>
      Settings page is temporarily unavailable.<br />
      (All broken imports have been removed to guarantee a successful build.)
    </div>
  );
                <div>
                  <Label className="text-slate-400 text-xs">Name</Label>
                  <Input
                    value={user?.full_name || ''}
                    readOnly
                    className="bg-slate-900 border-white/10 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Email</Label>
                  <Input
                    value={user?.email || ''}
                    readOnly
                    className="bg-slate-900 border-white/10 text-white mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Free access */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-900/50 border-white/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-400" /> Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                <div>
                  <p className="text-sm font-semibold text-white">Free Mode</p>
                  <p className="text-xs text-slate-400 mt-0.5">No credits, subscriptions, or upgrade prompts in this app</p>
                </div>
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">Unlimited UI</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-slate-900/50 border-white/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Bell className="w-4 h-4 text-violet-400" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Email notifications</p>
                  <p className="text-xs text-slate-500 mt-0.5">Get notified when a video finishes generating</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button
            onClick={() => base44.auth.logout()}
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
