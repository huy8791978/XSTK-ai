# AGENTS.md

## Tổng quan

"Trợ lý XSTK" là ứng dụng chat AI một trang, dạy Xác suất Thống kê theo 3 quy trình 4 bước (giải toán, học khái niệm, học định lí) lấy từ `docs/THIET-KE-AI.docx`. Xây dựng bằng TanStack Start, deploy trên Netlify. Giao diện hoàn toàn bằng tiếng Việt.

## Cấu trúc

- `src/lib/processes.ts` — **nguồn dữ liệu duy nhất** cho các quy trình: tên, các bước, chi tiết, câu ví dụ, `buildSystemPrompt()` và `detectStep()`. Sửa nội dung sư phạm ở đây.
- `src/routes/api.chat.ts` — POST `/api/chat`: đọc `data.mode` (ProcessId) từ request, dựng system prompt tương ứng, stream câu trả lời qua SSE. Chọn provider theo thứ tự Anthropic (`claude-sonnet-4-6`) → OpenAI → Gemini → Ollama dựa trên biến môi trường do Netlify AI Gateway cung cấp.
- `src/routes/index.tsx` — toàn bộ UI: tab chọn quy trình, stepper tiến trình, khung chat, màn hình bắt đầu với câu ví dụ.
- `src/lib/ai-hook.ts` — hook `useAIChat` bọc `useChat` của TanStack AI.
- `src/styles.css` — token màu/font (`@theme`: paper, ink, accent, line, muted) và style Markdown `.prose`.

## Quyết định quan trọng

- Chế độ được truyền vào `useAIChat(mode)` qua tuỳ chọn `body` của `useChat`, đến server dưới dạng `body.data.mode`.
- System prompt bắt buộc AI mở đầu mỗi câu trả lời bằng `**Bước N: ...**`; UI dùng `detectStep()` trên câu trả lời mới nhất để đánh dấu bước hiện tại. Nếu đổi định dạng này phải cập nhật cả hai phía.
- Đổi quy trình hoặc bấm "Bắt đầu lại" sẽ remount `ChatPanel` (qua `key`) để xoá hội thoại.
- AI được yêu cầu viết công thức bằng kí hiệu Unicode, không dùng LaTeX, vì chưa có trình render công thức.
- Hội thoại không được lưu trữ (chỉ tồn tại trong phiên trình duyệt).

## Quy ước

- TypeScript strict, alias `@/` → `src/`, Tailwind utility classes, component PascalCase.
- Chỉ dùng các model có trong danh sách của Netlify AI Gateway.
