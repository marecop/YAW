'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwörter stimmen nicht überein')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in localStorage if needed, but since we require verification,
        // maybe we shouldn't auto-login or we should but with limited access.
        // For now, let's just show success message.
        if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        }
        
        setIsSuccess(true)
      } else {
        setError(data.error || 'Registrierung fehlgeschlagen, bitte versuchen Sie es erneut')
      }
    } catch (err) {
      setError('Netzwerkfehler, bitte versuchen Sie es später erneut')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Registrierung erfolgreich!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Vielen Dank für die Registrierung bei Yellow Airlines.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Wir haben Ihnen eine E-Mail mit einem Link zum Bestätigen Ihrer Registrierung an <span className="font-medium text-gray-900">{formData.email}</span> gesendet.
              <br />
              Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, um die Registrierung zu bestätigen.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/de/auth/login"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ya-yellow-500 hover:bg-ya-yellow-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Anmeldung
            </Link>
            <Link
              href="/de/"
              className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Registrieren
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Bereits ein Konto?{' '}
              <Link href="/de/auth/login" className="font-medium text-ya-yellow-600 hover:text-ya-yellow-500">
                Jetzt anmelden
              </Link>
            </p>
          </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Vorname
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Nachname
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-Mail
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Passwort
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Passwort bestätigen
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ya-yellow-600 hover:bg-ya-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verarbeitung...' : 'Registrieren'}
                  </button>
                </div>
              </form>

              {/* Terms */}
              <p className="mt-6 text-xs text-center text-gray-500">
                Durch die Registrierung erklären Sie sich mit den{' '}
                <Link href="/de/terms" className="text-ya-yellow-600 hover:text-ya-yellow-500">
                  Nutzungsbedingungen
                </Link>{' '}
                及{' '}
                <Link href="/de/privacy" className="text-ya-yellow-600 hover:text-ya-yellow-500">
                  Datenschutzrichtlinien
                </Link>
              </p>
        </div>
      </div>
    </div>
  )
}
