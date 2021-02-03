import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Navigation from './components/Navigation'
import AddEntryPage from './pages/AddEntryPage'
import HomePage from './pages/HomePage'
import SearchEntriesPage from './pages/SearchEntriesPage'
import { loadFromLocal, saveToLocal } from './services/LocalStorage'

export default function App() {
  const [encounters, setEncounters] = useState(
    loadFromLocal('encounterList') || []
  )
  useEffect(() => {
    saveToLocal('encounterList', encounters)
  }, [encounters])

  return (
    <AppGrid>
      <Navigation />
      <StyledMain>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <HomePage encounters={encounters} setEncounters={setEncounters} />
            )}
          />
          <Route
            path="/addentry"
            component={() => (
              <AddEntryPage
                encounters={encounters}
                setEncounters={setEncounters}
              />
            )}
          />
          <Route
            path="/search"
            component={() => (
              <SearchEntriesPage
                encounters={encounters}
                setEncounters={setEncounters}
              />
            )}
          />
        </Switch>
      </StyledMain>
    </AppGrid>
  )
}

const StyledMain = styled.main`
  padding: 0 5%;
  overflow-y: scroll;
  &::after {
    content: '';
    display: block;
    height: 20px;
  }
`
const AppGrid = styled.div`
  display: grid;
  grid-template-rows: 56px auto;
  height: 100vh;
`
