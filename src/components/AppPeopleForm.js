import React from 'react'
import { useForm } from 'react-hook-form'

export default function AddPeopleForm() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
  })
  console.log(errors)

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <div>
      <h4>Add people you met</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="names"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[A-Za-z]+$/i,
          })}
          placeholder="Enter names seperated by commas"
        />
        {errors.names && 'Please enter something here'}
        <input
          name="date"
          ref={register({
            required: true,
          })}
          placeholder="Date"
        />
        {errors.date && 'Please enter something here'}
        <input
          name="location"
          ref={register({
            required: true,
          })}
          placeholder="Location"
        />
        {errors.location && 'Please enter something here'}
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  )
}
