import JobAnnouncement from './AnnouncementComponents/jobAnnouncement'
import ScholarshipAnnouncement from './AnnouncementComponents/ScholarshipAnnouncement'
import { useState } from 'react'

const selection = [
  { id: 1, name: 'Job' },
  { id: 2, name: 'Scholarship' },
]
const MyAnnouncement = ({ uid }) => {
  const [selector, setSelector] = useState(1)
  return (
    <div className="relative">
      <div className="flex gap-2 sticky top-[119px] pt-2  tablet:top-[79px] tablet:pt-2 tablet:pb-3 tablet:pr-9 bg-white desktop:w-[800px] desktop:top-[90px] z-40 desktop:pt-2">
        {selection.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setSelector(index + 1)}
              className={`${
                index + 1 === selector
                  ? ' bg-primary bg-opacity-20 text-primary border-[1px] border-primary'
                  : '  rounded-3xl text-gray-500 bg-gray-200 bg-opacity-20 border-[1px] border-gray-500'
              } px-4 py-2 rounded-3xl`}
            >
              {item.name}
            </button>
          )
        })}
      </div>

      <div>
        {selector === 1 && <JobAnnouncement uid={uid} />}
        {selector === 2 && <ScholarshipAnnouncement uid={uid} />}
      </div>
    </div>
  )
}

export default MyAnnouncement
