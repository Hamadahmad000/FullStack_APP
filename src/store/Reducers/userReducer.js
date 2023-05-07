const {route} = require('../../config/Axios');
const {SIGN_UP} = require('../Types');

const handleSignUp = async data => {
  try {
    // route.post('/',{
    console.log(data);
    // })
  } catch (error) {
    console.log(error.message);
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case SIGN_UP:
      handleSignUp(action.payload);
      break;

    default:
      break;
  }
};

export default userReducer;
