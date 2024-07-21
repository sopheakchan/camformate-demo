import React from 'react'
import { FormInput, FormLabel } from '../../atoms'

const SalaryInput = ({
  salaryType,
  startSalary,
  setStartSalary,
  endSalary,
  setEndSalary,
}) => {
  return (
    <>
      {/* salary with range  */}
      <div
        className={`${
          salaryType === '$XXX - $XXX' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <div className="w-full desktop:w-1/2">
          <FormLabel title="Salary Range" subTitle="e.g. 500 1000" />
        </div>
        <div className="w-full desktop:w-1/2 flex gap-2 desktop:justify-between">
          <FormInput
            placeholder="0"
            size="sm"
            type="number"
            value={startSalary}
            onChange={e => setStartSalary(e.target.value)}
          />
          <FormInput
            placeholder="0"
            size="sm"
            type="number"
            value={endSalary}
            onChange={e => setEndSalary(e.target.value)}
          />
        </div>
      </div>

      {/* specific salary  */}
      <div
        className={`${
          salaryType === '$XXX' ? 'flex' : 'hidden'
        } flex-col gap-4 desktop:gap-0 desktop:flex-row justify-between transition-all duration-200`}
      >
        <div className="w-full desktop:w-1/2">
          <FormLabel title="Salary" subTitle="e.g. 1000" />
        </div>
        <div className="w-full desktop:w-1/2 flex gap-2">
          <FormInput
            placeholder="0"
            size="md"
            type="number"
            value={startSalary}
            onChange={e => setStartSalary(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}

export default SalaryInput
