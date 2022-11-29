import React from 'react' 
import styles from './styles.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import router from 'next/router'
import axios from "axios"

type Props = {
  id: number
  title: String
  content: String
  author: String
  editable?: boolean | false
  handleDelete?: (id: number)=>void
}

const ArticleTile = (props: Props) => {
  

  return(
   <div className={styles.container}>
    <div className={styles.titleSection}>
      <div className={styles.title}>
        {props.title}
      </div>
      {
        props.editable  
        ? <div className={styles.icons}>
            <IconButton
              size="medium"
              onClick={()=>{router.push(`/EditPostPage/${props.id}`)}}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="medium"
              onClick={()=>{
                props.handleDelete 
                ? props.handleDelete(props.id)
                : null
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        : null  
      }
      
    </div>
    <div className={styles.content}>
        {props.content}
    </div>
    <div className={styles.author}>
        {props.author}
    </div>
   </div>
  )
}

export default ArticleTile