import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import GetToday from '../services/GetToday'
import useLocation from '../services/useLocation'
import Button from './Button'

export default function AddPeopleForm({ encounters, setEncounters }) {
  const [userLocation, userLocationIsLoading] = useLocation()
  const history = useHistory()
  const inputId = uuidv4()
  const today = GetToday()

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
    console.log(newEncounter)
    setEncounters([...encounters, newEncounter])
    reset()
    history.push('/')
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel>Who did you meet?</StyledLabel>
      {fields.map((item, index) => {
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
            {index > 0 && (
              <Button
                type="button"
                backgroundColor="var(--white)"
                color="var(--darkblue)"
                onClick={() => remove(index)}
                text="x"
              />
            )}
          </div>
        )
      })}
      <Button
        type="button"
        text="Add more people"
        backgroundColor="var(--white)"
        color="var(--darkblue)"
        onClick={() => {
          append({ name: '' })
        }}
      />
      {errors.friends && (
        <StyledErrorMessage>Please enter at least one name</StyledErrorMessage>
      )}
      <StyledLabel htmlFor="date">When did you meet?</StyledLabel>
      <input
        type="date"
        name="date"
        max={today}
        ref={register({
          required: true,
        })}
        placeholder="Pick a date"
      />

      {errors.date && (
        <StyledErrorMessage>Please select a date</StyledErrorMessage>
      )}
      <StyledLabel htmlFor="date">Where did you meet?</StyledLabel>
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
const StyledLabel = styled.label`
  margin-bottom: 0;
  margin-top: 15px;
`
