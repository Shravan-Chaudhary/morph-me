import getSession from '@/lib/session'
import MorphForm from './components/morph-form'
import { redirect } from 'next/navigation'

const MorphPage = async () => {
  const session = await getSession()
  if (!session) {
    redirect('/sign-in')
  }
  return (
    <>
      <MorphForm />
    </>
  )
}

export default MorphPage
