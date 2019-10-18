export default function ({ store, error }) {
    if (!store.state.user.logged) {
      error({
        message: 'Доступ запрещен',
        statusCode: 403
      })
    }
  }
  