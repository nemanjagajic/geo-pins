export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      }
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuth: payload
      }
    case 'SIGN_OUT_USER':
      return {
        ...state,
        currentUser: null,
        isAuth: false
      }
    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      }
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload
      }
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null
      }
    case 'GET_PINS':
      return {
        ...state,
        pins: payload
      }
    case 'CREATE_PIN':
      return {
        ...state,
        pins: state.pins.concat(payload)
      }
    default:
      return state
  }
}
