import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Button from './Button'

export default function AddPeopleForm({ encounters, setEncounters }) {
  const [userLocation, setUserLocation] = useState('')
  const [userLocationIsLoading, setUserLocationIsLoading] = useState(true)

  useEffect(() => {
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
        .finally(setUserLocationIsLoading(false))
    })

    setTimeout(function () {
      setUserLocationIsLoading(false)
    }, 10000)
  }, [])

  const inputId = uuidv4()
  const { register, handleSubmit, errors, formState, control, reset } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        friends: [{ firstName: '', lastName: '' }],
      },
    }
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'friends',
  })

  function onSubmit(newEncounter) {
    setEncounters([...encounters, newEncounter])
    reset()
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <StyledNameInput
              name={`friends[${index}].firstName`}
              defaultValue={`${item.firstName}`}
              ref={register()}
              placeholder="First Name"
            />
            <StyledNameInput
              name={`friends[${index}].lastName`}
              defaultValue={`${item.lastName}`}
              ref={register({
                required: true,
              })}
              placeholder="Last Name"
            />
            <Button type="button" onClick={() => remove(index)} text="x" />
          </div>
        )
      })}
      <Button
        type="button"
        text="Add more people"
        onClick={() => {
          append({ firstName: '', lastName: '' })
        }}
      />
      {errors.friends && (
        <StyledErrorMessage>
          Please enter first and last name
        </StyledErrorMessage>
      )}
      <input
        type="date"
        name="date"
        ref={register({
          required: true,
        })}
        placeholder="Pick a date"
      />

      {errors.date && (
        <StyledErrorMessage>Please select a date</StyledErrorMessage>
      )}
      {userLocationIsLoading ? (
        <div>Trying to get your current location data...</div>
      ) : (
        <textarea
          name="location"
          defaultValue={userLocation}
          ref={register({
            required: true,
          })}
          placeholder="Please type your location"
        />
      )}
      {errors.location && (
        <StyledErrorMessage>Please enter a location</StyledErrorMessage>
      )}
      <input
        name="entryId"
        type="hidden"
        defaultValue={inputId}
        ref={register()}
      />
      <Button
        type="submit"
        disabled={formState.isSubmitting}
        text="Add to List"
      />
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  textarea {
    height: 60px;
  }
`

const StyledErrorMessage = styled.div`
  color: var(--orange);
  font-size: 12px;
`

const StyledNameInput = styled.input`
  width: 40%;
  margin-right: 1%;
`
