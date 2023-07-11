export const errors = {
  USER_ALREADY_CREATED: {
    status: 409,
    message: 'E-mail já cadastrado',
  },
  USER_NOT_FOUND: {
    status: 404,
    message: 'Usuário não encontrado',
  },
  PASSWORD_INCORRECT: {
    status: 401,
    message: 'Senha incorreta',
  },
  TOKEN_INVALID: {
    status: 401,
    message: 'Token inválido',
  },
}
