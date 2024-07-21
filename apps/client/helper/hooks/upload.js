import { createContext, useState, useContext, useRef } from 'react'

const uploadContext = createContext()

export default function useUpload() {
  return useContext(uploadContext)
}

export function UploadProvider(props) {
  // form detail
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [address, setAddress] = useState('')
  const [deadline, setDeadline] = useState('')
  const [slot, setSlot] = useState(0)
  const [jobCategory, setJobCategory] = useState('Others')
  const [jobTitle, setJobTitle] = useState('')
  const [jobSchedule, setJobSchedule] = useState('Full Time')
  const [jobType, setJobType] = useState('On Site')
  const [startSalary, setStartSalary] = useState('Negotiable')
  const [endSalary, setEndSalary] = useState('')
  const [rewardType, setRewardType] = useState('Dollars $')
  const [rewardAmount, setRewardAmount] = useState(0)
  const [schoolName, setSchoolName] = useState('')

  // upload image
  const inputRef = useRef(null)
  const [file, setFile] = useState({})

  //requirements
  const [require, setRequire] = useState([
    {
      id: 1,
      requirement: '',
    },
  ])

  //benefits
  const [benefit, setBenefit] = useState([
    {
      id: 1,
      benefit: '',
    },
  ])

  //contacts
  const [email, setEmail] = useState('')
  const [web, setWeb] = useState('')
  const [phone, setPhone] = useState([
    {
      id: 1,
      value: '',
    },
  ])

  //description
  const [des, setDes] = useState('')

  //image to show when chose
  const [image, setImage] = useState('')

  // data
  const data = {
    name,
    address,
    deadline,
    slot,
    jobCategory,
    jobTitle,
    jobSchedule,
    jobType,
    startSalary,
    endSalary,
    file,
    require,
    benefit,
    email,
    web,
    phone,
    des,
    rewardType,
    rewardAmount,
    schoolName,
  }

  const value = {
    name,
    setName,
    type,
    setType,
    address,
    setAddress,
    deadline,
    setDeadline,
    slot,
    setSlot,
    jobCategory,
    setJobCategory,
    jobTitle,
    setJobTitle,
    startSalary,
    setStartSalary,
    endSalary,
    setEndSalary,
    inputRef,
    file,
    setFile,
    require,
    setRequire,
    email,
    setEmail,
    web,
    setWeb,
    phone,
    setPhone,
    des,
    setDes,
    data,
    rewardType,
    setRewardType,
    rewardAmount,
    setRewardAmount,
    benefit,
    setBenefit,
    image,
    setImage,
    schoolName,
    setSchoolName,
    jobType,
    setJobType,
    jobSchedule,
    setJobSchedule,
  }

  return <uploadContext.Provider value={value} {...props} />
}
