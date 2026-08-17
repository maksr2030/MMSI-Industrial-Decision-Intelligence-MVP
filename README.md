# MMSI™ Industrial Decision Intelligence MVP

النموذج الأولي التشغيلي لمنصة MMSI™ لذكاء القرار الصناعي قبل التنفيذ، مع عرض تحقق تحليلي مبني على بيانات صناعية حقيقية منشورة.

الرابط التشغيلي:

https://mmsi-industrial-mvp.s6rjybchqh.chatgpt.site

## نطاق النسخة الأولية

تتضمن هذه النسخة لوحة دليل تحقق، ملخصاً للاختبار الزمني، سلامة البيانات، إشارات
الانحراف، بوابة اعتماد إنتاجي مغلقة، ومساراً واضحاً للمراجعة البشرية.

يعتمد العرض على بيانات تشغيل منشورة لغلاية فحم صناعية في مصنع كيميائي في
تشجيانغ، الصين. شملت البيانات 86,400 سجلاً بفاصل خمس ثوانٍ و30 متغيراً، مع
17,280 سجلاً للاختبار الزمني. لا تُنسب النتائج إلى سابك، ولا تمثل اعتماداً
إنتاجياً أو اتصالاً بمصنع فعلي.

نتيجة الاختبار الزمني المسجلة: R² = 0.3053819276، ومتوسط الخطأ المطلق =
2.3940062571، مع 8,452 إشارة للمراجعة. قرار الإنتاج: HOLD، والمراجعة
البشرية مطلوبة.

المصدر العلمي: [Figshare dataset](https://springernature.figshare.com/articles/dataset/A_long-tailed_distribution_time-series_dataset_in_boiler_equipment/28868849)
وترخيص البيانات CC0. لا تصدر هذه النسخة أوامر تحكم فعلية إلى أي نظام صناعي.

## English

The operational MVP for MMSI™ Industrial Decision Intelligence before execution,
with an analytical validation view based on published real industrial data.

Live deployment:

https://mmsi-industrial-mvp.s6rjybchqh.chatgpt.site

This release includes a validation dashboard, temporal holdout summary, data
integrity checks, deviation-review signals, a fail-closed production gate, and
a human-review path.

The view uses published operating data from a coal-fired boiler in a chemical
plant in Zhejiang, China: 86,400 five-second records and 30 variables, with
17,280 temporal holdout records. Results are not attributed to SABIC and do not
constitute production authorization or a live plant connection.

Recorded temporal holdout result: R² = 0.3053819276, mean absolute error =
2.3940062571, and 8,452 deviation-review flags. Production decision: HOLD;
human review is required.

Scientific source: [Figshare dataset](https://springernature.figshare.com/articles/dataset/A_long-tailed_distribution_time-series_dataset_in_boiler_equipment/28868849),
licensed under CC0. This release does not issue live commands to industrial
control systems.

## Source and runtime

The interface is implemented with React, TypeScript, Tailwind CSS and Vinext.
The deployment artifact is validated for the MMSI operational MVP.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## Sites Lifecycle

The Sites lifecycle CLI runs the locked dependency install before returning this checkout. Edit the source under `app/`, then checkpoint when a coherent milestone is ready to inspect or share. The remote Sites builder runs `npm run build` against the pushed commit. Do not repeat install or build as a normal pre-checkpoint step.

This starter does not use `wrangler.jsonc`.

`install:ci` is intentionally a single, non-retrying `npm ci`. It refuses a concurrent install for the same project, consumes a matching image-seeded npm cache with `--prefer-offline` while retaining registry fallback for a missing cache object, otherwise downloads and verifies the complete vinext tarball recorded in `package-lock.json`, limits npm to one socket, and terminates a stalled install. `build` applies a short timeout and then validates the Sites artifact. These helpers target Linux and use GNU `timeout`; they are not native macOS scripts.

Scripts that need writable project-scoped home, npm, XDG, and temporary paths use `scripts/sites-env.sh`. The `dev` and `start` scripts honor the caller's runtime environment and keep Wrangler logs inside the checkout. The generated `.sites-runtime/` directory is disposable and ignored by Git.

## Included Shape

- edit site code under `app/`
- `app/chatgpt-auth.ts` provides optional dispatch-owned ChatGPT sign-in helpers
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/index.ts` reads the D1 binding from the Cloudflare Worker environment
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Diagnostic Commands

- `npm run install:ci`: perform the one bounded lockfile install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build and validate the deployable Sites artifact
- `npm run start`: start the built Vinext application
- `npm test`: build, validate, and verify the rendered development-preview metadata
- `npm run validate:artifact`: recheck an existing artifact's manifest and ESM `default.fetch` export
- `npm run db:generate`: generate Drizzle migrations after schema changes

Use build and validation commands for targeted diagnosis after a remote failure, not as part of the normal checkpoint path.

The timeout defaults can be overridden for a controlled canary with `SITES_INSTALL_TIMEOUT`, `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`. A timeout fails the command; the helpers never retry an unchanged install or build.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
