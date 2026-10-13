import { Fragment } from 'react'

/** Renders *accent* and _muted_ spans inside config strings. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g)
  return (
    <>
      {parts.map((part, index) => {
        if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
          return (
            <span key={index} className="text-accent">
              {part.slice(1, -1)}
            </span>
          )
        }
        if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) {
          return (
            <span key={index} className="text-text-secondary">
              {part.slice(1, -1)}
            </span>
          )
        }
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}
