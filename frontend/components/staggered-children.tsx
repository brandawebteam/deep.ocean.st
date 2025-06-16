"use client"

import type React from "react"

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface StaggeredChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  threshold?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  duration?: number
}

export default function StaggeredChildren({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  threshold = 0.1,
  direction = "up",
  duration = 500,
}: StaggeredChildrenProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin: "0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const getAnimationClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-16"
      case "down":
        return "translate-y-[-4rem]"
      case "left":
        return "translate-x-16"
      case "right":
        return "translate-x-[-4rem]"
      case "fade":
        return ""
      default:
        return "translate-y-16"
    }
  }

  const childrenArray = Children.toArray(children)
  const staggeredChildren = childrenArray.map((child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        ...child.props,
        className: cn(
          child.props.className,
          "transition-all",
          isVisible ? "opacity-100 transform-none" : `opacity-0 ${getAnimationClass()}`,
        ),
        style: {
          ...child.props.style,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${initialDelay + index * staggerDelay}ms`,
        },
      })
    }
    return child
  })

  return (
    <div ref={ref} className={className}>
      {staggeredChildren}
    </div>
  )
}
