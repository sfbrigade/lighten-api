import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import CoreLayout from '../layouts/CoreLayout'
import Home from '../views/Home'
import Organization from '../views/Organization'
import NotFound from '../views/NotFound'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home} />
    <Route path=':organizationId' component={Organization} />
    <Route path='/404' component={NotFound} />
    <Redirect from='*' to='/404' />
  </Route>
)
