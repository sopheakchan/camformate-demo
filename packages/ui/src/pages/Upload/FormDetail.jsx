import React, { useState } from 'react'
import { FormInput, FormLabel, Selector } from '../../atoms'
import useUpload from '../../../../../apps/client/helper/hooks/upload'
import SalaryInput from './SalaryInput'
import {
  jobTypeCategory,
  salaryTypeCategory,
  scholarshipRewardTypes,
  jobScheduleCategory,
  jobWorkPlace,
} from './data'
import { Map } from '../../organisms'
import 'mapbox-gl/dist/mapbox-gl.css'

const FormDetail = () => {
  const {
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
    jobType,
    setJobType,
    jobSchedule,
    setJobSchedule,
    startSalary,
    setStartSalary,
    setEndSalary,
    endSalary,
    rewardType,
    setRewardType,
    rewardAmount,
    setRewardAmount,
    schoolName,
    setSchoolName,
  } = useUpload()

  const [salaryType, setSalaryType] = useState('Negotiable')

  return (
    <div className="flex flex-col gap-8 overflow-auto">
      {/* name  */}
      <div className="flex flex-col desktop:gap-0 desktop:flex-row justify-between">
        <FormLabel
          title="Announcement name"
          subTitle="This will display as your announcement's name"
        />
        <div className="hidden tablet:flex desktop:flex w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. Announcement Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex tablet:hidden desktop:hidden w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. Announcement Name"
            onChange={e => setName(e.target.value)}
            value={name}
            className="w-[90%]"
          />
        </div>
      </div>

      {/* address  */}
      <div className="flex flex-col desktop:gap-0 desktop:flex-row justify-between">
        <FormLabel title="Address" subTitle="Please select a location" />

        <div className="hidden tablet:flex desktop:flex w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. Phnom Penh"
            onChange={e => setAddress(e.target.value)}
            value={address}
          />
          {/* <div
            className="bg-primary bg-opacity-30 rounded-lg h-[50px] px-4 flex justify-center items-center cursor-pointer"
            onClick={() => setMapShow(true)}
          >
            <BiCurrentLocation className="text-lg text-primary" />
          </div> */}
        </div>
        <div className="flex tablet:hidden desktop:hidden w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. Phnom Penh"
            onChange={e => setAddress(e.target.value)}
            value={address}
            className="w-[90%]"
          />
        </div>
      </div>

      {/* map  */}
      <Map />

      {/* type  */}
      <div className="flex flex-col gap-4 desktop:gap-0 desktop:flex-col justify-between">
        <FormLabel title="Announcement Type" subTitle="" />
        <form className="tablet:flex desktop:flex flex-col justify-center gap-2">
          <div className="flex gap-2">
            <input
              type="radio"
              name="announcement_type"
              id="scholarship"
              value="scholarship"
              className="cursor-pointer"
              checked={type === 'scholarship' ? true : false}
              onChange={e => setType(e.target.value)}
            />
            <label htmlFor="scholarship" className="cursor-pointer">
              Scholarship
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="announcement_type"
              id="job"
              value="job"
              checked={type === 'job' ? true : false}
              className="cursor-pointer"
              onChange={e => setType(e.target.value)}
            />
            <label htmlFor="job" className="cursor-pointer">
              Job
            </label>
          </div>
        </form>
      </div>

      {/* job postion category */}
      <div
        className={`${
          type === 'job' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <FormLabel
          title="Job Field"
          subTitle="This will display as the job field"
        />
        <div className="flex w-full desktop:w-1/2">
          <Selector
            options={jobTypeCategory}
            size="md"
            setValue={setJobCategory}
            value={jobCategory}
          />
        </div>
      </div>

      {/* position */}
      <div
        className={`${
          type === 'job' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <FormLabel
          title="Job Position"
          subTitle="This will display as the job position"
        />
        <div className="hidden tablet:flex desktop:flex w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. Developer"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />
        </div>
        <div className="flex tablet:hidden desktop:hidden w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. Developer"
            onChange={e => setJobTitle(e.target.value)}
            value={jobTitle}
            className="w-[90%]"
          />
        </div>
      </div>

      {/* school name  */}
      <div
        className={`${
          type === 'scholarship' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between`}
      >
        <FormLabel
          title="School Name"
          subTitle="This will display as School name"
        />

        <div className="flex w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. SabaiCode"
            value={schoolName}
            size="md"
            onChange={e => setSchoolName(e.target.value)}
          />
        </div>
      </div>

      {/* scholarship reward */}
      <div
        className={`${
          type === 'scholarship' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <FormLabel title="Reward" subTitle="Can be '$' or '%'" />
        <div className="flex w-full desktop:w-1/2">
          <Selector
            options={scholarshipRewardTypes}
            size="md"
            setValue={setRewardType}
            value={rewardType}
          />
        </div>
      </div>

      {/* reward amount  */}
      <div
        className={`${
          type === 'scholarship' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between`}
      >
        <FormLabel title="Amount" subTitle="0%-100% or 0$ up" />

        <div className="flex w-full desktop:w-1/2">
          <FormInput
            placeholder="e.g. 100"
            value={rewardAmount}
            size="md"
            onChange={e => setRewardAmount(e.target.value)}
          />
        </div>
      </div>

      {/* job salary */}
      <div
        className={`${
          type === 'job' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <FormLabel
          title="Job Salary"
          subTitle="This will display as the job salary"
        />
        <div className="flex w-full desktop:w-1/2">
          <Selector
            options={salaryTypeCategory}
            size="md"
            setValue={setSalaryType}
            value={salaryType}
          />
        </div>
      </div>

      {/* input salary amount  */}
      <SalaryInput
        salaryType={salaryType}
        startSalary={startSalary}
        setStartSalary={setStartSalary}
        endSalary={endSalary}
        setEndSalary={setEndSalary}
      />

      {/* job schedule */}
      <div
        className={`${
          type === 'job' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <FormLabel
          title="Job Schedule"
          subTitle="Full-Time or Part-Time or Flexible"
        />
        <div className="flex w-full desktop:w-1/2">
          <Selector
            options={jobScheduleCategory}
            size="md"
            setValue={setJobSchedule}
            value={jobSchedule}
          />
        </div>
      </div>

      {/* job type */}
      <div
        className={`${
          type === 'job' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <FormLabel title="Work Place" subTitle="Office or Home or Flexible" />
        <div className="flex w-full desktop:w-1/2">
          <Selector
            options={jobWorkPlace}
            size="md"
            setValue={setJobType}
            value={jobType}
          />
        </div>
      </div>

      {/* deadline  */}
      <div className="flex flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between">
        <div className="w-full desktop:w-1/2">
          <FormLabel title="Deadline" subTitle="Deadline of announcement" />
        </div>
        <div className="w-full desktop:w-1/2">
          <FormInput
            placeholder="Today"
            size="md"
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
        </div>
      </div>

      {/* slot */}
      <div className="flex flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between">
        <div className="w-full desktop:w-1/2">
          <FormLabel title="Slots" subTitle="How many slots for applicants ?" />
        </div>
        <div className="w-full desktop:w-1/2">
          <FormInput
            placeholder="0"
            size="md"
            type="number"
            value={slot}
            onChange={e => setSlot(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default FormDetail
