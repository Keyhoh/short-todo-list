const ERROR = {
    "ILLEGAL_TODO_ID": new Error('ILLEGAL_TODO_ID'),
    "UNKNOWN_PRIORITY": new Error('UNKNOWN_PRIORITY'),
    "NOT_UUID": new Error('NOT_UUID'),
    "NOT_FOUND_TODO": new Error('NOT_FOUND_TODO'),
    "CANNOT_DELETE_TODO": new Error('CANNOT_DELETE_TODO'),
    "EMPTY_TITLE": new Error('EMPTY_TITLE'),
    "TOO_LONG_TITLE": new Error('TOO_LONG_TITLE')
}

export default ERROR;