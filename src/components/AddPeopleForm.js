import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import useLocation from '../services/useLocation'
import Button from './Button'

export default function AddPeopleForm({ encounters, setEncounters }) {
  const [userLocation, userLocationIsLoading] = useLocation() //custom hook to fetch human readable location data from geolocation
  const history = useHistory()
  const inputId = uuidv4()

  //custom hooks of react-hook-form library to use form
  const { register, handleSubmit, errors, formState, control, reset } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        friends: [{ name: '' }],
      },
    }
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'friends',
  })

  function onSubmit(newEncounter) {
    setEncounters([...encounters, newEncounter])
    reset() //reset form values on only successful submit
    history.push('/') // go back to home page
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => {
        //creating dynamic input fields, so that user can add more than one friends name
        return (
          <div key={item.id}>
            <StyledNameInput
              name={`friends[${index}].name`}
              defaultValue={`${item.name}`}
              ref={register({
                required: true,
              })}
              placeholder="Please enter a name"
            />
            <Button type="button" onClick={() => remove(index)} text="x" />
          </div>
        )
      })}
      <Button //button to add more input fields for names
        type="button"
        text="Add more people"
        onClick={() => {
          append({ name: '' })
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
        text="Add entry to list"
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
  margin-right: 1%;
`
