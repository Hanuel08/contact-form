import { useEffect, useMemo, useState } from "react"
import { Main } from "./components/Main.jsx"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"

function App() {
  const initialTheme = useMemo(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark" || saved === "light") return saved
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light"
  }, [])

  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        onGoToForm={() => scrollTo("contact-form")}
        onGoToContacts={() => scrollTo("contacts-table")}
      />
      <Main />
      <Footer
        onGoToTop={() => scrollTo("page-top")}
        onGoToForm={() => scrollTo("contact-form")}
        onGoToContacts={() => scrollTo("contacts-table")}
      />
    </div>
  )
}

export default App
