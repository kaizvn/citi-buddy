import React from 'react'
import * as Progress from '@radix-ui/react-progress'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export function Loading({ size = 'medium', color = 'primary' }: LoadingProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  }

  return (
    <div className="flex items-center justify-center">
      <Progress.Root
        className={`relative overflow-hidden rounded-full ${sizeClasses[size]}`}
        style={{
          transform: 'translateZ(0)',
        }}
      >
        <Progress.Indicator
          className={`absolute inset-0 flex items-center justify-center ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
          style={{
            animation: 'spin 1s linear infinite',
          }}
        >
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </Progress.Indicator>
      </Progress.Root>
    </div>
  )
}
