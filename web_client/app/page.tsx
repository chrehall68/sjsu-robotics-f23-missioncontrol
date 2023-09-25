'use client'

import Reader from "./components/displayer"
import ServoWriter from "./components/servo-writer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div >
        <h1 className="text-3xl text-center">Arduino Mission Control</h1>
        <p>A simple mission control webpage that displays Arduino data and allows easy control of the Arduino.</p>
        <p className="text-center">Click a sensor to display its graph</p>
      </div>
      {ServoWriter()}
      {Reader()}
    </main>
  )
}
