import nodemailer from 'nodemailer';
import {
  EmailService,
  EmailOptions,
  EmailResult,
  EmailTemplate,
  Reminder,
  BillReminder,
  BudgetAlert,
  NotificationPreferences
} from '../types/email';

// Email Service Class
export class EmailNotificationService implements EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
  }

  // Send basic email
  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    try {
      const mailOptions = {
        from: options.from || process.env.GMAIL_USER,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        cc: options.cc,
        bcc: options.bcc,
        replyTo: options.replyTo,
        attachments: options.attachments
      };

      const result = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Send email using template
  async sendTemplate(templateId: string, data: any): Promise<EmailResult> {
    try {
      const template = await this.getTemplate(templateId);
      if (!template) {
        throw new Error(`Template ${templateId} not found`);
      }

      const processedTemplate = this.processTemplate(template, data);

      return await this.sendEmail({
        to: data.to,
        subject: processedTemplate.subject,
        html: processedTemplate.htmlContent,
        text: processedTemplate.textContent
      });
    } catch (error) {
      console.error('Error sending template email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Bill reminder emails
  async sendBillReminder(reminder: BillReminder): Promise<EmailResult> {
    const templateData = {
      to: reminder.userId, // This would be the user's email
      billName: 'Your Bill', // This would come from the bill data
      amount: '$100.00', // This would come from the bill data
      dueDate: reminder.reminderDate.toLocaleDateString(),
      daysUntilDue: Math.ceil((reminder.reminderDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    };

    return await this.sendTemplate('bill-reminder', templateData);
  }

  // Budget alert emails
  async sendBudgetAlert(alert: BudgetAlert): Promise<EmailResult> {
    const templateData = {
      to: alert.userId, // This would be the user's email
      budgetName: 'Your Budget', // This would come from the budget data
      spentAmount: '$500.00', // This would come from the budget data
      budgetAmount: '$600.00', // This would come from the budget data
      remainingAmount: '$100.00', // This would come from the budget data
      alertType: alert.alertType
    };

    return await this.sendTemplate('budget-alert', templateData);
  }

  // Welcome email
  async sendWelcomeEmail(email: string, name?: string): Promise<EmailResult> {
    const templateData = {
      to: email,
      name: name || 'there',
      loginUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/auth/signin`
    };

    return await this.sendTemplate('welcome', templateData);
  }

  // Investment alert emails
  async sendInvestmentAlert(
    email: string,
    symbol: string,
    alertType: string,
    message: string
  ): Promise<EmailResult> {
    const templateData = {
      to: email,
      symbol,
      alertType,
      message,
      dashboardUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/investments`
    };

    return await this.sendTemplate('investment-alert', templateData);
  }

  // Newsletter emails
  async sendNewsletter(email: string, newsletterData: any): Promise<EmailResult> {
    const templateData = {
      to: email,
      ...newsletterData,
      unsubscribeUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/unsubscribe`
    };

    return await this.sendTemplate('newsletter', templateData);
  }

  // Process template variables
  private processTemplate(template: EmailTemplate, data: any): {
    subject: string;
    htmlContent: string;
    textContent: string;
  } {
    let subject = template.subject;
    let htmlContent = template.htmlTemplate;
    let textContent = template.textTemplate;

    // Replace variables in templates
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      const value = data[key];
      subject = subject.replace(regex, value);
      htmlContent = htmlContent.replace(regex, value);
      textContent = textContent.replace(regex, value);
    });

    return { subject, htmlContent, textContent };
  }

  // Get email template (mock implementation)
  private async getTemplate(templateId: string): Promise<EmailTemplate | null> {
    const templates: Record<string, EmailTemplate> = {
      'welcome': {
        id: 'welcome',
        name: 'Welcome Email',
        category: 'welcome',
        subject: 'Welcome to MoneyTree, {{name}}!',
        htmlTemplate: `
          <h1>Welcome to MoneyTree!</h1>
          <p>Hi {{name}},</p>
          <p>Thank you for joining MoneyTree! We're excited to help you take control of your finances.</p>
          <p>Get started by logging into your account:</p>
          <a href="{{loginUrl}}" class="button">Login to MoneyTree</a>
          <p>Best regards,<br>The MoneyTree Team</p>
        `,
        textTemplate: `
          Welcome to MoneyTree!

          Hi {{name}},

          Thank you for joining MoneyTree! We're excited to help you take control of your finances.

          Get started by logging into your account: {{loginUrl}}

          Best regards,
          The MoneyTree Team
        `,
        variables: [
          { name: 'name', type: 'string', description: 'User name', required: true },
          { name: 'loginUrl', type: 'string', description: 'Login URL', required: true }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      'bill-reminder': {
        id: 'bill-reminder',
        name: 'Bill Reminder',
        category: 'bill_reminder',
        subject: 'Bill Due Soon: {{billName}}',
        htmlTemplate: `
          <h1>Bill Reminder</h1>
          <p>Hi there,</p>
          <p>This is a reminder that your bill <strong>{{billName}}</strong> for <strong>{{amount}}</strong> is due on <strong>{{dueDate}}</strong>.</p>
          <p>You have {{daysUntilDue}} days until the due date.</p>
          <p>Please make sure to pay this bill on time to avoid any late fees.</p>
          <p>Best regards,<br>MoneyTree</p>
        `,
        textTemplate: `
          Bill Reminder

          Hi there,

          This is a reminder that your bill {{billName}} for {{amount}} is due on {{dueDate}}.

          You have {{daysUntilDue}} days until the due date.

          Please make sure to pay this bill on time to avoid any late fees.

          Best regards,
          MoneyTree
        `,
        variables: [
          { name: 'billName', type: 'string', description: 'Bill name', required: true },
          { name: 'amount', type: 'string', description: 'Bill amount', required: true },
          { name: 'dueDate', type: 'string', description: 'Due date', required: true },
          { name: 'daysUntilDue', type: 'number', description: 'Days until due', required: true }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    return templates[templateId] || null;
  }
}

// Reminder scheduler class
export class ReminderScheduler {
  private emailService: EmailNotificationService;

  constructor() {
    this.emailService = new EmailNotificationService();
  }

  // Schedule bill reminders
  async scheduleBillReminders(bills: any[]): Promise<void> {
    for (const bill of bills) {
      const reminderDate = new Date(bill.dueDate);
      reminderDate.setDate(reminderDate.getDate() - (bill.reminderDays || 7));

      if (reminderDate > new Date() && !bill.reminderSent) {
        await this.emailService.sendBillReminder({
          id: `reminder-${bill.id}`,
          userId: bill.userId,
          billId: bill.id,
          reminderDate,
          status: 'pending',
          emailTemplate: 'bill-reminder'
        });
      }
    }
  }

  // Schedule budget alerts
  async scheduleBudgetAlerts(budgets: any[]): Promise<void> {
    for (const budget of budgets) {
      const spentPercent = (budget.spent / budget.amount) * 100;

      if (spentPercent >= 80 && !budget.alertSent) {
        await this.emailService.sendBudgetAlert({
          id: `alert-${budget.id}`,
          userId: budget.userId,
          budgetId: budget.id,
          alertType: spentPercent >= 100 ? 'exceeded' : 'warning',
          threshold: spentPercent,
          triggeredAt: new Date(),
          status: 'pending',
          message: `You've spent ${spentPercent.toFixed(1)}% of your ${budget.name} budget.`
        });
      }
    }
  }

  // Schedule investment alerts
  async scheduleInvestmentAlerts(alerts: any[]): Promise<void> {
    for (const alert of alerts) {
      // This would check current prices and send alerts when conditions are met
      // Implementation would depend on your investment data structure
      console.log('Processing investment alert:', alert);
    }
  }
}

// Export singleton instances
export const emailService = new EmailNotificationService();
export const reminderScheduler = new ReminderScheduler();
