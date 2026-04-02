import styles from './ProjectTaskComment.module.css'
import UserTag from '@/components/Tags/UserTag/UserTag'
import { Task } from '@/models/tasks.model'
import { ISODateToTaskView, ISODateToTime } from '@/utils/dateManagement'

interface ProjectTaskCommentProps {
  comment: Task['comments'][number]
}

export default function ProjectTaskComment({comment}: ProjectTaskCommentProps) {
  return (
    <article className={styles.container}>
      <UserTag name={comment.author.name}  />
      <div className={styles.commentContainer}>
        <div className={styles.commentHead}>
          <p className={styles.user}>{comment.author.name}</p>
          <p className={styles.date}>{ISODateToTaskView(comment.createdAt)}, {ISODateToTime(comment.createdAt)}</p>
        </div>
        <p className={styles.comment}>{comment.content}</p>
      </div>
    </article>
  )
}