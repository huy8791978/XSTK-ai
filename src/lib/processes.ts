// Ba quy trình dạy học Xác suất Thống kê, lấy từ tài liệu "THIẾT KẾ AI".
// Đây là nguồn dữ liệu duy nhất cho cả giao diện (stepper) lẫn system prompt của AI.

export type ProcessId = 'giai-toan' | 'khai-niem' | 'dinh-li'

export interface ProcessStep {
  title: string
  summary: string
  details: Array<string>
}

export interface LearningProcess {
  id: ProcessId
  name: string
  short: string
  tagline: string
  flow: string
  inputPlaceholder: string
  examples: Array<string>
  steps: Array<ProcessStep>
}

export const PROCESSES: Array<LearningProcess> = [
  {
    id: 'giai-toan',
    name: 'Quy trình giải toán',
    short: 'Giải toán',
    tagline: 'Đưa ra một bài toán, AI dẫn bạn tự tìm lời giải qua 4 bước.',
    flow: 'Tìm hiểu đề → Xây dựng chương trình giải → Trình bày lời giải → Kiểm tra & nghiên cứu',
    inputPlaceholder: 'Nhập đề bài toán xác suất thống kê…',
    examples: [
      'Một hộp có 5 bi đỏ và 3 bi xanh. Lấy ngẫu nhiên 2 bi. Tính xác suất để lấy được 2 bi cùng màu.',
      'Gieo hai con xúc xắc cân đối. Tính xác suất tổng số chấm bằng 7.',
      'Điểm kiểm tra của 10 học sinh: 5, 6, 7, 7, 8, 8, 8, 9, 9, 10. Tìm số trung bình, trung vị và mốt.',
    ],
    steps: [
      {
        title: 'Tìm hiểu nội dung bài toán',
        summary: 'Phân biệt cái đã cho, cái phải tìm, cái phải chứng minh.',
        details: [
          'Phân biệt cái đã cho, cái phải tìm và cái phải chứng minh',
          'Dùng công thức, kí hiệu, hình vẽ… để diễn tả đề bài',
          'Phân biệt các thành phần khác nhau của điều kiện',
          'Có thể diễn tả các điều kiện đó thành công thức không?',
        ],
      },
      {
        title: 'Xây dựng chương trình giải',
        summary: 'Chia nhỏ bài toán, chọn kiến thức và phương pháp phù hợp.',
        details: [
          'Phân tích bài toán đã cho thành nhiều bài toán đơn giản quen thuộc',
          'Lựa chọn những kiến thức đã học gần gũi nhất với dữ kiện rồi dự đoán kết quả',
          'Sử dụng những phương pháp đặc thù với từng dạng toán',
        ],
      },
      {
        title: 'Trình bày lời giải',
        summary: 'Trình bày lại lời giải sau khi đã điều chỉnh những chỗ cần thiết.',
        details: ['Trình bày lại lời giải hoàn chỉnh sau khi đã điều chỉnh những chỗ cần thiết'],
      },
      {
        title: 'Kiểm tra và nghiên cứu lời giải',
        summary: 'Kiểm tra, rút ra phương pháp, tìm cách giải khác, mở rộng bài toán.',
        details: [
          'Kiểm tra lại kết quả và các lập luận trong quá trình giải',
          'Nhìn lại toàn bộ các bước giải, rút ra tri thức phương pháp',
          'Tìm thêm cách giải khác (nếu có thể)',
          'Khai thác kết quả có thể có của bài toán',
          'Đề xuất bài toán tương tự, bài toán đặc biệt hoặc khái quát hoá bài toán',
        ],
      },
    ],
  },
  {
    id: 'khai-niem',
    name: 'Quy trình học khái niệm',
    short: 'Học khái niệm',
    tagline: 'Chọn một khái niệm, AI dẫn bạn từ trải nghiệm đến vận dụng.',
    flow: 'Trải nghiệm → Hình thành định nghĩa → Củng cố → Vận dụng',
    inputPlaceholder: 'Nhập khái niệm muốn học (vd: biến cố, xác suất, phương sai)…',
    examples: [
      'Tôi muốn học khái niệm "biến cố" và "không gian mẫu".',
      'Giúp tôi hiểu khái niệm "xác suất có điều kiện".',
      'Tôi muốn học khái niệm "phương sai và độ lệch chuẩn".',
    ],
    steps: [
      {
        title: 'Trải nghiệm',
        summary: 'Tiếp cận khái niệm qua biểu tượng trực quan, tình huống thực tiễn.',
        details: [
          'Tiếp cận dấu hiệu bản chất của khái niệm thông qua biểu tượng trực quan hoặc trải nghiệm thực tiễn',
          'Đưa ra tình huống cụ thể để cảm nhận sự tồn tại hoặc tác dụng của đối tượng cần định nghĩa',
        ],
      },
      {
        title: 'Hình thành định nghĩa khái niệm',
        summary: 'Nhận biết dấu hiệu bản chất, lĩnh hội thuật ngữ, kí hiệu.',
        details: [
          'Nhận biết dấu hiệu bản chất: phân tích, so sánh, trừu tượng hoá, khái quát hoá để tìm dấu hiệu đặc trưng',
          'Một số khái niệm có thể đi ngay vào định nghĩa như trường hợp riêng của khái niệm đã biết',
          'Lĩnh hội thuật ngữ, kí hiệu then chốt; phát biểu bằng lời và ghi nhớ định nghĩa',
        ],
      },
      {
        title: 'Củng cố',
        summary: 'Nhận diện và thể hiện khái niệm trong nhiều ngữ cảnh.',
        details: [
          'Nhận diện khái niệm trong những trường hợp đơn giản có tính chất đặc trưng (vận dụng trực tiếp)',
          'Thể hiện khái niệm trong các ngữ cảnh khác nhau và trong mối liên hệ logic với khái niệm khác',
        ],
      },
      {
        title: 'Vận dụng vào thực tiễn',
        summary: 'Vận dụng trong tình huống gián tiếp, phức hợp và thực tiễn.',
        details: [
          'Vận dụng khái niệm trong các tình huống gián tiếp, phức hợp hơn',
          'Giải quyết một số vấn đề thực tiễn',
        ],
      },
    ],
  },
  {
    id: 'dinh-li',
    name: 'Quy trình học định lí',
    short: 'Học định lí',
    tagline: 'Chọn một định lí, AI dẫn bạn tự khám phá, chứng minh và vận dụng.',
    flow: 'Trải nghiệm → Hình thành định lí → Củng cố → Vận dụng',
    inputPlaceholder: 'Nhập định lí/công thức muốn học (vd: công thức cộng xác suất)…',
    examples: [
      'Tôi muốn học quy tắc cộng xác suất.',
      'Tôi muốn học quy tắc nhân xác suất cho hai biến cố độc lập.',
      'Tôi muốn học công thức xác suất toàn phần và công thức Bayes.',
    ],
    steps: [
      {
        title: 'Trải nghiệm',
        summary: 'Tiếp cận giả thiết, kết luận; khơi gợi nhu cầu kiểm chứng.',
        details: [
          'Tiếp cận trực tiếp với các yếu tố giả thiết và kết luận, khơi gợi mong muốn tự chứng minh hoặc bác bỏ',
          'Dùng tình huống từ đời sống thực tiễn hoặc nội bộ môn toán để tạo động lực, phát sinh nhu cầu kiểm chứng',
        ],
      },
      {
        title: 'Hình thành định lí',
        summary: 'Phân biệt giả thiết – kết luận, dự đoán, chứng minh định lí.',
        details: [
          'Nhận diện và phân biệt chính xác phần giả thiết và phần kết luận của định lí',
          'Dự đoán và phát biểu định lí',
          'Nhận biết các luận cứ làm cơ sở cho chứng minh',
          'Nhận biết cách thức chứng minh và chứng minh được định lí',
          'Hiểu cấu trúc logic của định lí',
        ],
      },
      {
        title: 'Củng cố',
        summary: 'Thực hành định lí trong trường hợp đơn giản, đặc trưng.',
        details: ['Thực hành vận dụng định lí trong những trường hợp đơn giản có tính chất đặc trưng'],
      },
      {
        title: 'Vận dụng',
        summary: 'Giải quyết vấn đề toán học hoặc vấn đề gắn với thực tiễn.',
        details: ['Vận dụng định lí giải quyết một số vấn đề toán học hoặc vấn đề gắn với thực tiễn'],
      },
    ],
  },
]

