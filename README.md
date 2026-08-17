# MMSI™ Industrial Decision Intelligence MVP

النموذج الأولي التشغيلي لمنصة MMSI™ لذكاء القرار الصناعي قبل التنفيذ.

الرابط التشغيلي:

https://mmsi-industrial-mvp.s6rjybchqh.chatgpt.site

## نطاق النسخة الأولية

تتضمن هذه النسخة لوحة مؤشرات صناعية، مؤشرات الإنتاج والطاقة والجودة، بوابة
قرار مغلقة عند عدم اكتمال شروط الامتثال، مختبر سيناريوهات، توصيات قابلة
للمراجعة، وسلسلة تفسير سببي مختصرة.

البيانات المعروضة محاكاة لغرض العرض والاختبار وليست بيانات مصنع حقيقية.
لا تصدر هذه النسخة أوامر تحكم فعلية إلى أي نظام صناعي.

## English

The operational MVP for MMSI™ Industrial Decision Intelligence before execution.

Live deployment:

https://mmsi-industrial-mvp.s6rjybchqh.chatgpt.site

This release includes an industrial dashboard, throughput, energy and quality
signals, a fail-closed decision gate, a scenario lab, reviewable operational
recommendations, and a compact causal explanation chain.

Displayed data is synthetic demonstration data, not real plant data. This
release does not issue live commands to industrial control systems.

## Source and runtime

The interface is implemented with React, TypeScript, Tailwind CSS and Vinext.
The deployment artifact is validated for the MMSI operational MVP.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## Included Shape

- edit site code under `app/`
- `app/page.tsx` contains the dashboard, scenario lab, decision gate and review log
- `app/globals.css` contains the visual system and responsive layout
- `app/layout.tsx` contains document metadata and font loading
- `vite.config.ts` and `next.config.ts` provide the runtime configuration

## Diagnostic Commands

- `npm run build`: build and validate the deployable Sites artifact
- `npm run dev`: start the local development server
- `npm test`: run the rendered-preview checks

## Live deployment

- [MMSI Industrial Decision Intelligence MVP](https://mmsi-industrial-mvp.s6rjybchqh.chatgpt.site)
