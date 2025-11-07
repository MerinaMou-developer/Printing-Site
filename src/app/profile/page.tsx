"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  updateProfile,
  changePassword,
} from "@/services/auth.service";
import { useAuth } from "@/context/auth-context";
import { APIError } from "@/lib/api-client";
import { useToast } from "@/components/toast-provider";
import {
  Loader2,
  UserRound,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe2,
  Save,
  ShieldCheck,
  KeyRound,
  Lock,
} from "lucide-react";

type ProfileFormState = Pick<
  User,
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "state"
  | "country"
  | "company_name"
>;

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();

  const [profileForm, setProfileForm] = useState<ProfileFormState>(() =>
    createProfileState()
  );
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  });

  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const userInitial = useMemo(() => user?.first_name?.[0] || user?.username?.[0], [
    user,
  ]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/login?redirect=/profile");
      } else if (user) {
        setProfileForm(createProfileState(user));
      }
    }
  }, [loading, isAuthenticated, user, router]);

  const handleProfileChange = <K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K]
  ) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleProfileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    setProfileSaving(true);
    try {
      await updateProfile(profileForm);
      await refreshUser();
      showSuccess("Profile updated", "Your contact details are now up to date.");
    } catch (error) {
      showError(
        "Update failed",
        resolveErrorMessage(error, "Unable to update profile")
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!passwordForm.old_password || !passwordForm.new_password) {
      showError(
        "Incomplete form",
        "Please complete all password fields."
      );
      return;
    }
    if (passwordForm.new_password !== passwordForm.new_password_confirm) {
      showError("Mismatch", "New passwords do not match.");
      return;
    }
    if (passwordForm.new_password.length < 8) {
      showError(
        "Password too short",
        "New password must be at least 8 characters long."
      );
      return;
    }

    setPasswordSaving(true);
    try {
      await changePassword(passwordForm);
      setPasswordForm({ old_password: "", new_password: "", new_password_confirm: "" });
      showSuccess("Password updated", "Your password has been secured.");
    } catch (error) {
      showError(
        "Update failed",
        resolveErrorMessage(error, "Unable to update password")
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)]">
        <div className="flex items-center gap-3 text-white/80">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Preparing your profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_60px_-30px_rgba(15,45,75,0.45)]">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/0 to-white/10" />
          <div className="relative px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-semibold text-white shadow-[0_15px_35px_-20px_rgba(15,45,75,0.55)]">
                {userInitial?.toUpperCase() || <UserRound className="h-10 w-10" />}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70 font-semibold">Account Center</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                  Welcome back, {user?.first_name || user?.username}
                </h1>
                <p className="text-white/70 mt-3 max-w-2xl">
                  Manage your personal information, company details, and account security in one beautiful, streamlined experience.
                </p>
              </div>
            </div>
            <div className="ml-auto grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-white/80 max-w-xl">
              <InfoChip icon={<Mail className="h-4 w-4" />} label="Email" value={user?.email} />
              <InfoChip icon={<Phone className="h-4 w-4" />} label="Phone" value={user?.phone || "Add phone"} />
              <InfoChip icon={<Building2 className="h-4 w-4" />} label="Company" value={user?.company_name || "Add company"} />
              <InfoChip icon={<MapPin className="h-4 w-4" />} label="Location" value={formatLocation(user)} />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <form
            onSubmit={handleProfileSubmit}
            className="rounded-3xl bg-white shadow-[0_30px_60px_-35px_rgba(15,45,75,0.4)] border border-gray-100 flex flex-col"
          >
            <div className="px-8 py-7 border-b border-gray-100 flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-brand-500)]">
                  <ShieldCheck className="h-4 w-4" /> Profile Settings
                </div>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-brand-900)]">
                  Personal & Business Details
                </h2>
                <p className="mt-1 text-sm text-gray-500 max-w-xl">
                  Keep your contact and company details up to date so we can tailor orders perfectly.
                </p>
              </div>
            </div>

            <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={<UserRound className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="First name"
                value={profileForm.first_name}
                onChange={(value) => handleProfileChange("first_name", value)}
                required
              />
              <InputField
                icon={<UserRound className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Last name"
                value={profileForm.last_name}
                onChange={(value) => handleProfileChange("last_name", value)}
                required
              />
              <InputField
                icon={<Mail className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Email"
                type="email"
                value={profileForm.email}
                onChange={(value) => handleProfileChange("email", value)}
                required
              />
              <InputField
                icon={<Phone className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Phone"
                value={profileForm.phone || ""}
                onChange={(value) => handleProfileChange("phone", value)}
              />
              <InputField
                icon={<Building2 className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Company name"
                value={profileForm.company_name || ""}
                onChange={(value) => handleProfileChange("company_name", value)}
              />
              <InputField
                icon={<MapPin className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Address"
                value={profileForm.address || ""}
                onChange={(value) => handleProfileChange("address", value)}
              />
              <InputField
                icon={<Globe2 className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="City"
                value={profileForm.city || ""}
                onChange={(value) => handleProfileChange("city", value)}
              />
              <InputField
                icon={<Globe2 className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="State / Emirate"
                value={profileForm.state || ""}
                onChange={(value) => handleProfileChange("state", value)}
              />
              <InputField
                icon={<Globe2 className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Country"
                value={profileForm.country || ""}
                onChange={(value) => handleProfileChange("country", value)}
              />
            </div>

            <div className="px-8 pb-8">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent-500)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent-500)]/30 hover:bg-[var(--color-accent-600)] transition disabled:opacity-60"
                disabled={profileSaving}
              >
                {profileSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>

          <form
            onSubmit={handlePasswordSubmit}
            className="rounded-3xl bg-white shadow-[0_30px_60px_-35px_rgba(15,45,75,0.4)] border border-gray-100 flex flex-col"
          >
            <div className="px-8 py-7 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-brand-500)]">
                <KeyRound className="h-4 w-4" /> Password
              </div>
              <h2 className="mt-2 text-2xl font-bold text-[var(--color-brand-900)]">
                Secure your account
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose a strong password with at least 8 characters. Keep it unique for your print orders.
              </p>
            </div>

            <div className="px-8 py-8 space-y-5 flex-1">
              <InputField
                icon={<Lock className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Current password"
                type="password"
                value={passwordForm.old_password}
                onChange={(value) =>
                  setPasswordForm((prev) => ({ ...prev, old_password: value }))
                }
                required
              />
              <InputField
                icon={<ShieldCheck className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="New password"
                type="password"
                value={passwordForm.new_password}
                onChange={(value) =>
                  setPasswordForm((prev) => ({ ...prev, new_password: value }))
                }
                helperText="Minimum 8 characters, mix letters & numbers for extra security."
                required
              />
              <InputField
                icon={<ShieldCheck className="h-4 w-4 text-[var(--color-brand-400)]" />}
                label="Confirm new password"
                type="password"
                value={passwordForm.new_password_confirm}
                onChange={(value) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    new_password_confirm: value,
                  }))
                }
                required
              />
            </div>

            <div className="px-8 pb-8">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-700)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-brand-700)]/30 hover:bg-[var(--color-brand-800)] transition disabled:opacity-60"
                disabled={passwordSaving}
              >
                {passwordSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Update password
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

function createProfileState(user?: User | null): ProfileFormState {
  return {
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "",
    country: user?.country ?? "",
    company_name: user?.company_name ?? "",
  };
}

function formatLocation(user?: User | null) {
  if (!user) return "Add location";
  const parts = [user.city, user.state, user.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Add location";
}

function resolveErrorMessage(error: unknown, fallback: string) {
  if (error instanceof APIError) {
    if (error.errors) {
      const firstKey = Object.keys(error.errors)[0];
      if (firstKey) {
        const value = error.errors[firstKey];
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
      }
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  type?: string;
  required?: boolean;
  helperText?: string;
}

function InputField({
  label,
  value,
  onChange,
  icon,
  type = "text",
  required,
  helperText,
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        {label}
        {required && <span className="text-[var(--color-accent-500)]"> *</span>}
      </span>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur px-3 py-3 text-[var(--color-brand-900)] shadow-inner shadow-gray-200/40 focus:border-[var(--color-accent-500)] focus:ring-2 focus:ring-[var(--color-accent-200)] transition ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
      {helperText && <span className="text-xs text-gray-500">{helperText}</span>}
    </label>
  );
}

interface InfoChipProps {
  icon: ReactNode;
  label: string;
  value?: string | null;
}

function InfoChip({ icon, label, value }: InfoChipProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-black/10 max-w-full">
      <span className="text-white/70">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50 font-semibold">
          {label}
        </span>
        <span className="text-sm text-white font-medium truncate">
          {value || "Not provided"}
        </span>
      </div>
    </div>
  );
}

