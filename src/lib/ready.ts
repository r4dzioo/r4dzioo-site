import { createContext, useContext } from 'react'

/** False while the preloader covers the page, so entrance animations wait for it. */
export const ReadyContext = createContext(true)

export const useReady = () => useContext(ReadyContext)
