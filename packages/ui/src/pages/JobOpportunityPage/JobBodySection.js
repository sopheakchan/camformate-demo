import React, { useState, useEffect } from 'react'
import {
  Typography,
  Dropdown,
  CheckBox,
  Search,
  CategoryButton,
} from '../../atoms'
import { useRouter } from 'next/router'
import { BsFilterLeft } from 'react-icons/bs'
import { TopCard, JobCard, JobSkeleton, NoResultInfo } from '../../organisms'

import { useInfiniteQuery } from 'react-query'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../apps/client/helper/hooks/auth'

const sortSalary = [
  { key: 1, label: 'Highest Salary' },
  { key: 2, label: 'Lowest Salary' },
  { key: 3, label: 'Deadline' },
]
const schedule = [
  { key: 1, label: 'All' },
  { key: 2, label: 'Full Time' },
  { key: 3, label: 'Part Time' },
  { key: 4, label: 'Flexible' },
]
const workType = [
  { key: 1, label: 'All' },
  { key: 2, label: 'Remote' },
  { key: 3, label: 'On Site' },
  { key: 4, label: 'Flexible' },
  { key: 5, label: 'Internship' },
]

const category = [
  { id: 1, name: 'View All' },
  { id: 2, name: 'Textile and Garment' },
  { id: 3, name: 'Agriculture and Agro-Processing' },
  { id: 4, name: 'Tourism and Hospitality' },
  { id: 5, name: 'Management' },
  { id: 6, name: 'Design' },
  { id: 7, name: 'Customer Service' },
  { id: 8, name: 'Construction' },
  { id: 9, name: 'Manufacturing' },
  { id: 10, name: 'Banking and Finance' },
  { id: 11, name: 'Information Technology (IT)' },
  { id: 12, name: 'Education' },
  { id: 13, name: 'Healthcare' },
  { id: 14, name: 'Mining and Energy' },
]

