import styles from './ProjectTaskComment.module.css'
import UserTag from '@/components/Tags/UserTag/UserTag'

export default function ProjectTaskComment() {
  return (
    <article className={styles.container}>
      <UserTag />
      <div className={styles.commentContainer}>
        <div className={styles.commentHead}>
          <p className={styles.user}>User</p>
          <p className={styles.date}>23 mars, 11h20</p>
        </div>
        <p className={styles.comment}>Un commentaire très utile pour donner des infos à ses collègues. </p>
      </div>
    </article>
  )
}