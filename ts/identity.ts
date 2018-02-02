import IdentityConfig from './identityConfig'
import * as keyDerivation from './identity/keyDerivation'
import * as bitcoinjs from 'bitcoinjs-lib'
import DidDocument from './identity/didDocument'

export default class Identity {
  public config: IdentityConfig

  public static initialize(config: IdentityConfig): Identity {
    const identity = new Identity()
    identity.config = config
    return identity
  }

  public static create(randomStringFromEntropy: string): any {
    const mnemonic = keyDerivation.generateMnemonic(randomStringFromEntropy)
    const masterKeyPair = keyDerivation.deriveMasterKeyPairFromMnemonic(mnemonic)
    const genericSigningKey = keyDerivation.deriveGenericSigningKeyPair(masterKeyPair)
    const ethereumKey = keyDerivation.deriveEthereumKeyPair(masterKeyPair)

    const genericSigningKeyHex = genericSigningKey.getPublicKeyBuffer().toString('hex')
    const ddo = new DidDocument(genericSigningKeyHex)

    return {
      mnemonic: mnemonic,
      masterKeyWIF: masterKeyPair.keyPair.toWIF(),
      genericSigningKeyWIF: genericSigningKey.keyPair.toWIF(),
      ethereumKeyWIF: ethereumKey.keyPair.toWIF()
    }
  }

  register() {}
}
