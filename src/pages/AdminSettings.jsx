import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const LS_KEY = "admin_settings_v1";

const defaultSettings = {
  siteName: "GEMORA",
  adminEmail: "admin@gemora.com",

  // notifications
  notifyNewInstrumentSubmissions: true,
  notifyCertificateValidations: true,
  notifyNewsPostComments: false,

  // security
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",

  // appearance
  darkMode: false,
  compactView: false,
};

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition ${
        checked ? "bg-black" : "bg-gray-200"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 transition-all w-5 h-5 rounded-full bg-white shadow ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function AdminSettings() {
  const [s, setS] = useState(defaultSettings);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setS((prev) => ({ ...prev, ...parsed }));
    } catch {
      // ignore
    }
  }, []);

  const update = (key, value) => setS((p) => ({ ...p, [key]: value }));

  const save = () => {
    // Simple validation for password section
    if (s.newPassword || s.confirmPassword || s.currentPassword) {
      if (!s.currentPassword) return alert("Please enter current password.");
      if (!s.newPassword) return alert("Please enter new password.");
      if (s.newPassword.length < 6) return alert("New password must be at least 6 characters.");
      if (s.newPassword !== s.confirmPassword) return alert("New password and confirm password do not match.");
    }

    // Save only settings (not passwords)
    const toSave = {
      siteName: s.siteName,
      adminEmail: s.adminEmail,

      notifyNewInstrumentSubmissions: s.notifyNewInstrumentSubmissions,
      notifyCertificateValidations: s.notifyCertificateValidations,
      notifyNewsPostComments: s.notifyNewsPostComments,

      darkMode: s.darkMode,
      compactView: s.compactView,
    };

    localStorage.setItem(LS_KEY, JSON.stringify(toSave));

    // clear password fields after save
    setS((p) => ({ ...p, currentPassword: "", newPassword: "", confirmPassword: "" }));

    setSavedMsg("Saved!");
    setTimeout(() => setSavedMsg(""), 1800);
  };

  return (
    <div className={`min-h-screen ${s.darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <AdminSidebar />

      {/* content offset because sidebar fixed width = 64 */}
      <div className="ml-64">
        {/* top bar */}
        <div className={`h-16 border-b flex items-center justify-between px-6 ${s.darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="font-semibold text-gray-900">
            <span className={`${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Settings</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                placeholder="Search..."
                className={`w-64 rounded-lg border px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200 ${
                  s.darkMode ? "bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400" : "bg-white border-gray-200"
                }`}
              />
              <span className={`absolute left-3 top-2.5 ${s.darkMode ? "text-gray-400" : "text-gray-400"}`}>🔎</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                AD
              </div>
              <div className={`text-sm ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Admin</div>
              <div className={`text-gray-400 text-sm`}>▾</div>
            </div>
          </div>
        </div>

        {/* page content */}
        <div className={`px-6 py-6 ${s.compactView ? "max-w-4xl" : "max-w-5xl"} mx-auto`}>
          <h1 className={`text-2xl font-bold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Settings</h1>
          <p className={`text-sm mt-1 ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Manage your admin dashboard preferences
          </p>

          {/* General Settings */}
          <div className={`mt-6 rounded-xl border shadow-sm ${s.darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>🌐</div>
                <div>
                  <h2 className={`font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>General Settings</h2>
                  <p className={`text-sm ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Configure general dashboard settings</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-semibold ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>Site Name</label>
                  <input
                    value={s.siteName}
                    onChange={(e) => update("siteName", e.target.value)}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200 ${
                      s.darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-sm font-semibold ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>Admin Email</label>
                  <input
                    value={s.adminEmail}
                    onChange={(e) => update("adminEmail", e.target.value)}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200 ${
                      s.darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className={`mt-6 rounded-xl border shadow-sm ${s.darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>🔔</div>
                <div>
                  <h2 className={`font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Notifications</h2>
                  <p className={`text-sm ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Manage notification preferences</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>New Instrument Submissions</div>
                    <div className={`text-xs ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Get notified when new instruments are submitted</div>
                  </div>
                  <Toggle
                    checked={s.notifyNewInstrumentSubmissions}
                    onChange={(v) => update("notifyNewInstrumentSubmissions", v)}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Certificate Validations</div>
                    <div className={`text-xs ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Get notified about certificate verification requests</div>
                  </div>
                  <Toggle
                    checked={s.notifyCertificateValidations}
                    onChange={(v) => update("notifyCertificateValidations", v)}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>News Post Comments</div>
                    <div className={`text-xs ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Get notified when users comment on news posts</div>
                  </div>
                  <Toggle
                    checked={s.notifyNewsPostComments}
                    onChange={(v) => update("notifyNewsPostComments", v)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className={`mt-6 rounded-xl border shadow-sm ${s.darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>🔒</div>
                <div>
                  <h2 className={`font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Security</h2>
                  <p className={`text-sm ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Manage security and privacy settings</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className={`text-sm font-semibold ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>Current Password</label>
                  <input
                    type="password"
                    value={s.currentPassword}
                    onChange={(e) => update("currentPassword", e.target.value)}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                      s.darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-200"
                    }`}
                    placeholder="********"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-semibold ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>New Password</label>
                    <input
                      type="password"
                      value={s.newPassword}
                      onChange={(e) => update("newPassword", e.target.value)}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                        s.darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-200"
                      }`}
                      placeholder="********"
                    />
                  </div>

                  <div>
                    <label className={`text-sm font-semibold ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>Confirm Password</label>
                    <input
                      type="password"
                      value={s.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                        s.darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-200"
                      }`}
                      placeholder="********"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={save}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      s.darkMode
                        ? "border-gray-700 text-gray-100 hover:bg-gray-800"
                        : "border-gray-200 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className={`mt-6 rounded-xl border shadow-sm ${s.darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${s.darkMode ? "text-gray-200" : "text-gray-700"}`}>🎨</div>
                <div>
                  <h2 className={`font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Appearance</h2>
                  <p className={`text-sm ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Customize the look and feel</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Dark Mode</div>
                    <div className={`text-xs ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Enable dark theme for the dashboard</div>
                  </div>
                  <Toggle checked={s.darkMode} onChange={(v) => update("darkMode", v)} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-semibold ${s.darkMode ? "text-gray-100" : "text-gray-900"}`}>Compact View</div>
                    <div className={`text-xs ${s.darkMode ? "text-gray-400" : "text-gray-500"}`}>Use a more condensed layout</div>
                  </div>
                  <Toggle checked={s.compactView} onChange={(v) => update("compactView", v)} />
                </div>
              </div>
            </div>
          </div>

          {/* Save button bottom-right */}
          <div className="mt-6 flex justify-end items-center gap-3">
            {savedMsg ? (
              <span className={`text-sm ${s.darkMode ? "text-green-300" : "text-green-600"}`}>{savedMsg}</span>
            ) : null}

            <button
              type="button"
              onClick={save}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm shadow"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
