# @palimp/be-firebase

Firebase backend adapter for Palimp. Implements the same `PalimpClientBackendAdapter` / `PalimpServerBackendAdapter` shapes as `@palimp/be-supabase`, backed by Firebase Auth + Firestore.

## Entry points

- `@palimp/be-firebase/client` — `createClientAdapter(config: FirebaseOptions)`
- `@palimp/be-firebase/server` — `createServerAdapter({ projectId, serviceAccount })` (uses `firebase-admin`, runs server-side only)
- `@palimp/be-firebase/react` — `<PalimpFirebaseProvider config={...}>`

## Firestore data model

Firestore has no schema file, so this is the canonical reference for what the adapter expects.

### `inline/{key}`

| field | type     | notes                                           |
| ----- | -------- | ----------------------------------------------- |
| value | `string` | message body for the given key (the doc id).    |

Document id is the message key (matches the `key` column of the Supabase `inline` table).

### `profiles/{uid}`

| field          | type              | notes                              |
| -------------- | ----------------- | ---------------------------------- |
| name           | `string \| null`  | display name shown in devtools.    |
| publishToken   | `string \| null`  | GitHub token used by publish flow. |

Document id is the Firebase Auth `uid`. Field names are camelCase (Firestore convention) — no Postgres-style snake_case.

## Suggested Firestore security rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /inline/{key} {
      // Public read of message values (SSR clients use the server adapter,
      // but logged-out browser reads also hit Firestore directly).
      allow read: if true;
      // Only authenticated users can edit messages.
      allow write: if request.auth != null;
    }
    match /profiles/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Session detection

Firebase Auth persists to IndexedDB, which is async-only. To keep `hasSession()` synchronous (required by `LoginPageCore`), the client adapter mirrors a `palimp:firebase:hasSession` flag into `localStorage` on every successful `login()` / `logout()` / `getUser()`. The flag may briefly report `true` for a session that expired between page loads — corrected on the next `getUser()` call. Same false-positive class as the Supabase cookie sniff.
