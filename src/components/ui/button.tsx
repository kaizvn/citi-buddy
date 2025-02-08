import { cn } from '@/utils'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        className,
        'flex text-center items-center justify-center px-3 py-2 text-md rounded-md',
        'bg-gray-900 text-white',
        'dark:bg-white dark:text-black dark:border-white-1 dark:border-1'
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
