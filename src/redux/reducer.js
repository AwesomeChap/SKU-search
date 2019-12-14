import { ADD_PATTERN, DELETE_PATTERN, MODIFY_PATTERN } from "./actions";

const initialState = {
  patterns: [

    // Dummy Pattern
    {
      key: "cbdjvcdscnds",
      name: "Test Pattern",
      example: "HYI-853",
      regex: "[A-Z]{3}-[0-9]{3}",
      knowRegex: "no",
      regexArray: [
        {uuid: "as1", value: ["A-Z", "a-z"], length: 3},
        {uuid: "as2", value: ["0-9"], length: 3}
      ]
    }
  ],
}

export default function (state = initialState, action) {
  const { type } = action;

  console.log(action.payload);

  switch (type) {
    case ADD_PATTERN: return { ...state, patterns: [...state.patterns, action.payload.pattern] }
    case MODIFY_PATTERN: return {
      ...state, patterns: state.patterns.map(pt => {
        console.log(action.payload.pattern.key,pt.key);
        if (action.payload.pattern.key == pt.key)
          return {...pt, ...action.payload.pattern};
        else return pt;
      })
    }
    case DELETE_PATTERN: return { ...state, patterns: state.patterns.filter(pt => pt.key !== action.payload.id) }
    default: return state;
  }
}