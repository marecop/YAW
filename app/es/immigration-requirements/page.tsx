'use client'

import { useState, useEffect } from 'react'
import { Globe, Info, FileText, Syringe, Briefcase, ArrowRight, Plane } from 'lucide-react'

interface Country {
  code: string;
  nameDe: string;
  nameEn: string;
  nameZhCn: string;
  nameZhHk: string;
}

interface ImmigrationRule {
  type: 'HOME_COUNTRY' | 'RULE_FOUND' | 'NO_DATA';
  visaStatus: string;
  stayDuration?: string;
  notesEn?: string;
  notesDe?: string;
  notesZhCn?: string;
  notesZhHk?: string;
}

export default function ImmigrationRequirementsPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [passportCode, setPassportCode] = useState<string>('')
  const [destCode, setDestCode] = useState<string>('')
  const [rule, setRule] = useState<ImmigrationRule | null>(null)
  const [loading, setLoading] = useState(false)

  const currentLabels = {
    title: 'Requisitos de Inmigración',
    subtitle: 'Consulte los requisitos de visa según su nacionalidad y destino.',
    passportLabel: 'Pasaporte / Nacionalidad',
    destLabel: 'Destino',
    selectPrompt: 'Seleccione...',
    checkBtn: 'Consultar Requisitos',
    visaStatus: 'Estado de Visa',
    stayDuration: 'Duración de Estancia',
    notes: 'Notas Importantes',
    loading: 'Consultando...',
    sameCountry: 'No se requiere acción',
    sameCountryDesc: 'Usted viaja a su país de origen o región de residencia.'
  }

  // Helper to get localized name (using English as fallback/standard for now, or could map to Spanish names if available in DB)
  // Ideally, we should have nameEs in the Country interface. For now, let's use nameEn as a fallback or nameZhHk if that was the logic, 
  // but since we are translating to Spanish, English names are probably better than Chinese for Spanish speakers if Spanish names are missing.
  const getCountryName = (c: Country) => {
    return c.nameEn // Using English name as fallback since Spanish name might not be in DB yet
  }

  // Helper to get localized notes
  const getRuleNotes = (r: ImmigrationRule) => {
    return r.notesEn // Using English notes as fallback
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/immigration/countries')
        if (res.ok) {
          const data = await res.json()
          setCountries(data)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchCountries()
  }, [])

  const handleCheck = async () => {
    if (!passportCode || !destCode) return
    setLoading(true)
    setRule(null)
    
    try {
      const res = await fetch(`/api/immigration/check?passport=${passportCode}&destination=${destCode}`)
      if (res.ok) {
        const data = await res.json()
        setRule(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{currentLabels.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {currentLabels.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Search Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              
              {/* Passport Select */}
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLabels.passportLabel}
                </label>
                <div className="relative">
                  <select
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm rounded-md bg-gray-50"
                    value={passportCode}
                    onChange={(e) => setPassportCode(e.target.value)}
                  >
                    <option value="">{currentLabels.selectPrompt}</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {getCountryName(c)} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="hidden md:flex md:col-span-2 justify-center pb-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              </div>

              {/* Destination Select */}
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLabels.destLabel}
                </label>
                <div className="relative">
                  <select
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm rounded-md bg-gray-50"
                    value={destCode}
                    onChange={(e) => setDestCode(e.target.value)}
                  >
                    <option value="">{currentLabels.selectPrompt}</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {getCountryName(c)} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCheck}
                disabled={!passportCode || !destCode || loading}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-ya-yellow-500 hover:bg-ya-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? currentLabels.loading : currentLabels.checkBtn}
                {!loading && <Plane className="ml-2 -mr-1 h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {rule && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
              <div className={`px-6 py-4 border-b flex items-center ${
                rule.type === 'HOME_COUNTRY' ? 'bg-green-50 border-green-100' : 
                rule.visaStatus === 'VISA_FREE' ? 'bg-green-50 border-green-100' :
                'bg-gray-50 border-gray-100'
              }`}>
                {rule.type === 'HOME_COUNTRY' ? (
                   <Globe className="h-6 w-6 text-green-600 mr-3" />
                ) : (
                   <FileText className="h-6 w-6 text-ya-yellow-600 mr-3" />
                )}
                <h2 className="text-xl font-bold text-gray-900">
                  {rule.type === 'HOME_COUNTRY' ? currentLabels.sameCountry : currentLabels.visaStatus + ': ' + rule.visaStatus}
                </h2>
              </div>
              
              <div className="p-8">
                {rule.type === 'HOME_COUNTRY' ? (
                  <div className="flex items-start">
                    <p className="text-lg text-gray-600">
                      {currentLabels.sameCountryDesc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-sm font-medium text-gray-500 mb-1">{currentLabels.visaStatus}</span>
                        <span className="text-lg font-semibold text-gray-900">{rule.visaStatus}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-sm font-medium text-gray-500 mb-1">{currentLabels.stayDuration}</span>
                        <span className="text-lg font-semibold text-gray-900">{rule.stayDuration || '-'}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{currentLabels.notes}</h3>
                      <p className="text-gray-600 leading-relaxed bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-yellow-800">
                        {getRuleNotes(rule)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
