export const ADD_PATTERN = "Add a pattern"
export const MODIFY_PATTERN = "Modify pattern"
export const DELETE_PATTERN = "Delete pattern";

export const addPattern = (pattern) => ({
  type: ADD_PATTERN,
  payload: { pattern }
})

export const modifyPattern = (pattern) => ({
  type: MODIFY_PATTERN,
  payload: { pattern }
})

export const deletePattern = (id) => ({
  type: DELETE_PATTERN,
  payload: { id }
})


