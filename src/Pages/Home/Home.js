import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PostModal } from '../../Component/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserAsync, setFriendsAsync } from '../../Store/Users/AsyncUser';
import { setCommentsAsync } from '../../Store/Comment/AsyncComment';
import { getPostsAsync } from '../../Store/Posts/AsyncPost';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore, storage } from '../../Config/Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Card from '../../Component/Card/Card';
import Input from '../../Component/Input/Input';
// import Button from '../../Component/Button/Button';
import Button from '@mui/material/Button';
import moment from 'moment';
import gsap from 'gsap';
import './Home.css';
import { Delete, Edit, Send } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Home = () => {

  // const [currentUser, setCurrentUser] = useState()
  // const [friends, setFriends] = useState()
  // const [posts, setPosts] = useState()
  const [selectedComments, setSelectedComments] = useState()
  const [modal, setModal] = useState(false)
  const [postTitle, setPostTitle] = useState("")
  const [postDescription, setPostDescription] = useState("")
  const [postImage, setPostImage] = useState(null)
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [posting, setPosting] = useState(false)
  const [comment, setComment] = useState("")
  const [gifs, setGifs] = useState()

  const dispatch = useDispatch()
  const state = useSelector((state) => state.users.currentUser)
  const state2 = useSelector((state) => state.users.users)
  const postState = useSelector((state) => state.posts.posts)
  const loadPosts = useSelector((state) => state.posts.loadPosts)
  const commentState = useSelector((state) => state.comments.comments)
  const TLLoader = gsap.timeline({ repeat: -1 });

  const open = () => setModal(true)
  const close = () => setModal(false)

  useEffect(() => {
    TLLoader
      .to('.loader', { rotation: 45, duration: 0.5 })
      .to('.loader .square', { rotation: 90 }, '-=0.5')
      .to('.loader .s1', { backgroundColor: '#36C5F0', duration: 0.2 })
      .to('.loader .s2', { backgroundColor: '#1EB67D', duration: 0.2 })
      .to('.loader .s4', { backgroundColor: '#E01E5A', duration: 0.2 })
      .to('.loader .s3', { backgroundColor: '#ECB22E', duration: 0.2 })
      .to('.loader .square', { borderRadius: 50, duration: 0.5 })
      .to('.loader', { rotation: 360, ease: "elastic.inOut(1, 0.3)", duration: 2.5 }, '-=0.5')
      .to('.loader .square', { borderRadius: 0, duration: 0.5 }, '-=0.5')
  }, [loadPosts])

  const uploadPostImage = async () => {
    if (postImage === null) setPostImage("")
    setUploading(true)
    const imgRef = ref(storage, `posts-images/${postImage.name}`)
    await uploadBytesResumable(imgRef, postImage)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((url) => {
            setImage(url)
            alert("uploaded")
          })
      })
    setUploading(false)
  }

  const createPost = async () => {
    setPosting(true)
    await addDoc(collection(firestore, "posts"), {
      postuid: auth.currentUser.uid,
      postedBy: state[0].firstName + " " + state[0].lastName,
      avatar: state[0].profileImage,
      postTitle,
      postDescription,
      image,
      createdAt: serverTimestamp(),
    })
    setPosting(false)
    close();
  }

  const sendComment = async (post) => {
    setComment("")
    await addDoc(collection(firestore, "comments"), {
      commentOn: post.postId,
      commentBy: state[0].firstName + " " + state[0].lastName,
      avatar: state[0].profileImage,
      comment,
      commentAt: serverTimestamp(),
    })
    console.log("post =>", post);
  }

  useEffect(() => {
    dispatch(setCurrentUserAsync())
    dispatch(setFriendsAsync())
    dispatch(getPostsAsync())
    dispatch(setCommentsAsync())
  }, [])

  // async function getGifs() {
  //   const res = await axios.get('https://api.giphy.com/v1/stickers/search?api_key=Mt3e1imj692lGtjHW8vYEIpPsIGHyFXe&q=smile&limit=25&offset=0&rating=g&lang=en')
  //   setGifs(res.data.data)
  // }

  // useEffect(() => {
  //   getGifs();
  // }, [])

  // console.log(gifs);

  return (
    <div>
      {modal &&
        <PostModal style="postModal" modal={modal} setModal={setModal} open={open} close={close}>
          <p>Create post</p>
          <Input type="text" value={postTitle} placeholder="Title" className="post-title" onChange={(e) => setPostTitle(e.target.value)} />
          <Input type="text" value={postDescription} placeholder="Description" className="post-description" onChange={(e) => setPostDescription(e.target.value)} />
          <Input type="file" className="post-image" onChange={(e) => setPostImage(e.target.files[0])} />
          <button onClick={uploadPostImage}>{uploading ? "Uploading..." : "Upload"}</button>
          <button onClick={createPost}>{posting ? "Posting..." : "Post"}</button>
        </PostModal>
      }
      <div className='home-content-container'>
        <Sidebar className="menu-sidebar">
          <div className='sidebar-links'>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/friends">Friends</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/photos">Photos</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/videos">Videos</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/marketplace">Marketplace</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/feeds" >Feeds</NavLink>
          </div>
        </Sidebar>
        <div>
          <Card className="create-post-card">
            {state?.map(v => {
              return (
                <>
                  <div>
                    <img className='post-user-img' src={v.profileImage}></img>
                  </div>
                  <div onClick={open} className='open-modal'>
                    <p>What is in your mind ? {v.firstName} </p>
                  </div>
                </>
              )
            })}
          </Card>
          {loadPosts ? (
            <div className='loader-container'>
              <div className="loader">
                <div className="square s1"></div>
                <div className="square s2"></div>
                <div className="square s3"></div>
                <div className="square s4"></div>
              </div>
            </div>
          ) : (
            <>
              {postState?.map((post) => {
                return (
                  <Card className="post-card">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img className='post-user-img' src={post.avatar} alt='' />
                        <div>
                          <p style={{ fontSize: "16px", margin: "0 0 0 15px" }}>{post.postedBy}</p>
                          <p style={{ fontSize: "14px", margin: "6px 0 0 15px" }}>{moment(post.createdAt?.toDate()).fromNow()}</p>
                        </div>
                      </div>
                      <div>
                        {post.postuid === auth.currentUser.uid && (
                          <>
                            <Tooltip title="Edit">
                              <Edit color='success' sx={{ fontSize: 25 }} style={{ cursor: "pointer", margin: "0 5px" }} />
                            </Tooltip>
                            <Tooltip title="Delete">
                              <Delete color='error' sx={{ fontSize: 25 }} style={{ cursor: "pointer", margin: "0 5px" }} />
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: "20px", margin: "15px 0" }}>{post.postTitle}</p>
                    <p style={{ fontSize: "15px", margin: "15px 0" }}>{post.postDescription}</p>
                    <img src={post.image} style={{ width: "100%" }} />
                    <div style={{ display: "flex", alignItems: "center", margin: "15px 0" }}>
                      <img className='post-user-img' src={state[0]?.profileImage} alt='' />
                      <Input value={comment} type="text" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} className="comment-box" />
                      <Button onClick={() => sendComment(post)} variant="contained" endIcon={<Send />}>
                        Send
                      </Button>
                    </div>
                    {commentState?.map((comment) => post.postId === comment.commentOn &&
                      <>
                        <div style={{ display: "flex", alignItems: "center", margin: "10px 0 0 0" }}>
                          <img className='post-user-img' src={comment.avatar} alt='' />
                          <div style={{ padding: "10px 15px", borderRadius: "10px", margin: "0 15px", width: "100%", height: "100%", backgroundColor: "#F0F2F5" }}>
                            <p style={{ fontSize: "14px", fontWeight: "700" }}>{comment.commentBy}</p>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                        <p style={{ fontSize: "10px", margin: "5px 80px 0 80px" }}>{moment(comment.commentAt?.toDate()).fromNow()}</p>
                      </>
                    )}
                    {/* {gifs.map((data) => {
                      return (
                        <div key={data.id} className="gif">
                          <img src={data.images.fixed_height.url} />
                        </div>
                      )
                    })} */}
                  </Card>
                )
              })}
            </>
          )}
        </div>
        <Sidebar className="chat-sidebar">
          <p className='friends'>Friends</p>
          {state2?.map((v) => {
            return (
              <>
                <div style={{ display: "flex", alignItems: "center", margin: "20px 0", position: "relative" }}>
                  <div style={{ width: "12px", height: "12px", position: "absolute", left: "35px", top: "0px", borderRadius: "50%" }} className={v.isOnline === true ? "online" : "offline"} ></div>
                  <img className='friends-img' src={v.profileImage}></img>
                  <p style={{ marginLeft: "15px", fontSize: "16px" }}>{v.firstName + " " + v.lastName}</p>
                </div>
              </>
            )
          })}
        </Sidebar>
      </div>
    </div>
  )
}

export default Home;