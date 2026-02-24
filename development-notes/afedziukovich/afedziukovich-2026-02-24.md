# Дата: 2026-02-22

- **Что было сделано:** Создал основу для входа и регистрации: папки и файлы по правилам архитектуры (features/auth, shared/api, shared/ui). Создал страницы Login, Register, и заглушки Dashboard, Library, Profile, формы входа и выхода.
Подключил правильно репозиторий к Vercel, теперь сайт доступен по адресу: https://skillgrove.vercel.app/.
- **Проблемы:** ESLint ругался на setTimeout, на переменные в defineEmits, не работал старый способ указания окружения (/* eslint-env */).
- **Решения (или попытки):** Для setTimeout добавил /* global setTimeout */. В defineEmits поставил // eslint-disable-next-line, чтобы временно отключить предупреждение. Включил мок-режим (VITE_USE_MOCK=true), чтобы разрабатывать без бэкенда.
- **Мысли / Планы:** Сделать Dashboard, Library, Profile
- **Затраченное время:** ~12 часов