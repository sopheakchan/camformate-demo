import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from 'react-query'
import { useEffect } from 'react'
import ScholarshipContentCard2 from '../../organisms/scholarship-content-card/ScholarshipContentCard2'
import { Typography, Dropdown, Button } from '../../atoms'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'

import ScholarshipSkeleton from '../../organisms/scholarship-skeleton/ScholarshipSkeleton'

const BodySection1 = () => {
  const [type, setType] = useState('')
  const [deadline, setDeadline] = useState('-deadline')
  const [percentages, setPercentages] = useState('')

  const fetchSchoolarships = async page => {
    // const response = await fetch(
    //   `${BASE_URL}/scholarships?pagination=${page}&type=${type}&numberic=${percentages}&sort=${deadline}`,
    // )
    const response = await fetch(
      `${BASE_URL}/scholarships?pagination=${page}&type=${type}&sort=${deadline}`,
    )
    return response.json()
  }

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    ['scholarships', type, deadline, percentages],
    ({ pageParam = 1 }) => fetchSchoolarships(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return lastPage.data?.length !== 0 ? nextPage : undefined
      },
    },
  )

  useEffect(() => {
    let fetching = false
    const handleScroll = async e => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true
        if (hasNextPage) await fetchNextPage()
        fetching = false
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  const router = useRouter()

  const notEmpty = obj => {
    const data = Object.entries(obj).filter(([key, value]) => {
      return value !== '' && value !== false
    })

    return Object.fromEntries(data)
  }

  const [query, setQuery] = useState({
    schoolType: '',
    schoolGeneration: '',
    percentage: '',
    salary: false,
    deadline: false,
  })

  const salaryHandler = () => {
    setQuery({ ...query, salary: !query.salary })

    if (!query.salary) {
      if (type === 'percent') {
        setPercentages('')
      }
      setType('dollars')
    } else {
      setType('percent')
    }
  }

  const deadlineHandler = () => {
    setQuery({ ...query, deadline: !query.deadline })

    if (deadline === '-deadline') {
      setDeadline('deadline')
    } else {
      setDeadline('-deadline')
    }
  }

  const valuePercentage = val => {
    if (val === '100%') {
    } else if (val === '70%') {
      setPercentages('prize<=100')
    } else if (val === '50%') {
      setPercentages('prize<=50')
    } else if (val === '30%') {
      setPercentages('prize<=30')
    } else {
      setPercentages('prize<=10')
    }
  }

  const percentage = [
    { label: '100%', key: 1 },
    { label: '70%', key: 2 },
    { label: '50%', key: 3 },
    { label: '30%', key: 4 },
    { label: '10%', key: 5 },
  ]

  const forwardTo = id => {
    router.push(`/scholarships/${id}`)
  }

  return (
    <div className=" max-w-[1296px] mx-auto mt-20">
      <div className="max-w-screen h-auto px-10 desktop:px-20 overflow-hidden mb-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2 desktop:gap-6 desktop:flex-row">
            <Dropdown
              items={percentage}
              placeholder="100%"
              setValue={valuePercentage}
            />
          </div>
          <div className="flex flex-col items-center gap-6 desktop:flex-row">
            <Button
              variant={query.salary ? 'contained' : 'outlined'}
              intent={query.salary ? 'primary' : 'secondary'}
              className={`rounded-lg border-2 ${
                query.salary ? 'border-primary' : 'border-black'
              } ease-linear duration-200`}
              onClick={salaryHandler}
            >
              Salary
            </Button>
            <Button
              variant={query.deadline ? 'contained' : 'outlined'}
              intent={query.deadline ? 'primary' : 'secondary'}
              className={`rounded-lg border-2 ${
                query.deadline ? 'border-primary' : 'border-black'
              } ease-linear duration-200`}
              onClick={deadlineHandler}
            >
              Deadline
            </Button>
          </div>
        </div>

        <div className="w-full h-[0.10rem] bg-black tablet:h-1 tablet:bg-primary-300 desktop:h-1 desktop:bg-primary-300 mt-4"></div>

        <div className="mt-5 tablet:mt-8 desktop:mt-8">
          <Typography size="sm" className="leading-6">
            The List of scholarships offered by private schools is provided
            below
          </Typography>
        </div>

        <div className="flex flex-wrap  items-center justify-center gap-10 mt-8 mb-4">
          {isLoading &&
            [1, 2, 3, 4, 5, 6].map(i => {
              return <ScholarshipSkeleton />
            })}
          {isSuccess &&
            data.pages?.map(page => {
              return page.data?.map((item, index) => {
                return (
                  <ScholarshipContentCard2
                    data={item}
                    key={index}
                    onClick={forwardTo}
                  />
                )
              })
            })}
        </div>

        <div className="text-center pt-8 text-primary">
          {isFetchingNextPage && 'Loading more page ....'}
        </div>
      </div>
    </div>
  )
}

export default BodySection1
