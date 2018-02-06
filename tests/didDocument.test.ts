import { expect } from 'chai'
import DidDocument from '../ts/identity/didDocument'
import { DidDocumentAttrs } from '../ts/identity/types'
import testData from './data/identity'
import * as lolex from 'lolex'

describe('Did Document', () => {
  const clock = lolex.install({now: new Date('2018-01-24T15:42:15.882Z')})
  const publicKey = testData.testUserPublicKey
  const ddo = new DidDocument(publicKey)

  it('Should include context field which specifies the version of DID specification', () => {
    expect(JSON.stringify(ddo)).to.contain('https://w3id.org/did/v1')
  })

  it('Parse to JSON should result in DID/DDO compliant format', () => {
    console.log('======DDO TEST================================')
    console.log(JSON.stringify(ddo))
    console.log(testData.expectedDdoJson)
    expect(JSON.stringify(ddo)).to.equal(testData.expectedDdoJson)
  })

  it('Should be parsed back to DdoDocument correctly', () => {
		const parsed = JSON.parse(JSON.stringify(ddo), DidDocument.reviver)
    expect(parsed).to.deep.equal(ddo)
  })
})
