/**
 * @fileoverview Notification Templates
 * Standardized templates for different types of notifications
 */

# Notification Templates

This document outlines the standardized templates used within the EDU Matrix Notification System.

## Template Structure

All notification templates follow this JSON structure:

```json
{
  "templateId": "unique_template_identifier",
  "title": "{{variable}} Title with placeholders",
  "body": "Full notification message with {{variable}} placeholders",
  "channels": ["in-app", "email", "push", "sms"],
  "category": "ACADEMIC|SOCIAL|ADMINISTRATIVE|SYSTEM",
  "priority": "HIGH|MEDIUM|LOW",
  "actions": [
    {
      "label": "Action Button Text",
      "url": "{{actionUrl}}",
      "type": "PRIMARY|SECONDARY|LINK"
    }
  ],
  "metadata": {
    "icon": "icon-class-name",
    "color": "#HEX-color-code",
    "sound": "sound-file-name"
  }
}
```

## Standard Templates

### Academic Notifications

#### course_assignment_due
```json
{
  "templateId": "course_assignment_due",
  "title": "Assignment Due: {{assignmentName}}",
  "body": "Your assignment {{assignmentName}} for {{courseName}} is due on {{dueDate}}.",
  "channels": ["in-app", "email", "push"],
  "category": "ACADEMIC",
  "priority": "HIGH",
  "actions": [
    {
      "label": "View Assignment",
      "url": "{{assignmentUrl}}",
      "type": "PRIMARY"
    }
  ],
  "metadata": {
    "icon": "icon-assignment",
    "color": "#E74C3C",
    "sound": "alert-important"
  }
}
```

#### course_grade_posted
```json
{
  "templateId": "course_grade_posted",
  "title": "New Grade Posted",
  "body": "Your grade for {{itemName}} in {{courseName}} has been posted.",
  "channels": ["in-app", "email"],
  "category": "ACADEMIC",
  "priority": "MEDIUM",
  "actions": [
    {
      "label": "View Grade",
      "url": "{{gradeUrl}}",
      "type": "PRIMARY"
    }
  ],
  "metadata": {
    "icon": "icon-grade",
    "color": "#3498DB"
  }
}
```

### Social Notifications

#### new_follower
```json
{
  "templateId": "new_follower",
  "title": "New Follower",
  "body": "{{userName}} started following you.",
  "channels": ["in-app", "push"],
  "category": "SOCIAL",
  "priority": "LOW",
  "actions": [
    {
      "label": "View Profile",
      "url": "{{profileUrl}}",
      "type": "SECONDARY"
    }
  ],
  "metadata": {
    "icon": "icon-follow",
    "color": "#9B59B6"
  }
}
```

#### post_interaction
```json
{
  "templateId": "post_interaction",
  "title": "{{userName}} {{interactionType}} your post",
  "body": "Your post '{{postPreview}}' received a new {{interactionType}} from {{userName}}.",
  "channels": ["in-app"],
  "category": "SOCIAL",
  "priority": "LOW",
  "actions": [
    {
      "label": "View Post",
      "url": "{{postUrl}}",
      "type": "SECONDARY"
    }
  ],
  "metadata": {
    "icon": "icon-{{interactionType}}",
    "color": "#2ECC71"
  }
}
```

### Administrative Notifications

#### account_change
```json
{
  "templateId": "account_change",
  "title": "Account {{changeType}}",
  "body": "Your account has been {{changeType}}. {{additionalInfo}}",
  "channels": ["in-app", "email"],
  "category": "ADMINISTRATIVE",
  "priority": "HIGH",
  "actions": [
    {
      "label": "Review Changes",
      "url": "{{settingsUrl}}",
      "type": "PRIMARY"
    }
  ],
  "metadata": {
    "icon": "icon-settings",
    "color": "#F39C12"
  }
}
```

### System Notifications

#### system_maintenance
```json
{
  "templateId": "system_maintenance",
  "title": "Scheduled Maintenance",
  "body": "EDU Matrix will be undergoing maintenance on {{maintenanceDate}} from {{startTime}} to {{endTime}}. {{additionalInfo}}",
  "channels": ["in-app", "email"],
  "category": "SYSTEM",
  "priority": "MEDIUM",
  "actions": [],
  "metadata": {
    "icon": "icon-maintenance",
    "color": "#7F8C8D"
  }
}
```

## Custom Template Guidelines

When creating custom notification templates:

1. Use semantic template IDs that clearly indicate purpose
2. Keep titles concise (under 80 characters)
3. Maintain consistent tone and formatting
4. Use appropriate priority levels based on urgency
5. Include relevant action buttons
6. Test templates across all delivery channels

## Localization Support

Templates support localization through language variants:

```json
{
  "templateId": "template_id",
  "translations": {
    "en": {
      "title": "English title",
      "body": "English body text"
    },
    "es": {
      "title": "Título en español",
      "body": "Texto del cuerpo en español"
    }
  }
}
```

## Template Versioning

Templates are versioned to support backward compatibility:

```json
{
  "templateId": "template_id",
  "version": 2,
  "previousVersions": [1],
  "title": "New improved title",
  "body": "Updated body text"
}
```