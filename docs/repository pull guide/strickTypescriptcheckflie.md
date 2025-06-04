{
  "compilerOptions": {
    // Strict Type-Checking Options
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    // Module Resolution
    "moduleResolution": "bundler",
    "module": "esnext",
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    // Enhanced Type Checking Features
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowJs": true,
    "checkJs": true,
    "incremental": true,
    // Path Configuration
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    // Type Declarations
    "typeRoots": ["./node_modules/@types", "./types"],
    "resolveJsonModule": true,
    // Plugin Support
    "plugins": [
      {
        "name": "next"
      }
    ],
    "noEmit": true,
    "esModuleInterop": true,
    "isolatedModules": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "app",
    "components",
    "lib",
    "types"
  ],
  "exclude": ["node_modules"]
}
