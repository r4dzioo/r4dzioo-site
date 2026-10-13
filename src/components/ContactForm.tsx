import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Loader2, RotateCcw } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/site'

type Status = 'idle' | 'sending' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'message'
type Errors = Partial<Record<FieldName, string>>

const MAX_MESSAGE = 1500
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClass =
  'peer block w-full border-0 border-b border-border bg-transparent px-0 pb-3 pt-2 text-[17px] text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-transparent focus-visible:outline-none'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="eyebrow mb-1 block">
        {label}
      </label>
      <div className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            'absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out peer-focus:scale-x-100',
            error && 'scale-x-100',
          )}
        />
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-2 text-sm text-text-primary"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Success({ onReset }: { onReset: () => void }) {
  const { form } = siteConfig.contact
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[26rem] flex-col items-start justify-center"
      role="status"
    >
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden fill="none">
        <motion.circle
          cx="32"
          cy="32"
          r="29"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        <motion.path
          d="M19 33l9 9 17-19"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
        />
      </svg>
      <h3 className="mt-8 text-4xl leading-none tracking-tight">{form.successTitle}</h3>
      <p className="mt-4 max-w-sm text-[17px] leading-[1.65] text-text-secondary">
        {form.successMessage}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-semibold"
      >
        <RotateCcw aria-hidden className="size-4" />
        {form.resetLabel}
      </button>
    </motion.div>
  )
}

export function ContactForm() {
  const { contact } = siteConfig
  const { form } = contact
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [serverError, setServerError] = useState('')
  const [message, setMessage] = useState('')

  if (!form.enabled || !contact.email) return null

  const validate = (data: FormData): Errors => {
    const next: Errors = {}
    if (!String(data.get('name') ?? '').trim()) next.name = 'Please enter your name.'
    const email = String(data.get('email') ?? '').trim()
    if (!email) next.email = 'Please enter your email.'
    else if (!emailPattern.test(email)) next.email = 'That email address does not look right.'
    const text = String(data.get('message') ?? '').trim()
    if (text.length < 10) next.message = 'Please write at least a few words (10 characters).'
    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const data = new FormData(event.currentTarget)

    // Bots fill hidden fields. Pretend it worked and drop the message.
    if (data.get('_honey')) {
      setStatus('success')
      return
    }

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = (['name', 'email', 'message'] as const).find((key) => found[key])
      if (first) document.getElementById(`${uid}-${first}`)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contact.email!)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: String(data.get('name')).trim(),
            email: String(data.get('email')).trim(),
            message: String(data.get('message')).trim(),
            _subject: form.emailSubject,
            _template: 'table',
            _captcha: 'false',
            _honey: '',
          }),
        },
      )
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean | string
        message?: string
      }
      const ok = response.ok && String(result.success) !== 'false'
      if (!ok) {
        setServerError(result.message || form.errorMessage)
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setServerError(form.errorMessage)
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setErrors({})
    setMessage('')
    setServerError('')
  }

  const describe = (name: FieldName) => (errors[name] ? `${uid}-${name}-error` : undefined)
  const fieldId = (name: FieldName) => `${uid}-${name}`

  return (
    <div className="relative overflow-hidden rounded-card border border-border bg-surface p-7 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.04] blur-3xl"
      />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <Success key="success" onReset={reset} />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative space-y-8"
          >
            <h3 className="text-2xl tracking-tight">{form.title}</h3>

            <Field id={fieldId('name')} label={form.labels.name} error={errors.name}>
              <input
                id={fieldId('name')}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={form.placeholders.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describe('name')}
                className={fieldClass}
              />
            </Field>

            <Field id={fieldId('email')} label={form.labels.email} error={errors.email}>
              <input
                id={fieldId('email')}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={form.placeholders.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describe('email')}
                className={fieldClass}
              />
            </Field>

            <Field id={fieldId('message')} label={form.labels.message} error={errors.message}>
              <textarea
                id={fieldId('message')}
                name="message"
                rows={5}
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={form.placeholders.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describe('message')}
                className={cn(fieldClass, 'resize-none')}
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-0 font-mono text-[11px] text-text-secondary/60"
              >
                {message.length}/{MAX_MESSAGE}
              </span>
            </Field>

            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Leave this empty
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-accent px-8 text-base font-semibold tracking-tight text-accent-foreground transition-transform duration-200 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-black/10 transition-transform duration-500 ease-out group-hover:translate-x-0"
                />
                <span className="relative flex items-center gap-3">
                  {status === 'sending' ? (
                    <>
                      <Loader2 aria-hidden className="size-4 animate-spin" />
                      {form.sendingLabel}
                    </>
                  ) : (
                    <>
                      {form.submitLabel}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </span>
              </button>

              <p aria-live="polite" className="mt-4 min-h-5 text-sm text-text-primary">
                {status === 'error' && serverError}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
