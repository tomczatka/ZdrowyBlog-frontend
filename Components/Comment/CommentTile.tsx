import styles from './styles.module.scss'

type Props = {
  author: String
  content: String
  authorComment: boolean
}

const CommentTile = (props: Props) => {
return(
  <>
    {
      props.authorComment 
      ? <div className={styles.container}>
          <div className={styles.authorCommentTile}>
            {props.content}
          </div>
        </div>
      : <div className={styles.container}>
          <div className={styles.authorSection}>
            {props.author}
          </div>
          <div className={styles.commentTile}>
            {props.content}
          </div>
        </div>
    }
  </>
  
)
}


export default CommentTile