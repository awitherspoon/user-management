import React from 'react/addons'
import {Navbar} from '../../src/app/components/Navbar'
import {expect} from 'chai'

const {renderIntoDocument, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils

describe('Navbar', () => {
  it('Does not render nav options without auth', () => {
    const component = renderIntoDocument(
      <Navbar auth={false} />
    )
    const navbarList = scryRenderedDOMComponentsWithClass(component, 'nav-options')

    expect(navbarList.length).to.equal(0)
  })

  it('Shows nav options with auth', () => {
    const component = renderIntoDocument(
      <Navbar auth={true} />
    )
    const navbarList = scryRenderedDOMComponentsWithClass(component, 'nav-options')

    expect(navbarList.length).to.equal(1)
  })
})
