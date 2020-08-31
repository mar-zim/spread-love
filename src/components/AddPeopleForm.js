import axios from 'axios'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

export default function AddPeopleForm({ encounters, setEncounters }) {
  const [userLocation, setUserLocation] = useState('')
  const { register, handleSubmit, errors, formState, control, reset } = useForm(
    {
      mode: 'onBlur',
    }
  )

  function onSubmit(newEncounter) {
    console.log('Input: ', newEncounter)
    setEncounters([...encounters, newEncounter])
    reset()
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
        {errors.names && <div>Please enter something above</div>}
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
        {errors.date && <div>Please enter something above</div>}
        <textarea
          name="location"
          defaultValue={userLocation}
          ref={register({
            required: true,
          })}
          placeholder="Press button below to get current location"
        />
        {errors.location && <div>Please enter something above</div>}
        <button type="button" onClick={getLocation}>
          Get Location
        </button>
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </StyledForm>
    </div>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
