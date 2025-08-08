'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RoleProtectionProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export default function RoleProtection({ children, allowedRoles }: RoleProtectionProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !user.role || !allowedRoles.includes(user.role))) {
      router.push('/')
    }
  }, [user, loading, allowedRoles, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
