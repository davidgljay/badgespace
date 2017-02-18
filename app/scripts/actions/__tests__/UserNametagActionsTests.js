jest.unmock('../UserNametagActions')
jest.unmock('../../tests/mockGlobals')

jest.unmock('redux-mock-store')
jest.unmock('redux-thunk')

import * as actions from '../UserNametagActions'
import constants from '../../constants'
import {mockHz} from '../../tests/mockGlobals'
import {hz} from '../../api/horizon'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('UserNametagActions', () => {
  let store
  let calls
  beforeEach(() => {
    store = mockStore({})
    calls = []
    hz.mockClear()
  })

  describe('updateUserNametag', () => {
    it('should update the user nametag', () => {
      expect(actions.updateUserNametag('abc', 'name', 'Allosaur'))
        .toEqual({
          type: constants.UPDATE_USER_NAMETAG,
          room: 'abc',
          property: 'name',
          value: 'Allosaur'
        })
    })
  })

  describe('watchUserNametags', () => {
    it('should get an entry for a room in the user_nametags table', () => {
      hz.mockReturnValue(mockHz([{user: 'me', nametag: '456', room: 'abc'}], calls)())
      return actions.watchUserNametags('me')(store.dispatch).then((userNametags) => {
        expect(userNametags).toEqual([{'nametag': '456', 'room': 'abc', 'user': 'me'}])
        expect(calls[1]).toEqual({
          type: 'findAll',
          req: {
            user: 'me'
          }
        })
        expect(store.getActions()[0]).toEqual({
          nametags: [{nametag: '456', room: 'abc', user: 'me'}],
          type: 'ADD_USER_NAMETAG_ARRAY'
        })
      })
    })

    it('should set the nametag value for the rooms to be an empty array if no user nametag is found', () => {
      hz.mockReturnValue(mockHz([], calls)())
      return actions.watchUserNametags('def', 'me')(store.dispatch).then((userNametag) => {
        expect(userNametag).toEqual([])
      })
    })
  })

  describe('putUserNametag', () => {
    it('should add an entry to the user_nametags table', () => {
      hz.mockReturnValue(mockHz({id: '123'}, calls)())
      return actions.putUserNametag('abc', 'me', '456')().then((id) => {
        expect(id).toEqual({id: '123'})
        expect(calls[1]).toEqual({
          type: 'upsert',
          req: {
            user: 'me',
            mentions: [],
            nametag: '456',
            room: 'abc'
          }
        })
      })
    })
  })
})
