/**
 * @fileoverview EDU Matrix Interlinked General Users UI Components & Pages
 * WHY: Define reusable UI components for user management
 * WHERE: Used across all modules for consistent user interface
 * HOW: React/Next.js components with TailwindCSS styling
 */

# Simple Auth UI Components

## 1. Login Form

```typescript
interface LoginForm {
  fields: {
    email: {
      type: "email",
      required: true
    },
    password: {
      type: "password",
      required: true
    },
    rememberMe: {
      type: "checkbox"
    }
  },
  buttons: {
    submit: "Log in",
    forgotPassword: "Forgot Password?"
  }
}
```

## 2. Registration Form

```typescript
interface RegisterForm {
  fields: {
    email: {
      type: "email",
      required: true
    },
    username: {
      type: "text",
      required: true
    },
    password: {
      type: "password",
      required: true
    },
    name: {
      type: "text",
      required: true
    }
  },
  buttons: {
    submit: "Create Account",
    login: "Already have an account?"
  }
}
```

## 3. Basic Profile Page

```typescript
interface ProfilePage {
  sections: {
    info: {
      avatar: string,
      name: string,
      email: string,
      username: string,
      bio?: string
    },
    actions: {
      editProfile: "Edit Profile",
      changePassword: "Change Password"
    }
  }
}
```