import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

export default function AddPeopleForm() {
  const { register, handleSubmit, errors, formState, control } = useForm({
    mode: 'onBlur',
    // mode: 'onChanges',
    // reValidateMode: 'onChange',
  })
  console.log('Errors:', errors)

  function onSubmit(data) {
    console.log('data: ', data)
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
          })}
          placeholder="Enter names seperated by commas"
        />
        {errors.names && 'Please enter something here'}
        <Controller
          control={control}
          name="date"
          defaultValue={new Date()}
          render={({ onChange, onBlur, value }) => (
            <ReactDatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              dateFormat="dd MM yyyy"
              maxDate={new Date()}
              showTimeSelect={false}
              todayButton="Today"
              dropdownMode="select"
              isClearable
              placeholderText="Click to select date"
              shouldCloseOnSelect
            />
          )}
          rules={{
            required: true,
          }}
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
