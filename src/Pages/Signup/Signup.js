import React, { useState } from 'react';
import Button from '../../Component/Button/Button';
import Input from '../../Component/Input/Input';
import Vector from '../../Assets/Svg/Group.svg';
import { auth, firestore, storage } from '../../Config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc, } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import UploadImage from '../../Assets/Images/image.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [uploading, setUploading] = useState(false);
  const notifySuccess = () => toast.success("Account created successfully", { position: toast.POSITION.TOP_CENTER }, { autoClose: 10000 });
  const notifyError = () => toast.error("Failed to create account", { position: toast.POSITION.TOP_CENTER });

  const createAccount = async () => {
    setCreatingAccount(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userInfo) => {
        await setDoc(doc(firestore, "users", userInfo.user.uid), {
          uid: userInfo.user.uid,
          firstName,
          lastName,
          userName,
          title,
          mobileNumber,
          email,
          password,
          profileImage,
          isOnline: false,
          createdAt: serverTimestamp()
        })
      })
      .then((res) => {
        setCreatingAccount(false)
        notifySuccess()
      })
      .catch((err) => {
        setCreatingAccount(false)
        notifyError()
      })
  }

  const handleChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  const uploadImage = async () => {
    if (profileImage === null) setProfileImage("");
    setUploading(true)
    const imageRef = ref(storage, `images/${profileImage.name}`)
    await uploadBytesResumable(imageRef, profileImage)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((imgUrl) => {
            setProfileImage(imgUrl)
            setUploading(false)
          })
      })
      .catch((err) => {
        setUploading(false)
      })
  }

  return (
    <div className='signup-container'>
      <ToastContainer />
      <div className='vector-bg-container'>
        <div>
          <p className='vector-title'>The best way to communicate with your <span style={{ color: "#ecb22e" }}>friends</span></p>
        </div>
        <div className='vector-img'>
          <img src={Vector} alt="" width="300"></img>
        </div>
      </div>
      <div className='form-container'>
        <p className='create-account'>Create your Social World Account</p>
        <p className='personal-info'>Personal Information</p>
        <div className='input-container'>
          <div className='input-fields-container'>
            <div>
              <p className='input-title'>First Name</p>
              <Input type="text" placeholder="Your first name" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <p className='input-title'>Last Name</p>
              <Input type="text" placeholder="Your last name" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className='input-fields-container'>
            <div>
              <p className='input-title'>Title</p>
              <Input type="text" placeholder="Your title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <p className='input-title'>Username</p>
              <Input type="text" placeholder="Enter username" className="input" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
          </div>
          <div className='input-fields-container'>
            <div>
              <p className='input-title'>Your Mobile Number</p>
              <Input type="text" placeholder="+92" className="input" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>
            <div>
              <p className='input-title'>Email Address</p>
              <Input type="text" placeholder="Enter your email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className='input-fields-container'>
            <div>
              <p className='input-title'>Set Password</p>
              <Input type="text" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <p className='input-title'>Confirm Password</p>
              <Input type="text" placeholder="Confirm Password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <p className='input-title'>Upload Profile Image</p>
            <div class="avatar-upload">
              <div class="avatar-edit">
                <input type='file' id="imageUpload" accept="" onChange={(e) => handleChange(e)} />
              </div>
              <div class="avatar-preview">
                <label for="imageUpload">
                  <img id="imagePreview" src={profileImage ? profileImage : UploadImage} />
                </label>
              </div>
            </div>
            <Button className="image-upload-btn" title={uploading ? "Uploading..." : "Upload"} disable={!profileImage} onClick={uploadImage} />
          </div>
          <div className='create-account-btn-container'>
            <Button className="create-account-btn" title={creatingAccount ? "Creating..." : "Create Your Account"} disable={!firstName || !lastName || !userName || !email || !password || !title || !mobileNumber || !confirmPassword} onClick={createAccount} />
          </div>
        </div>
      </div>
    </div>
  )

}

export default Signup;