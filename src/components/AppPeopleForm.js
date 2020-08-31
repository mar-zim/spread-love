import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

export default function AddPeopleForm() {
  const [userLocation, setUserLocation] = useState('')
  const { register, handleSubmit, errors, formState, control, reset } = useForm(
    {
      mode: 'onBlur',
    }
  )
  console.log('Errors:', errors)

  async function onSubmit(inputValues) {
    console.log('Input: ', inputValues)
    reset()
  }

  if ('geolocation' in navigator) {
    console.log('Geo Available')
  } else {
    console.log('Geo Not Available')
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('getting location initiated')
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)
      console.log(position)
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      axios
        .get(
          `https://eu1.locationiq.com/v1/reverse.php?key=pk.bdf564897f7c87e4a19e06e928604689&lat=${lat}&lon=${lon}&format=json`
        )
        .then((response) => response.data)
        .then((data) => setUserLocation(data.display_name))
        .catch((error) => console.log(error.message))
    })
  }

  return (
    <div>
      <h4>Add people you met</h4>
      <button onClick={getLocation}>Get Location</button>
      {userLocation && <div>Location: {userLocation}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="names"
          defaultValue=""
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
          defaultValue=""
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
