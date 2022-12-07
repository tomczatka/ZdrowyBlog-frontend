import React, { useEffect, useRef, useState } from 'react' 
import styles from './styles.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import router from 'next/router'
import axios from "axios"
import CommentTile from '../Comment/CommentTile';
import { getCookie } from 'cookies-next';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface Comment {
  data: any,
  meta: any
}

interface Like {
  data: any,
  meta: any
}

type Props = {
  id: number
  title: String
  content: String
  author: String
  editable?: boolean | false
  handleDelete?: (id: number)=>void
}


const ArticleTile = (props: Props) => {
  const id = getCookie('userId')
  const [comments, setComments] = useState<Comment>()
  const [likes, setLikes] = useState<Like>()
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState(null)
  const [user, setUser] = useState({})
  const [post, setPost] = useState({})
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
      .then(response => {setUser(response.data)})
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${props.id}`)
      .then(response => {setPost(response.data.data)})
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?populate=*&filters[Post][id][$eq]=${props.id}`)
      .then(response => {setComments(response.data)})
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/likes?populate=*&filters[post][id][$eq]=${props.id}`)
      .then(response => {
        setLikes(response.data)
        response.data.data.filter((like: any) => (
          like.attributes?.user?.data.id == getCookie('userId')
          ? (setLiked(true), setLikeId(like.id))
          : null
        ))
      })
  }, [])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/likes?populate=*&filters[post][id][$eq]=${props.id}`)
    .then(response => {
      setLikes(response.data)
    })
  }, [liked])

  async function handleAddComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    inputRef.current
    ? inputRef.current.value = ""
    : null
    data.get('content')
    ? axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
          data:{
            Content: data.get('content'),
            User: user,
            Post: post
          }
        })
        .then(response => {
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?populate=*&filters[Post][id][$eq]=${props.id}`)
          .then(response => {
            setComments(response.data)
          })
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        })
    : null
  };

  async function handleLike() {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/likes`, {
        data:{
          user: user,
          post: post
        }
      })
      .then(response => {
        setLiked(true),
        setLikeId(response.data.data.id)
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      })
  }

  async function handleUnLike() {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/likes/${likeId}`)
      .then(response => {
        setLiked(false), 
        setLikeId(null)
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      })
  }
  

  return(
    <div className={styles.container}>
      <div className={styles.tile}>
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
        <div className={styles.bottomSection}>
          <div className={styles.likesSection}>
            {
              liked
              ? <IconButton onClick={handleUnLike}>
                  <ThumbUpAltIcon color='primary'/>
                </IconButton>
              : <IconButton onClick={handleLike}>
                  <ThumbUpOffAltIcon color='primary'/>
                </IconButton>
              
            }
            <div className={styles.likesCount}>
            {`${likes?.meta.pagination.total}`}
            </div>
            
          </div>
          <div className={styles.commentTitle} onClick={ () =>{setCommentsOpen(!commentsOpen)}}>
            {`Komentarze(${comments?.meta.pagination.total})`}
          </div>
        </div>
      </div>
      {
        commentsOpen
        ? <div className={styles.commentsSection}>
            {
              comments?.meta.pagination.total !== 0
              ? comments && comments.data.map((comment: any) => (
                  <div key={comment.id} className={comment.attributes.User?.data.id == getCookie('userId') ? styles.authorComment :styles.comment}>
                    <CommentTile
                      content={comment.attributes.Content}
                      author={comment.attributes.User?.data.attributes.username}
                      authorComment={comment.attributes.User?.data.id == getCookie('userId')}
                    />
                  </div>
              ))
              : <div className={styles.commentsPlaceholder}> 
                  Ten post nie ma jeszcze komentarzy
                </div>
            }
            <Box component="form" onSubmit={handleAddComment} noValidate sx={{ mt: 1 }}>
              <TextField
                id="content"
                label="Dodaj komentarz"
                name="content"
                className={styles.textField}
                size='small'
                inputRef={inputRef}
              />
              <Button
                type="submit"
                variant="contained"
                className={styles.sendButton}
              >
                <SendIcon/>
              </Button>
            </Box>
          </div>
        : null
      }
      
    </div>
  )
}

export default ArticleTile