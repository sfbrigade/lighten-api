// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(sinonChai)
chai.use(chaiAsPromised)

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

// ---------------------------------------
// Require Tests
// ---------------------------------------
// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.(js|jsx)$/)
testsContext.keys().forEach(testsContext)

// require all `src/**/*.(js|jsx)` except for `main.jsx` (for isparta coverage reporting)
const componentsContext = require.context('../src/', true, /^((?!main).)*\.(js|jsx)$/)

componentsContext.keys().forEach(componentsContext)
