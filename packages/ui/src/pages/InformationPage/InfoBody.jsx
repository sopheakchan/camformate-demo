import React from 'react'
import {
  Shape,
  Typography,
  Button,
  Loading,
  DropdownInfo,
  Search,
} from '../../atoms'
import { InfoCard, NoResultInfo, InfoSkeleton } from '../../organisms'
import { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'

const InfoBody = () => {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const fetchInformations = async page => {
    const response = await fetch(
      `${BASE_URL}/informations?page[offset]=${page}&search=${search}&location=${location}`,
    )
    // if (!response.ok) {
    //   throw new Error('Network response was not ok')
    // }

    return response.json()
  }

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    ['informations', search, location],
    ({ pageParam = 1 }) => fetchInformations(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        // return lastPage.data.length !== 0 ? nextPage : undefined
        return lastPage.data && lastPage.data.length !== 0
          ? nextPage
          : undefined
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

  return (
    <>
      <div className="max-w-[1296px] mx-auto">
        <div className="flex flex-col my-10 tablet:mx-10 tablet:flex tablet:flex-col tablet:justify-between tablet:gap-4  desktop:flex desktop:flex-row desktop:my-16 desktop:justify-between desktop:mx-20">
          <div className="flex flex-col items-center tablet:items-start desktop:items-start">
            <Shape
              location="bottom"
              className="tablet:w-[150px] desktop:w-[200px] w-[150px]"
              height="sm"
              radius="md"
              color="primary"
            >
              <Typography className="desktop:text-xl fontWeight:text-normal desktop:mx-5 tablet:mx-5 text-lg fontWeight:normal ">
                Information
              </Typography>
            </Shape>
            <Typography className="desktop:text-lg desktop:fontWeight:normal desktop:w-[500px] desktop:my-3 desktop:text-gray-500 tablet:my-3 tablet:w-[450px] tablet:text-md tablet:fontWeight-normal my-3 text-sm text-gray-500 mx-5">
              Information of Universities in Cambodia are here
            </Typography>
          </div>
          <div className="desktop:gap-5 tablet:gap-16  tablet:justify-center flex gap-2 justify-center items-center">
            <div className="tablet:flex tablet:items-center flex gap-2">
              <Search
                className="desktop:w-[400px] tablet:w-[600px] w-[250px] "
                setSearch={setSearch}
              />
              <div>
                <DropdownInfo
                  setLocationName={setLocation}
                  location={location}
                  setSearch={setSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-16 p-8 justify-center items-center">
          <InfoSkeleton />
          <InfoSkeleton />
          <InfoSkeleton />
          <InfoSkeleton />
          <InfoSkeleton />
          <InfoSkeleton />
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-16 p-8 justify-center items-center">
          {isSuccess && data.pages[0].data?.length > 0 ? (
            data.pages?.map(page => {
              return page.data?.map(item => {
                return <InfoCard key={item._id} data={item} />
              })
            })
          ) : (
            <NoResultInfo />
          )}
        </div>
      )}
    </>
  )
}

export default InfoBody
