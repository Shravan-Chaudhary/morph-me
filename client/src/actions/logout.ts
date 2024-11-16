'use server'

import { cookies } from 'next/headers'

const logout = async () => {
  cookies().delete('accessToken')
}

export default logout
