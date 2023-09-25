'use client'

import Reader from "./components/displayer"
import ServoWriter from "./components/servo-writer"
import TopBar from "./components/topbar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {TopBar()}
      {ServoWriter()}
      {Reader()}
    </main>
  )
}
