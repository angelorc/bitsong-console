export default function ({
  store,
  redirect
}) {
  if (!store.getters[`wallet/isLoggedIn`]) {
    return redirect('/wallet/import')
  }
}
