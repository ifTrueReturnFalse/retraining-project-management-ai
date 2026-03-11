import classNames from 'classnames'
import styles from './IconButton.module.css'

interface IconButtonProps {
  children: React.ReactNode
  className?: string
}

export default function IconButton({children, className=""}: IconButtonProps) {
  return (
    <button className={classNames(styles.button, className)}>{children}</button>
  )
}