import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import useLocation from '../services/useLocation'
import Button from './Button'

export default function AddPeopleForm({ encounters, setEncounters }) {
  const [userLocation, userLocationIsLoading] = useLocation()
  const history = useHistory()
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
    history.push('/')
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
  width: 40%;
  margin-right: 1%;
`
