import { useState, useEffect } from 'react'
import { useSearchParams, Navigate, useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  const [verified, setVerified] = useState(false)
  let [searchParams] = useSearchParams()
  const { id, hash } = useParams()
  const { expires, signature } = Object.fromEntries([...searchParams])

  useEffect(() => {
    if (id && hash && expires && signature) {
      verifyUserAPI(id, hash, {
        expires,
        signature
      }).then(() => {
        setVerified(true)
      })
    }
  }, [expires, hash, id, signature])

  if (!id || !hash || !expires || !signature) {
    return <Navigate to='/404' />
  }

  if (!verified) {
    return <PageLoadingSpinner caption='Verifying your account...' />
  }

  return (
    <div>
      <h1>Account Verification</h1>
    </div>
  )
}

export default AccountVerification
