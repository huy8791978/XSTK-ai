# Trợ lý XSTK — Học Xác suất Thống kê cùng AI

Gia sư AI dẫn dắt học sinh học môn Xác suất Thống kê theo ba quy trình sư phạm được mô tả trong tài liệu thiết kế (`docs/THIET-KE-AI.docx`):

1. **Quy trình giải toán** — Tìm hiểu đề → Xây dựng chương trình giải → Trình bày lời giải → Kiểm tra & nghiên cứu lời giải.
2. **Quy trình học khái niệm** — Trải nghiệm → Hình thành định nghĩa → Củng cố → Vận dụng vào thực tiễn.
3. **Quy trình học định lí** — Trải nghiệm → Hình thành định lí → Củng cố → Vận dụng.

AI không giải hộ ngay mà đi từng bước, đặt câu hỏi gợi mở, nhận xét câu trả lời của học sinh rồi mới chuyển bước. Thanh tiến trình bên trái tự động đánh dấu bước đang học.

## Công nghệ

- TanStack Start (React 19, TanStack Router), Vite 7, Tailwind CSS 4
- TanStack AI (streaming SSE), mô hình Claude qua Netlify AI Gateway (không cần tự quản lý API key khi deploy trên Netlify)
- Streamdown để hiển thị Markdown khi AI đang trả lời

## Chạy trên máy

```bash
pnpm install
netlify dev   # khuyến nghị: có sẵn biến môi trường AI Gateway
# hoặc: pnpm dev (cần tự đặt ANTHROPIC_API_KEY / OPENAI_API_KEY / GEMINI_API_KEY)
```

## Chỉnh sửa nội dung quy trình

Toàn bộ nội dung các bước, câu ví dụ và lời nhắc hệ thống cho AI nằm trong `src/lib/processes.ts`.