export function getProcess(id: string | undefined): LearningProcess {
  return PROCESSES.find((p) => p.id === id) ?? PROCESSES[0]
}

export function buildSystemPrompt(process: LearningProcess): string {
  const steps = process.steps
    .map(
      (s, i) =>
        `Bước ${i + 1}: ${s.title}\n${s.details.map((d) => `  - ${d}`).join('\n')}`,
    )
    .join('\n\n')

  return `Bạn là "Trợ lý XSTK" — một gia sư AI dạy môn Xác suất Thống kê cho học sinh Việt Nam, luôn trả lời bằng tiếng Việt.

Bạn đang hướng dẫn theo "${process.name.toUpperCase()}" gồm 4 bước tuần tự: ${process.flow}.

${steps}

NGUYÊN TẮC BẮT BUỘC:
1. Luôn đi đúng thứ tự 4 bước. Mỗi lượt trả lời chỉ tập trung vào MỘT bước.
2. Dòng ĐẦU TIÊN của mọi câu trả lời phải là tiêu đề dạng: **Bước N: <tên bước>** (N là 1–4). Không viết gì trước dòng này.
3. Đóng vai người dẫn dắt, không giải hộ ngay. Ở mỗi bước: giải thích ngắn gọn mục tiêu của bước, gợi mở bằng 1–3 câu hỏi để học sinh tự suy nghĩ, rồi dừng lại chờ học sinh trả lời.
4. Nhận xét câu trả lời của học sinh: khen điểm đúng, chỉ ra chỗ sai một cách nhẹ nhàng, gợi ý thêm nếu cần. Chỉ chuyển sang bước tiếp theo khi học sinh đã hoàn thành bước hiện tại hoặc yêu cầu chuyển bước.
5. Nếu học sinh nói "không biết" hoặc xin gợi ý, đưa gợi ý cụ thể hơn; nếu học sinh bế tắc nhiều lần, có thể trình bày mẫu phần đó rồi mời học sinh tự làm phần tương tự.
6. Khi học sinh gửi nội dung mới (đề bài, khái niệm, định lí mới), bắt đầu lại từ Bước 1.
7. Viết công thức bằng kí hiệu văn bản dễ đọc (vd: P(A ∪ B) = P(A) + P(B) − P(A ∩ B), C(5,2) = 10, √, ≤, ≥). Không dùng LaTeX.
8. Trình bày bằng Markdown gọn gàng, câu ngắn, thân thiện, phù hợp học sinh THPT.
9. Kết thúc Bước 4 bằng một tổng kết ngắn những gì đã học và đề xuất một bài/khái niệm/định lí tiếp theo để luyện tập.
10. Nếu câu hỏi nằm ngoài môn Xác suất Thống kê, lịch sự hướng học sinh quay lại chủ đề.`
}

// Tìm số bước (1–4) mà AI đang hướng dẫn, dựa trên tiêu đề "Bước N" ở đầu câu trả lời.
export function detectStep(text: string): number | null {
  const match = text.match(/Bước\s*([1-4])/i)
  return match ? Number(match[1]) : null
}
