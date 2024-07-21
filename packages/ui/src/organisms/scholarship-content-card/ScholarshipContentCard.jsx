import PropTypes from 'prop-types'

import Typography from './../../atoms/typography/Typography'
import Button from './../../atoms/button/Button'
import Icon from './../../atoms/icon/Icon'
import { useState } from 'react'

export const ScholarshipContentCard = ({ onClick, data }) => {
  // console.log(data.id)
  const [more, setMore] = useState(false)
  const { id, attributes } = data

  // console.log()
  // const {
  //   scholarship_name,
  //   description,
  //   location,
  //   majors,
  //   prize,
  //   deadline,
  //   colleges,
  // } = attributes
  const date = new Date(attributes.deadline)

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const formattedDate = date.toLocaleDateString('en-US', options)

  const placeIcon = (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.6522 22.3843L20.7836 17.5166C20.5639 17.2969 20.266 17.1748 19.9535 17.1748H19.1576C20.5053 15.4512 21.306 13.2837 21.306 10.9253C21.306 5.31543 16.7597 0.77002 11.1494 0.77002C5.53904 0.77002 0.992188 5.31543 0.992188 10.9253C0.992188 16.5352 5.53855 21.0806 11.1494 21.0806C13.5077 21.0806 15.6762 20.2798 17.3998 18.9321V19.728C17.3998 20.0405 17.5219 20.3384 17.7416 20.5581L22.6102 25.4258C23.0692 25.8848 23.8114 25.8848 24.2655 25.4258L25.6473 24.0439C26.1063 23.585 26.1063 22.8433 25.6522 22.3843ZM11.1494 17.9556C7.26559 17.9556 4.11815 14.814 4.11815 10.9253C4.11815 7.04199 7.26022 3.89502 11.1494 3.89502C15.0331 3.89502 18.1806 7.03662 18.1806 10.9253C18.1806 14.8086 15.0385 17.9556 11.1494 17.9556ZM11.1503 6.23877C9.15914 6.23877 7.54489 7.85254 7.54489 9.84375C7.54489 11.4531 9.90132 14.3872 10.8041 15.4521C10.8465 15.5028 10.8994 15.5436 10.9593 15.5715C11.0191 15.5995 11.0843 15.614 11.1503 15.614C11.2164 15.614 11.2816 15.5995 11.3414 15.5715C11.4012 15.5436 11.4542 15.5028 11.4965 15.4521C12.3994 14.3872 14.7558 11.4536 14.7558 9.84375C14.7558 7.85254 13.1415 6.23877 11.1503 6.23877ZM11.1503 10.9263C10.5029 10.9263 9.97847 10.4014 9.97847 9.75439C9.97847 9.10693 10.5034 8.58252 11.1503 8.58252C11.7973 8.58252 12.3222 9.10693 12.3222 9.75439C12.3222 10.4014 11.7973 10.9263 11.1503 10.9263Z"
        fill="#f97316"
      />
    </svg>
  )

  const collegeIcon = (
    <svg
      width="26"
      height="16"
      viewBox="0 0 26 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.3021 4.25449L14.4061 0.906836C13.8123 0.724414 13.1717 0.724414 12.5783 0.906836L1.68184 4.25449C0.762305 4.53691 0.762305 5.75293 1.68184 6.03535L3.58145 6.61895C3.16465 7.13418 2.9084 7.7627 2.88301 8.45098C2.50684 8.6666 2.24199 9.05566 2.24199 9.52012C2.24199 9.94121 2.46387 10.2955 2.7834 10.5221L1.78613 15.0096C1.69941 15.3998 1.99629 15.7701 2.3959 15.7701H4.5877C4.9877 15.7701 5.28457 15.3998 5.19785 15.0096L4.20059 10.5221C4.52012 10.2955 4.74199 9.94121 4.74199 9.52012C4.74199 9.06816 4.48926 8.69004 4.13027 8.47051C4.15996 7.88379 4.45996 7.36504 4.93848 7.03613L12.5779 9.3834C12.9318 9.49199 13.6107 9.62754 14.4057 9.3834L25.3021 6.03574C26.2221 5.75293 26.2221 4.5373 25.3021 4.25449ZM14.7729 10.5783C13.6584 10.9205 12.7088 10.7314 12.2107 10.5783L6.5459 8.83809L5.99199 13.2701C5.99199 14.651 9.3498 15.7701 13.492 15.7701C17.6342 15.7701 20.992 14.651 20.992 13.2701L20.4381 8.8377L14.7729 10.5783Z"
        fill="#f97316"
      />
    </svg>
  )

  const majorIcon = (
    <svg
      width="23"
      height="26"
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.8672 18.3481V1.94189C22.8672 1.29248 22.3447 0.77002 21.6953 0.77002H5.67969C3.0918 0.77002 0.992188 2.86963 0.992188 5.45752V21.0825C0.992188 23.6704 3.0918 25.77 5.67969 25.77H21.6953C22.3447 25.77 22.8672 25.2476 22.8672 24.5981V23.8169C22.8672 23.4507 22.6963 23.1187 22.4326 22.9038C22.2275 22.1519 22.2275 20.0083 22.4326 19.2563C22.6963 19.0464 22.8672 18.7144 22.8672 18.3481ZM7.24219 7.31299C7.24219 7.15186 7.37402 7.02002 7.53516 7.02002H17.8867C18.0479 7.02002 18.1797 7.15186 18.1797 7.31299V8.28955C18.1797 8.45068 18.0479 8.58252 17.8867 8.58252H7.53516C7.37402 8.58252 7.24219 8.45068 7.24219 8.28955V7.31299ZM7.24219 10.438C7.24219 10.2769 7.37402 10.145 7.53516 10.145H17.8867C18.0479 10.145 18.1797 10.2769 18.1797 10.438V11.4146C18.1797 11.5757 18.0479 11.7075 17.8867 11.7075H7.53516C7.37402 11.7075 7.24219 11.5757 7.24219 11.4146V10.438ZM19.6152 22.645H5.67969C4.81543 22.645 4.11719 21.9468 4.11719 21.0825C4.11719 20.2231 4.82031 19.52 5.67969 19.52H19.6152C19.5225 20.355 19.5225 21.8101 19.6152 22.645Z"
        fill="#f97316"
      />
    </svg>
  )

  return (
    // containers

    <div className="grid gap-2  grid-rows-1 tablet:place-content-center desktop:place-content-center desktop:grid-cols-[10rem_56.75rem]">
      {/* left items */}

      <div className="flex-col items-end hidden desktop:flex desktop:items-center desktop:justify-center">
        <Typography size="xs" className="mb-1">
          Scholarship
        </Typography>
        <Typography size="lg" color="text-danger" className="mb-3">
          {attributes?.prize?.amount}{' '}
          {attributes?.prize?.type === 'dollars' ? '$' : '%'}
        </Typography>
        <Typography size="xs" className="mb-1">
          Deadline
        </Typography>
        <Typography size="xs" color="text-danger" className="mb-3">
          {formattedDate}
        </Typography>
        <Button
          size="md"
          // variant="contained"
          // intent="secondary"
          onClick={() => onClick(id)}
          className="rounded-[0.50rem] hover:border-black hover:text-black hover:bg-transparent border-2 border-primary ease-linear duration-200"
        >
          See More
        </Button>
      </div>
      {/*end of left items */}

      {/* right items with full of information */}

      <div className="px-6 tablet:px-16 desktop:px-16 shadow-sm py-8">
        <Typography className="text-center text-md tablet:text-lg desktop:text-lg ">
          {attributes?.scholarship_name}
        </Typography>
        <Typography
          size="xs"
          className="py-4 hidden tablet:block desktop:block"
        >
          {attributes?.description}
        </Typography>
        <Typography
          size="xs"
          className="py-4 block tablet:hidden desktop:hidden"
        >
          {more
            ? attributes?.description
            : `${attributes?.description.slice(0, 200)}...`}
          <button
            className="text-primary-300"
            onClick={() => {
              setMore(!more)
            }}
          >
            {more ? 'Show Less' : 'Show More'}
          </button>
        </Typography>
        <div className="hidden desktop:block">
          <div className="flex gap-4 items-center justify-start py-1">
            <Icon icon={placeIcon} />
            <Typography size="xs">{attributes?.location}</Typography>
          </div>
          <div className="flex gap-4 items-center justify-start py-1">
            <Icon icon={collegeIcon} />
            <Typography size="xs">{attributes?.colleges}</Typography>
          </div>
          <div className="flex gap-4 items-center justify-start py-1">
            <Icon icon={majorIcon} />
            <Typography size="xs">{attributes?.majors}</Typography>
          </div>
        </div>
        <div className="flex flex-col desktop:hidden">
          <div className="flex justify-between items-center">
            <Typography size="xs" className="mb-1">
              AWARD
            </Typography>
            <Typography size="md" color="text-danger" className="mb-3">
              {attributes?.prize?.amount}{' '}
              {attributes?.prize?.type === 'dollars' ? '$' : '%'}
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Typography size="xs" className="mb-1">
              DEADLINE
            </Typography>
            <Typography size="md" color="text-danger" className="mb-1">
              {formattedDate}
            </Typography>
          </div>
          <Button
            size="md"
            // variant="contained"
            // intent="secondary"
            onClick={() => onClick(id)}
            className="rounded-[0.50rem] mt-3"
          >
            See More
          </Button>
        </div>
      </div>
      {/* end of right items with full of information */}
    </div>
  )
}

ScholarshipContentCard.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number,
  awardAmount: PropTypes.number,
  deadline: PropTypes.string,
  university: PropTypes.string,
  content: PropTypes.string,
  location: PropTypes.string,
  college: PropTypes.string,
  major: PropTypes.string,
}
