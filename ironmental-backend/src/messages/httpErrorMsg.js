const createMsgForm = (status, message) => {
    return {
        error: {
            status,
            message
        }
    }
}


export const HTTP_404_MSG = createMsgForm(404, "Bad Request")
export const HTTP_500_MSG = createMsgForm(500, "Internal Server Error")