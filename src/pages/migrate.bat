@echo off
if not exist backup mkdir backup
move /Y index.tsx backup\old-index.tsx
move /Y neura-ai.tsx backup\old-neura-ai.tsx
move /Y solutions.tsx backup\old-solutions.tsx
move /Y outcomes.tsx backup\old-outcomes.tsx
move /Y company.tsx backup\old-company.tsx

ren temp-home.tsx index.tsx
ren temp-neura-ai.tsx neura-ai.tsx
ren temp-solutions.tsx solutions.tsx
ren temp-outcomes.tsx outcomes.tsx
ren temp-company.tsx company.tsx
