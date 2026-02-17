'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button, Input, Card } from '@/components/ui'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [username, setUsername] = useState('user')
  const [password, setPassword] = useState('user')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const success = await login(username, password)
    if (success) navigate('/dashboard')
    else setError('Username o password non corretti')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            CRM
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            CRM Pro
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Accedi al tuo account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="user"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="user"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" loading={isLoading} className="w-full">
            Accedi
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Demo: user/user
        </p>
      </Card>
    </div>
  )
}
