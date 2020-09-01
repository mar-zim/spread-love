import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import AddEntryPage from './pages/AddEntryPage'
import HomePage from './pages/HomePage'
import SearchEntriesPage from './pages/SearchEntriesPage'
import { saveToLocal, loadFromLocal } from './services/LocalStorage'
import Navigation from './components/Navigation'

export default function App() {
  const [encounters, setEncounters] = useState(
    loadFromLocal('encounterList') || []
  )

  useEffect(() => {
    saveToLocal('encounterList', encounters)
  }, [encounters])

  return (
    <AppGrid>
      <StyledMain>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <HomePage encounters={encounters} />}
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
            component={() => <SearchEntriesPage encounters={encounters} />}
          />
        </Switch>
      </StyledMain>
      <Navigation />
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
  grid-template-rows: auto 56px;
  height: 100vh;
`
