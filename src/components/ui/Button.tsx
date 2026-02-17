import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none'
  
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90 dark:hover:bg-primary/80',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    danger: 'bg-danger text-white hover:bg-danger/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20',
  }

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? '⏳ ' : ''}{children}
    </button>
  )
}