const JobBodySection = () => {
  const handleJobCategory = categoryName => {
    console.log(categoryName)
  }

  const router = useRouter()

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [scheduleFilter, setScheduleFilter] = useState(
    router.query['Schedule'] || 'All',
  )
  const [workTypeFilter, setWorkTypeFilter] = useState(
    router.query['Work Type'] || 'All',
  )
  const [selectedCategory, setSelectedCategory] = useState('View All')

  const fetchJobs = async page => {
    const response = await fetch(
      `${BASE_URL}/jobs?page[offset]=${page}&search=${search}&sort=${sort}&schedule=${scheduleFilter}&work_type=${workTypeFilter}&job_category=${selectedCategory}`,
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
    ['jobs', search, sort, scheduleFilter, workTypeFilter, selectedCategory],
    ({ pageParam = 1 }) => fetchJobs(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return lastPage.data.length !== 0 ? nextPage : undefined
      },
    },
  )

  useEffect(() => {
    let fetching = false
    const handleScroll = async e => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement

      // console.log(scrollHeight, scrollTop, clientHeight)
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

  const setValue = e => {
    setScheduleFilter(e)
  }

  const setValue2 = e => {
    setWorkTypeFilter(e)
  }

  const [filter, setFilter] = useState(false)
  const handleFilter = () => {
    setFilter(!filter)
  }

  const handleSelectedCategory = e => {
    setSelectedCategory(e)
  }

  const { uid } = useAuth()

  return (
    <div>
      {/* hero section */}
      <div className=" tablet:px-10 desktop:max-w-[1296px] desktop:mt-24 desktop:px-20 m-auto">
        <div className=" m-auto mt-6 flex-col flex px-3 desktop:justify-between tablet:gap-5 tablet:flex-col desktop:flex-row  ">
          <div>
            <h1 className="w-full tablet:text-lg desktop:text-xl font-bold bg-clip-text text-transparent rainbow bg-gradient-to-r from-blue via-danger-500 to-primary">
              Choose a job you love, and you will never have to work a day in
              your life.
            </h1>
            <p className="text-gray-500 text-md mt-6">
              Let&apos;s start with us!
            </p>
          </div>

          <div className="flex justify-center">
            <TopCard />
          </div>
        </div>

        {/* search */}
        <div className="my-10 ">
          <Search
            setSearch={setSearch}
            className="w-[280px] tablet:w-[60%] desktop:w-[50%]"
          />
        </div>

        {/* category */}
        <div className="m-auto flex mx-2 tablet:mx-0 gap-2 overflow-hidden mt-12 overflow-x-scroll pb-2 ">
          {category.map(item => {
            return (
              <CategoryButton
                className={`${
                  item.name === selectedCategory
                    ? 'bg-primary text-white border-gray-200'
                    : ' border-primary bg-primary-200'
                } whitespace-nowrap rounded-2xl px-3 py-2 border-2`}
                category={item.name}
                key={item.id}
                onClick={() => handleSelectedCategory(item.name)}
              />
            )
          })}
        </div>
      </div>

      {/* body section */}
      <div className="flex gap-6 mt-7 justify-center tablet:px-5 desktop:w-full desktop:px-20  desktop:max-w-[1296px] mx-auto mb-8">
        {/* for desktop */}
        <div className="hidden relative items-start tablet:hidden tablet:px-5  desktop:px-0  desktop:flex w-full desktop:justify-between ">
          {/* left */}
          <div className=" sticky top-[50px] tablet:w-1/4 tablet:flex tablet:justify-start tablet:pt-14 desktop:w-1/4 desktop:flex desktop:justify-start flex-col  desktop:pt-14 gap-7 ">
            <CheckBox
              type="Schedule"
              items={schedule}
              setValue={setValue}
              value={scheduleFilter}
            />
            <CheckBox
              type="Work Type"
              items={workType}
              setValue={setValue2}
              value={workTypeFilter}
            />
          </div>
          {/* right */}
          <div className="tablet:w-3/4 tablet:flex tablet:flex-col desktop:w-3/4 desktop:flex flex-col gap-5 ">
            <div className=" flex justify-between items-center mx-5 mb-2 ">
              <div className="flex  gap-4 items-center ">
                <Typography size="sm">Sort by :</Typography>
                <Dropdown
                  items={sortSalary}
                  placeholder="Highest Salary"
                  setValue={setSort}
                />
              </div>
              {search ? (
                <Typography size="sm">
                  Search results:{' '}
                  <span className="text-md text-primary">
                    {data?.pages[0]?.data?.length}
                  </span>
                </Typography>
              ) : (
                ''
              )}
            </div>
            {data?.pages[0]?.data?.length > 0 ? (
              <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-5">
                {isSuccess &&
                  data.pages.map(page => {
                    return page.data.map(item => {
                      return <JobCard key={item._id} allItems={item} />
                    })
                  })}
              </div>
            ) : (
              <div>
                {isLoading ? (
                  <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-5">
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                  </div>
                ) : (
                  <NoResultInfo />
                )}
              </div>
            )}
          </div>
          {isFetchingNextPage && (
            <div className="absolute top-[50%] left-[50%]">
              loading more page...
            </div>
          )}
        </div>

        {/* for mobile and tablet */}
        <div className="flex items-center justify-center flex-col tablet:flex desktop:hidden">
          <div className="w-full flex items-center justify-between gap-3 text-white  mb-3 ">
            <div>
              <div
                onClick={handleFilter}
                className="flex  justify-center items-center gap-2 bg-primary  cursor-pointer px-3 py-1 border-transparent border-gray-200 border-2 rounded-md"
              >
                <BsFilterLeft size={20} />
                <p className="text-sm">Filters</p>
              </div>
            </div>
            {search ? (
              <Typography size="sm">
                <span className="text-md text-black">Search Results:</span>
                <span className="text-md text-primary">
                  {data?.pages[0]?.data?.length}
                </span>
              </Typography>
            ) : (
              ''
            )}
          </div>
          <div className={filter ? '  left-0 top-0 ' : ' hidden '}>
            <div className="flex  tablet:w-[500px] flex-col   gap-5 mb-5 justify-center">
              <div className="flex flex-col justify-center items-center ">
                <div>
                  <Typography className="text-[13px]" color="text-gray-500">
                    Sort by
                  </Typography>
                  <Dropdown
                    className="w-[240px] tablet:w-[300px]"
                    items={sortSalary}
                    placeholder="Highest Salary"
                    setValue={setSort}
                  />
                </div>
              </div>
              <div className="flex px-2 tablet:px-8 gap-10 w-full justify-evenly  items-start tablet:justify-evenly">
                <CheckBox
                  type="Schedule"
                  items={schedule}
                  setValue={setValue}
                  value={scheduleFilter}
                />
                <CheckBox
                  type="Work Type"
                  items={workType}
                  setValue={setValue2}
                  value={workTypeFilter}
                />
              </div>
            </div>
          </div>

          {data?.pages[0]?.data?.length > 0 ? (
            <div className=" w-full flex items-center flex-col gap-10 tablet:grid tablet:gap-16  tablet:grid-cols-2 tablet:place-content-between">
              {isSuccess &&
                data.pages.map(page => {
                  return page.data.map(item => {
                    return <JobCard key={item._id} allItems={item} />
                  })
                })}
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div className="w-full flex items-center flex-col gap-10 tablet:grid tablet:gap-16  tablet:grid-cols-2 tablet:place-content-between">
                  <JobSkeleton />
                  <JobSkeleton />
                  <JobSkeleton />
                  <JobSkeleton />
                  <JobSkeleton />
                  <JobSkeleton />
                </div>
              ) : (
                <NoResultInfo />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobBodySection
