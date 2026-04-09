import styles from './AITextInput.module.css'
import StarIcon from '@/components/Icons/StarIcon'

export default function AITextInput() {
  return (
    <div className={styles.container}>
      <input type="text" placeholder='Décrivez les tâches que vous souhaitez ajouter...' />
      <span className={styles.starContainer}><StarIcon className={styles.star} /></span>
    </div>
  )
}