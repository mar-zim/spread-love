export function sortAllEncounters(encounters) {
  const allEncountersSorted = encounters
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return allEncountersSorted
}

export function sortEncountersLast14Days(encounters) {
  const currentDate = new Date()
  const currentDateTime = currentDate.getTime()
  const last14DaysDate = new Date(
    currentDate.setDate(currentDate.getDate() - 14)
  )
  const last14DaysDateTime = last14DaysDate.getTime()

  const last14DaysEncountersSorted = encounters
    .filter((encounter) => {
      const elementDateTime = new Date(encounter.date).getTime()
      if (
        elementDateTime <= currentDateTime &&
        elementDateTime > last14DaysDateTime
      ) {
        return true
      }
      return false
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  return last14DaysEncountersSorted
}
