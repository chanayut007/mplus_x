module.exports = {
    HTTP_SUCCESS_CODE: 200,
    HTTP_SUCCESS_MSG: "SUCCESS",

    HTTP_INTERNAL_SERVER_CODE: 500,
    HTTP_INTERNAL_SERVER_MSG: "INTERNAL SERVER ERROR",

    HTTP_CLIENT_ERROR_CODE: 400,
    HTTP_CLIENT_ERROR_CODE_INVALID_DATA_FORMAT:"Bad Request",
    HTTP_CLIENT_ERROR_MSG_INVALID_DATA_FORMAT: "Invalid data format",
    HTTP_CLIENT_ERROR_LOGIN_REQUIRED_MSG: "Please enter your email and password",
    HTTP_CLIENT_ERROR_EMAIL_REQUIRED_MSG: "type of 'email' isn't correct",
    HTTP_CLIENT_ERROR_PASSWORD_REQUIRED_MSG: "type of 'password' isn't correct",
    HTTP_CLIENT_ERROR_LOGIN_INVALID_MSG: "อีเมลล์ และ รหัสผ่านไม่ถูกต้อง\nกรุณาลองใหม่อีกครั้ง",
    HTTP_CLIENT_ERROR_USER_REQUIRED_MSG: "type of 'user_id' isn't correct",
    HTTP_CLIENT_ERROR_USER_DATA_MSG: "Can't find this user in database",

    HTTP_VERSION_ERROR_CODE: 401,
    HTTP_VERSION_ERROR_MSG: "ระบุเวอร์ชั่น Api ไม่ถูกต้อง",

    HTTP_UNAUTHORIZE_ERROR_CODE: 401,
    HTTP_UNAUTHORIZE_ERROR_MSG: "UnAuthorization",

    HTTP_FORBIDDEN_ERROR_CODE: 403,
    HTTP_FORBIDDEN_ERROR_MSG: "ไม่มีสิทธิ์ในการเข้าถึง Api นี้"
}