import React from 'react'
import UploadImage from '../components/UploadImage'
import { Field } from '../components/Field'
import { Selector } from '../components/Selector'
import {
  jobTypeCategory,
  jobScheduleCategory,
  scholarshipRewardTypes,
  salaryTypeCategory,
  jobWorkPlace,
} from '../../Upload/data'
import { FaWpforms } from 'react-icons/fa'
import { useRouter } from 'next/router'

const PageOne = ({ values }) => {
  const router = useRouter()
  const urlPath = router.pathname.split('/')[2]

  return (
    <>
      <div className="flex gap-2 mb-4 items-center">
        <span className="p-2 rounded-full bg-gray-500 bg-opacity-30">
          <FaWpforms className="text-xl text-black" />
        </span>
        <span className="text-lg font-bold text-primary">
          Detail Information
        </span>
      </div>

      {/* upload image  */}
      <div className="w-[90%] tablet:w-[80%] desktop:w-[80%] mx-auto flex flex-col justify-center items-center">
        <UploadImage
          imageSrc={values.imageUrl || values.image_url}
          name="file"
        />
      </div>

      <div className="w-[90%] mx-auto">
        {/* company name*/}
        <Field
          label={`${urlPath === 'jobs' ? 'Company Name' : 'Announcement Name'}`}
          name={`${urlPath === 'jobs' ? 'company' : 'scholarship_name'}`}
          type="text"
          placeholder={`${
            urlPath === 'jobs' ? 'Company Name' : 'Announcement Name'
          }`}
        />

        {/* job title  */}
        <div className={`${urlPath === 'jobs' ? 'flex' : 'hidden'}`}>
          <Field
            label="Job Title"
            name="job_name"
            type="text"
            placeholder="Job Title"
          />
        </div>

        {/* school name  */}
        <div className={`${urlPath === 'scholarships' ? 'flex' : 'hidden'}`}>
          <Field
            label="School Name"
            name="school_name"
            type="text"
            placeholder="School Name"
          />
        </div>

        {/* award type & amount  */}
        <div
          className={`${
            urlPath === 'scholarships' ? 'flex' : 'hidden'
          } flex-col tablet:flex-row desktop:flex-row justify-between mt-2`}
        >
          <div className="w-full desktop:w-[450px] tablet:w-[300px]">
            <Selector
              options={scholarshipRewardTypes}
              size="lg"
              value={values.price?.type}
              label="Reward Type"
              name="price.type"
            />
          </div>
          <div className="w-full desktop:w-[450px] tablet:w-[300px]">
            <Field
              label="Award"
              name="price.amount"
              type="number"
              placeholder="Award"
            />
          </div>
        </div>

        {/* job category & job schedule  */}
        <div
          className={`${
            urlPath === 'jobs' ? 'flex' : 'hidden'
          } flex-col tablet:flex-row desktop:flex-row justify-between mt-2`}
        >
          <Selector
            options={jobTypeCategory}
            size="lg"
            value={values.job_category}
            label="Job Field"
            name="job_category"
          />
          <Selector
            options={jobScheduleCategory}
            size="lg"
            value={values.schedule}
            label="Job Schedule"
            name="schedule"
          />
        </div>

        {/* work place & salary type */}
        <div
          className={`${
            urlPath === 'jobs' ? 'flex' : 'hidden'
          } flex-col tablet:flex-row desktop:flex-row justify-between mt-2`}
        >
          <Selector
            options={jobWorkPlace}
            size="lg"
            value={values.work_type}
            label="Work Place"
            name="work_type"
          />
          <Selector
            options={salaryTypeCategory}
            size="lg"
            value={values.salary_type}
            label="Salary Type"
            name="salary_type"
          />
        </div>

        {/* salary range  */}
        <div
          className={`${
            values.salary_type === salaryTypeCategory[1].label &&
            urlPath === 'jobs'
              ? 'flex'
              : 'hidden'
          } flex-col gap-2 justify-between mt-2`}
        >
          <span className="text-primary font-semibold">Salary</span>
          <Field
            label=""
            name="startSalary"
            type="number"
            placeholder="e.g. 500"
          />
        </div>

        {/* salary range  */}
        <div
          className={`${
            values.salary_type === salaryTypeCategory[0].label &&
            urlPath === 'jobs'
              ? 'flex'
              : 'hidden'
          } flex-col gap-2 justify-between mt-2`}
        >
          <span className="text-primary font-semibold">Salary Range</span>
          <div className="flex flex-col tablet:flex-row desktop:flex-row justify-between">
            <div className="wfull tablet:w-[300px] desktop:w-[450px]">
              <Field
                label="From"
                name="startSalary"
                type="number"
                placeholder="From"
              />
            </div>
            <div className="w-full tablet:w-[300px] desktop:w-[450px]">
              <Field
                label="To"
                name="endSalary"
                type="number"
                placeholder="To"
              />
            </div>
          </div>
        </div>

        {/* deadline & slots */}
        <div className="flex flex-col tablet:flex-row desktop:flex-row justify-between mt-2">
          <div className="w-full tablet:w-[300px] desktop:w-[450px]">
            <Field
              label="Deadline"
              name="deadline"
              type="date"
              placeholder="Deadline"
            />
          </div>
          <div className="w-full tablet:w-[300px] desktop:w-[450px]">
            <Field
              label="Applicants"
              name={urlPath === 'jobs' ? 'slots' : 'slot'}
              type="number"
              placeholder="Applicants"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PageOne
