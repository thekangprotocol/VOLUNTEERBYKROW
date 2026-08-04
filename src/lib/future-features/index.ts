/**
 * VOLUNTEER BY KROW - EXTENDED FEATURE ARCHITECTURE
 * Modular placeholders designed for seamless future extension.
 */

export interface VolunteerHoursRecord {
  id: string;
  volunteer_id: string;
  opportunity_id: string;
  hours_logged: number;
  verified_by_organizer: boolean;
  timestamp: string;
}

export interface QRCodeCheckIn {
  registration_id: string;
  qr_token: string;
  checked_in_at: string | null;
}

export interface NotificationPreference {
  user_id: string;
  email_reminders: boolean;
  push_notifications: boolean;
  new_matching_opportunities: boolean;
}

export interface AIRecommendationEngine {
  getRecommendedOpportunities: (volunteerId: string, userInterests: string[]) => Promise<string[]>;
}

export interface OrganizationReview {
  id: string;
  organization_id: string;
  volunteer_id: string;
  rating: number; // 1-5
  comment: string;
  created_at: string;
}

export const FUTURE_MODULES = {
  hoursTracking: { enabled: false, version: '1.0-draft' },
  qrCheckIn: { enabled: false, version: '1.0-draft' },
  pushNotifications: { enabled: false, version: '1.0-draft' },
  directMessaging: { enabled: false, version: '1.0-draft' },
  aiRecommendations: { enabled: false, version: '1.0-draft' },
  savedOpportunities: { enabled: false, version: '1.0-draft' },
  verificationBadge: { enabled: false, version: '1.0-draft' },
  reviewsAndRatings: { enabled: false, version: '1.0-draft' },
  adminDashboard: { enabled: false, version: '1.0-draft' },
  emailReminders: { enabled: false, version: '1.0-draft' },
  mapView: { enabled: false, version: '1.0-draft' },
  recurringEvents: { enabled: false, version: '1.0-draft' },
};
