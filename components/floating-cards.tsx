"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"

export function FloatingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div ref={ref} className="relative h-[400px] md:h-[500px] w-full">
      <motion.div
        className="absolute top-[10%] left-[10%] md:left-[20%] z-10 shadow-xl shadow-primary/20"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <Card className="w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-md overflow-hidden border border-white/10 relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="p-6 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Main Account</p>
                <p className="text-xl font-bold mt-1">$8,250.00</p>
              </div>
              <div className="bg-primary/20 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M1 10H23" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground mb-1">Card Number</p>
              <p className="font-mono">**** **** **** 4832</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="absolute top-[30%] right-[10%] md:right-[20%] z-20 shadow-xl shadow-primary/20"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
        }}
      >
        <Card className="w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-gradient-to-br from-primary/30 to-primary-light/20 backdrop-blur-md overflow-hidden border border-white/10 relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="p-6 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Savings</p>
                <p className="text-xl font-bold mt-1">$4,330.00</p>
              </div>
              <div className="bg-primary/20 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M1 10H23" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground mb-1">Card Number</p>
              <p className="font-mono">**** **** **** 7291</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] left-[20%] md:left-[30%] z-30 shadow-xl shadow-primary/20"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
        }}
      >
        <Card className="w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-md overflow-hidden border border-white/10 relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="p-6 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Investments</p>
                <p className="text-xl font-bold mt-1">$6,240.00</p>
              </div>
              <div className="bg-primary/20 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground mb-1">Portfolio ID</p>
              <p className="font-mono">**** **** **** 9548</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
