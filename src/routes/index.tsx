import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  Lightbulb,
  RotateCcw,
  Send,
  Sigma,
  Square,
} from 'lucide-react'
import { Streamdown } from 'streamdown'

import { useAIChat } from '@/lib/ai-hook'
import type { ChatMessages } from '@/lib/ai-hook'
import { PROCESSES, detectStep, getProcess } from '@/lib/processes'
import type { LearningProcess, ProcessId } from '@/lib/processes'

const MODE_ICONS: Record<ProcessId, typeof Calculator> = {
  'giai-toan': Calculator,
  'khai-niem': Lightbulb,
  'dinh-li': BookOpen,
}

function messageText(message: ChatMessages[number]): string {
  return message.parts
    .map((part) => (part.type === 'text' ? part.content : ''))
    .join('')
}

function Stepper({
  process,
  current,
}: {
  process: LearningProcess
  current: number | null
}) {
  return (
    <ol className="relative space-y-1">
      {process.steps.map((step, i) => {
        const n = i + 1
        const done = current !== null && n < current
        const active = current === n
        return (
          <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
            {n < process.steps.length && (
              <span
                className={`absolute left-[15px] top-9 bottom-0 w-px ${
                  done ? 'bg-accent' : 'bg-line'
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                active
                  ? 'border-accent bg-accent text-ink'
                  : done
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line bg-paper text-muted'
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : n}
            </span>
            <div
              className={`min-w-0 flex-1 rounded-xl px-3 py-2 transition-colors ${
                active ? 'bg-white shadow-sm ring-1 ring-accent/40' : ''
              }`}
            >
              <p
                className={`text-sm font-semibold ${active || done ? 'text-ink' : 'text-muted'}`}
              >
                Bước {n}: {step.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                {step.summary}
              </p>
              {active && (
                <ul className="mt-2 space-y-1 text-xs leading-relaxed text-ink/80">
                  {step.details.map((d) => (
                    <li key={d} className="flex gap-1.5">
                      <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function Messages({ messages }: { messages: ChatMessages }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={containerRef} className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-6">
        {messages.map((message) => {
          const text = messageText(message)
          if (!text) return null
          if (message.role === 'user') {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-ink px-4 py-3 text-sm leading-relaxed text-paper">
                  {text}
                </div>
              </div>
            )
          }
          return (
            <div key={message.id} className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                <Sigma className="h-4 w-4" />
              </span>
              <div className="prose prose-sm min-w-0 max-w-none flex-1 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3">
                <Streamdown>{text}</Streamdown>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChatPanel({
  process,
  onReset,
}: {
  process: LearningProcess
  onReset: () => void
}) {
  const [input, setInput] = useState('')
  const { messages, sendMessage, isLoading, stop, error } = useAIChat(process.id)

  const currentStep = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') {
        const step = detectStep(messageText(messages[i]))
        if (step) return step
      }
    }
    return null
  }, [messages])

  const send = (text: string) => {
    if (!text.trim() || isLoading) return
    sendMessage(text.trim())
    setInput('')
  }

  const started = messages.length > 0

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_1fr]">
      <aside className="hidden min-h-0 overflow-y-auto border-r border-line bg-paper-deep/60 p-5 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Tiến trình
        </p>
        <h2 className="mt-1 font-display text-xl text-ink">{process.name}</h2>
        <p className="mt-1 mb-5 text-xs text-muted">{process.flow}</p>
        <Stepper process={process} current={currentStep} />

        {started && (
          <div className="mt-6 space-y-2 border-t border-line pt-5">
            <button
              onClick={() => send('Em chưa nghĩ ra, thầy/cô gợi ý thêm giúp em được không?')}
              disabled={isLoading}
              className="flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-left text-sm text-ink hover:border-accent disabled:opacity-50"
            >
              <Lightbulb className="h-4 w-4 text-accent-deep" /> Xin gợi ý
            </button>
            <button
              onClick={() => send('Em đã xong bước này, chuyển sang bước tiếp theo nhé.')}
              disabled={isLoading || currentStep === 4}
              className="flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-left text-sm text-ink hover:border-accent disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4 text-accent-deep" /> Sang bước tiếp theo
            </button>
            <button
              onClick={onReset}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted hover:text-ink"
            >
              <RotateCcw className="h-4 w-4" /> Bắt đầu lại
            </button>
          </div>
        )}
      </aside>

      <section className="flex min-h-0 flex-col">
        {started && currentStep && (
          <div className="border-b border-line bg-white/70 px-4 py-2 text-center text-xs text-muted lg:hidden">
            Đang ở <span className="font-semibold text-ink">Bước {currentStep}</span>:{' '}
            {process.steps[currentStep - 1].title}
          </div>
        )}

        {started ? (
          <Messages messages={messages} />
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
              <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                {process.name}
              </h1>
              <p className="mt-3 max-w-xl text-base text-muted">{process.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {process.steps.map((s, i) => (
                  <span key={s.title} className="flex items-center gap-2">
                    <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink">
                      {i + 1}. {s.title}
                    </span>
                    {i < process.steps.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-muted" />
                    )}
                  </span>
                ))}
              </div>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Thử bắt đầu với
              </p>
              <div className="mt-3 grid gap-3">
                {process.examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => send(ex)}
                    className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3 text-left text-sm text-ink transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                  >
                    {ex}
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted group-hover:text-accent-deep" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto w-full max-w-3xl px-4 py-3">
            {error && (
              <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                Không kết nối được với trợ lý AI. Vui lòng thử lại.
              </p>
            )}
            {isLoading && (
              <div className="mb-2 flex justify-center">
                <button
                  onClick={stop}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-ink"
                >
                  <Square className="h-3 w-3 fill-current" /> Dừng
                </button>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-end gap-2"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                placeholder={started ? 'Nhập câu trả lời của bạn…' : process.inputPlaceholder}
                className="max-h-40 min-h-[48px] w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Gửi"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ink text-paper transition hover:bg-ink/90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-muted">
              Enter để gửi · Shift + Enter để xuống dòng
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Home() {
  const [mode, setMode] = useState<ProcessId>('giai-toan')
  const [session, setSession] = useState(0)
  const process = getProcess(mode)

  return (
    <div className="flex h-dvh flex-col bg-paper text-ink">
      <header className="border-b border-line">
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-accent">
              <Sigma className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg leading-none text-ink">Trợ lý XSTK</p>
              <p className="mt-1 text-xs text-muted">
                Học Xác suất Thống kê cùng AI theo quy trình 4 bước
              </p>
            </div>
          </div>
          <nav className="flex gap-1 rounded-xl border border-line bg-white p-1">
            {PROCESSES.map((p) => {
              const Icon = MODE_ICONS[p.id]
              const active = p.id === mode
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setMode(p.id)
                    setSession((s) => s + 1)
                  }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${
                    active ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {p.short}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <ChatPanel
        key={`${mode}-${session}`}
        process={process}
        onReset={() => setSession((s) => s + 1)}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
