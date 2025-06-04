# TypeScript Enforcement Guidelines

## Strict TypeScript Rules for Code Generation

This document defines the strict TypeScript standards that MUST be followed when generating or modifying code for the Interlinked project.

## Core TypeScript Principles

1. **No Implicit Any**
   - Every variable, parameter, and return type MUST be explicitly typed
   - Never use `any` type unless absolutely necessary with clear justification
   - If a type is unknown, create an appropriate interface or type alias

2. **Explicit Return Types**
   - All functions MUST declare their return type explicitly
   - Use `void` for functions that don't return a value
   - Use proper Promise typing: `Promise<T>` for async functions

3. **Interface-First Development**
   - Define interfaces or type definitions BEFORE implementing functionality
   - Place common interfaces in dedicated types files
   - Use proper naming: interfaces should be PascalCase and descriptive

4. **Strict Null Checks**
   - Always handle null and undefined cases
   - Use optional chaining (`?.`) and nullish coalescing (`??`) operators
   - Never use non-null assertion (`!`) without proper validation

5. **Type Guards and Assertions**
   - Use proper type guards instead of type assertions
   - Create custom type predicates when needed: `function isUser(obj: any): obj is User`
   - Always validate before asserting

## React Component TypeScript Standards

1. **Component Props**
   ```typescript
   interface ComponentProps {
     title: string;
     items: Item[];
     onAction: (id: string) => void;
     isActive?: boolean; // Optional props with question mark
   }
   
   export function Component({ title, items, onAction, isActive = false }: ComponentProps): JSX.Element {
     // Implementation
   }
   ```

2. **React Hooks Typing**
   ```typescript
   // useState with proper typing
   const [users, setUsers] = useState<User[]>([]);
   
   // useReducer with proper action and state typing
   type State = { count: number };
   type Action = { type: 'increment' | 'decrement'; payload?: number };
   
   const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);
   ```

## API and Data Handling

1. **API Response Typing**
   ```typescript
   interface ApiResponse<T> {
     data: T;
     status: number;
     message: string;
   }
   
   async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
     // Implementation
   }
   ```

2. **Error Handling**
   ```typescript
   interface ErrorResponse {
     message: string;
     code: string;
     details?: Record<string, unknown>;
   }
   
   try {
     // Implementation
   } catch (error: unknown) {
     const typedError = error as Error;
     // Handle error
   }
   ```

## Enforcing These Standards

1. Before any new code generation, review this document
2. Use the TypeScript project references to ensure cross-module type safety
3. Run `npm run type-check` before committing any changes
4. Use the strict linting rules defined in eslint.config.mjs

## Type-First Development Workflow

1. Define types/interfaces for the feature
2. Create skeleton implementation with proper type annotations
3. Implement the functionality
4. Verify type correctness with `npm run type-check`

This document serves as the definitive guide for TypeScript usage in the Interlinked project.