import axios from 'axios'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

export default function AddPeopleForm({ encounters, setEncounters }) {
  const [userLocation, setUserLocation] = useState('')
  const [indexes, setIndexes] = useState([])
  const [counter, setCounter] = useState(0)
  console.log('counter', counter)
  console.log('indexes', indexes)
  const inputId = uuidv4()
  const { register, handleSubmit, errors, formState, control, reset } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        friends: [{ firstName: '', lastName: '' }],
      },
    }
  )

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'friends',
    }
  )

  function onSubmit(newEncounter) {
    console.log('Input: ', newEncounter)
    setEncounters([...encounters, newEncounter])
    reset()
  }

  function addFriend() {
    setCounter(counter + 1)
    setIndexes([...indexes, counter])
  }

  function countUp() {
    setCounter(counter + 1)
  }

  function removeFriend(index) {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ])
    setCounter((prevCounter) => prevCounter - 1)
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
      <h3>Add people you met</h3>
      <div>Counter: {counter}</div>
      <button onClick={countUp}>Count Up</button>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <input
                name={`friends[${index}].firstName`}
                defaultValue={`${item.firstName}`}
                ref={register()}
                placeholder="First Name"
              />
              <input
                name={`friends[${index}].lastName`}
                defaultValue={`${item.lastName}`}
                ref={register()}
                placeholder="Last Name"
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          )
        })}

        <button
          type="button"
          onClick={() => {
            append({ firstName: '', lastName: '' })
          }}
        >
          append
        </button>
        {/* {indexes.map((index) => {
          const fieldName = `friends[${index}]`
          return (
            <div key={fieldName}>
              <input
                name={fieldName}
                defaultValue=""
                ref={register({
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                })}
                placeholder="Enter name of your friend"
              />
              <button type="button" onClick={removeFriend(index)}>
                Remove
              </button>
            </div>
          )
        })} */}
        {errors.names && <div>Please enter something above</div>}
        {/* <button type="button" onClick={addFriend}>
          Add Friend
        </button> */}
        <Controller
          control={control}
          name="date"
          defaultValue={new Date()}
          render={({ onChange, onBlur, value }) => (
            <ReactDatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              dateFormat="MM/dd/yyyy"
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
        <input
          name="entryId"
          type="hidden"
          defaultValue={inputId}
          ref={register()}
        />
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
