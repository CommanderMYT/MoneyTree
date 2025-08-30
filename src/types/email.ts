// Email Service Types
export interface EmailService {
  sendEmail(options: EmailOptions): Promise<EmailResult>;
  sendTemplate(templateId: string, data: EmailTemplateData): Promise<EmailResult>;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: EmailAttachment[];
  metadata?: Record<string, any>;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
  encoding?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  details?: any;
}

export interface EmailTemplateData {
  to: string;
  templateId: string;
  variables: Record<string, any>;
  metadata?: Record<string, any>;
}

// Reminder Types
export interface Reminder {
  id: string;
  userId: string;
  type: ReminderType;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRecurring: boolean;
  recurrence?: RecurrenceRule;
  isActive: boolean;
  lastSent?: Date;
  nextSend?: Date;
  metadata?: Record<string, any>;
}

export type ReminderType =
  | 'bill_payment'
  | 'budget_review'
  | 'goal_checkin'
  | 'investment_review'
  | 'account_sync'
  | 'tax_deadline'
  | 'insurance_renewal'
  | 'subscription_renewal'
  | 'custom';

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  interval: number; // every N frequency
  endDate?: Date;
  count?: number; // number of occurrences
  daysOfWeek?: number[]; // 0-6, Sunday = 0
  daysOfMonth?: number[]; // 1-31
}

// Email Templates
export interface EmailTemplate {
  id: string;
  name: string;
  category: EmailCategory;
  subject: string;
  htmlTemplate: string;
  textTemplate: string;
  variables: EmailVariable[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EmailCategory =
  | 'welcome'
  | 'onboarding'
  | 'bill_reminder'
  | 'budget_alert'
  | 'goal_achievement'
  | 'investment_alert'
  | 'market_update'
  | 'newsletter'
  | 'password_reset'
  | 'account_security'
  | 'system_notification';

export interface EmailVariable {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'array';
  description: string;
  required: boolean;
  defaultValue?: any;
}

// Notification Preferences
export interface NotificationPreferences {
  userId: string;
  email: {
    enabled: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
    categories: {
      bills: boolean;
      budgets: boolean;
      goals: boolean;
      investments: boolean;
      market: boolean;
      system: boolean;
    };
  };
  push: {
    enabled: boolean;
    categories: {
      bills: boolean;
      budgets: boolean;
      goals: boolean;
      investments: boolean;
      market: boolean;
      system: boolean;
    };
  };
  sms: {
    enabled: boolean;
    phoneNumber?: string;
    categories: {
      urgent: boolean;
      bills: boolean;
    };
  };
  updatedAt: Date;
}

// Email Queue Types
export interface EmailQueueItem {
  id: string;
  templateId?: string;
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: EmailQueueStatus;
  scheduledFor?: Date;
  sentAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export type EmailQueueStatus =
  | 'pending'
  | 'scheduled'
  | 'sending'
  | 'sent'
  | 'failed'
  | 'cancelled';

// Bill Reminder Types
export interface BillReminder {
  id: string;
  userId: string;
  billId: string;
  reminderDate: Date;
  sentDate?: Date;
  status: 'pending' | 'sent' | 'failed';
  emailTemplate: string;
  smsSent?: boolean;
  pushSent?: boolean;
}

// Budget Alert Types
export interface BudgetAlert {
  id: string;
  userId: string;
  budgetId: string;
  alertType: 'warning' | 'exceeded' | 'approaching';
  threshold: number; // percentage
  triggeredAt: Date;
  sentDate?: Date;
  status: 'pending' | 'sent' | 'acknowledged';
  message: string;
}

// Goal Achievement Types
export interface GoalAchievement {
  id: string;
  userId: string;
  goalId: string;
  achievedAt: Date;
  celebrationSent?: Date;
  socialShare?: boolean;
  message: string;
}

// Investment Alert Types
export interface InvestmentAlert {
  id: string;
  userId: string;
  investmentId: string;
  alertType: 'price_target' | 'stop_loss' | 'take_profit' | 'dividend' | 'earnings';
  condition: {
    operator: 'above' | 'below' | 'equals';
    value: number;
  };
  triggeredAt?: Date;
  sentDate?: Date;
  status: 'active' | 'triggered' | 'expired';
  message: string;
}

// Newsletter Types
export interface Newsletter {
  id: string;
  title: string;
  content: string;
  summary: string;
  publishDate: Date;
  status: 'draft' | 'scheduled' | 'published';
  subscriberCount: number;
  openRate?: number;
  clickRate?: number;
  tags: string[];
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  preferences: {
    frequency: 'daily' | 'weekly' | 'monthly';
    categories: string[];
  };
  status: 'active' | 'unsubscribed' | 'bounced';
}

// Email Analytics Types
export interface EmailAnalytics {
  templateId?: string;
  campaignId?: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  complained: number;
  unsubscribed: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

// SMTP Configuration Types
export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized?: boolean;
  };
}

// Email Provider Types
export interface EmailProvider {
  name: string;
  type: 'smtp' | 'sendgrid' | 'mailgun' | 'ses' | 'postmark';
  config: Record<string, any>;
  isActive: boolean;
  dailyLimit?: number;
  monthlyLimit?: number;
  rateLimit?: number;
}

// Bounce Handling Types
export interface BounceEvent {
  id: string;
  email: string;
  bounceType: 'hard' | 'soft' | 'complaint';
  bounceSubType?: string;
  diagnosticCode?: string;
  statusCode?: string;
  occurredAt: Date;
  processedAt?: Date;
  actionTaken?: 'none' | 'unsubscribe' | 'suppress';
}
