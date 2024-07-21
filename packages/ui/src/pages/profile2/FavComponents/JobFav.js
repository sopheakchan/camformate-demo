import React, { useState, useEffect } from 'react'
import JobCard from '../../../organisms/newJobCard/job2'
import axios from 'axios'
import { BASE_URL } from '../../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../../apps/client/helper/hooks/auth'
import { JobSkeleton } from '../../../organisms'
import { Button } from '../../../atoms'
import { FaHeartBroken } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { useRouter } from 'next/router'

const jobCard = [
  {
    company: 'XYZ Healthcare',
    job_name: 'Registered Nurse',
    salary: '800$',
    deadline: '30 April, 2023',
    location: 'Los Angeles',
    description:
      'We are seeking a compassionate and skilled Registered Nurse to join our team. The successful candidate will be responsible for providing quality patient care and ensuring the comfort and well-being of our patients.',
    slots: 4,
    schedule: 'Part Time',
    work_type: 'Remote',
    requirements: [
      {
        id: 1,
        requirement: 'Registered Nurse (RN) license in California',
      },
      {
        id: 2,
        requirement: '2+ years of experience in a clinical setting',
      },
      {
        id: 3,
        requirement: 'Excellent communication and interpersonal skills',
      },
      {
        id: 4,
        requirement:
          'Ability to work in a fast-paced environment and handle stressful situations',
      },
    ],
    benefits: [
      {
        id: 1,
        benefit: 'Health and dental benefits',
      },
      {
        id: 2,
        benefit: 'Paid time off',
      },
      {
        id: 3,
        benefit: 'Continuing education opportunities',
      },
    ],
  },
  {
    company: 'XYZ Corp',
    job_name: 'Marketing Manager',
    salary: '700$',
    deadline: '30 April, 2023',
    location: 'New York City',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    slots: 2,
    schedule: 'Full Time',
    work_type: 'On Site',
    requirements: [
      {
        id: 1,
        requirement: '5 years of experience in marketing',
      },
      {
        id: 2,
        requirement: 'Bachelor degree in Marketing or related field',
      },
      {
        id: 3,
        requirement: 'Excellent communication and interpersonal skills',
      },
      {
        id: 4,
        requirement: 'Ability to work well under pressure and meet deadlines',
      },
    ],
    benefits: [
      {
        id: 1,
        benefit: 'Health insurance',
      },
      {
        id: 2,
        benefit: '401k plan',
      },
      {
        id: 3,
        benefit: 'Paid time off',
      },
    ],
  },
  {
    company: 'ABC Financial',
    job_name: 'Financial Analyst',
    salary: '600$',
    deadline: '30 April, 2023',
    location: 'Toronto',
    description:
      'We are seeking a highly motivated Financial Analyst to join our team. The successful candidate will be responsible for analyzing financial data and providing insights to support decision-making processes.',
    slots: 3,
    schedule: 'Full Time',
    work_type: 'Internship',
    requirements: [
      {
        id: 1,
        requirement: 'Bachelor degree in Finance or related field',
      },
      {
        id: 2,
        requirement: '2+ years of experience in financial analysis',
      },
      {
        id: 3,
        requirement: 'Excellent analytical and problem-solving skills',
      },
      {
        id: 4,
        requirement: 'Advanced proficiency in Microsoft Excel',
      },
    ],
    benefits: [
      {
        id: 1,
        benefit: 'Comprehensive health and dental benefits',
      },
      {
        id: 2,
        benefit: 'RRSP matching program',
      },
      {
        id: 3,
        benefit: 'Flexible work arrangements',
      },
    ],
  },
]
const JobFav = ({ uid }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { token } = useAuth()

  // fetch favorite
  const fetchJobFavorite = async () => {
    setLoading(true)
    const response = await axios.get(`${BASE_URL}/users/${uid}/favorites`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: { type: 'jobs' },
    })
    if (response.data.status === 'Success') {
      const data = await response.data.favorites.filter(
        fav => fav.type === 'jobs',
      )
      setJobs(data)
    }
    setLoading(false)
  }

  //skeleton component
  const SkeletonComponent = () => {
    return (
      <div className="flex flex-col gap-7 items-center justify-center tablet:grid  tablet:grid-cols-2  desktop:grid desktop:grid-cols-3 mt-8">
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
      </div>
    )
  }

  useEffect(() => {
    fetchJobFavorite()
  }, [])

  if (jobs.length === 0 && !loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-8">
        <FaHeartBroken className="text-danger text-xl" />
        <span className="text-md text-gray-500 opacity-70">No Favorites</span>
        <Button
          icon={<BsSearch />}
          iconAppearance="text-primary"
          className="rounded-lg bg-opacity-20 text-primary active:scale-110"
          onClick={() => router.push('/job')}
        >
          Browse Jobs
        </Button>
      </div>
    )
  }

  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div className="flex flex-col gap-10 items-center justify-center tablet:grid tablet:grid-cols-2 desktop:grid desktop:grid-cols-3 mt-8 mb-8">
          {jobs?.map((item, index) => {
            return <JobCard allItems={item.id} key={index} />
          })}
        </div>
      )}
    </div>
  )
}

export default JobFav
