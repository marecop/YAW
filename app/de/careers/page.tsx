'use client'

import Link from 'next/link'

export default function CareersPage() {
  
  const jobCategories = [
    {
      id: 'flight',
      title: 'Flugbetrieb',
      positions: [
        { id: 1, title: 'Pilot', location: 'Mehrere Standorte', type: 'Vollzeit' },
        { id: 2, title: 'Captain', location: 'Mehrere Standorte', type: 'Vollzeit' },
        { id: 3, title: 'Flight Attendant', location: 'Mehrere Standorte', type: 'Vollzeit' },
        { id: 4, title: 'Ground Staff', location: 'Mehrere Standorte', type: 'Vollzeit' },
      ]
    },
    {
      id: 'technical',
      title: 'Technik und Wartung',
      positions: [
        { id: 5, title: 'Flugzeugmechaniker', location: 'Guangzhou', type: 'Vollzeit' },
        { id: 6, title: 'Elektroniktechniker', location: 'Guangzhou', type: 'Vollzeit' },
        { id: 7, title: 'Qualitätssicherungskraft', location: 'Guangzhou', type: 'Vollzeit' },
      ]
    },
    {
      id: 'business',
      title: 'Geschäft und Management',
      positions: [
        { id: 8, title: 'Routenplaner', location: 'Guangzhou', type: 'Vollzeit' },
        { id: 9, title: 'Marketingmanager', location: 'Mehrere Standorte', type: 'Vollzeit' },
        { id: 10, title: 'Kundenserviceleiter', location: 'Mehrere Standorte', type: 'Vollzeit' },
        { id: 11, title: 'Finanzanalyst', location: 'Mehrere Standorte', type: 'Vollzeit' },
      ]
    },
    {
      id: 'digital',
      title: 'Digitale und Technische',
      positions: [
        { id: 12, title: 'Software Engineer', location: 'Guangzhou', type: 'Vollzeit/Remote' },
        { id: 13, title: 'UI/UX Designer', location: 'Guangzhou', type: 'Vollzeit/Remote' },
        { id: 14, title: 'Data Analyst', location: 'Guangzhou', type: 'Vollzeit' },
        { id: 15, title: 'IT Support Specialist', location: 'Mehrere Standorte', type: 'Vollzeit' },
      ]
    }
  ]

  const benefits = [
    { title: 'Rabattflüge', description: 'Mitarbeiter und Angehörige erhalten Rabatt auf Flüge' },
    { title: 'Vollmedizinversicherung', description: 'Vollständige medizinische Versicherung und Gesundheitsüberwachung' },
    { title: 'Karriereentwicklung', description: 'Umfangreiche Trainings und Karriereentwicklung' },
    { title: 'Flexible Arbeitsoptionen', description: 'Teilweise Remote- und flexible Arbeitsoptionen' },
    { title: 'Rente', description: 'Konkurrenzfähige Rentenversicherung und福利' },
    { title: 'Internationale Arbeitsumgebung', description: 'Vielfältige kulturelle Arbeitsumgebung und globale Entwicklungsmöglichkeiten' },
  ]

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 面包屑 */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/de/" className="text-gray-500 hover:text-gray-700">
              Startseite
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-900 font-medium">Arbeitsmöglichkeiten</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Bei Yellow Airlines arbeiten</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Wir sind dafür verantwortlich, eine hervorragende Flugerfahrung zu bieten, und freuen uns, talentierte Menschen in unserem Team begrüßen zu dürfen.
        </p>
      </div>

      <div className="bg-ya-yellow-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Unsere Unternehmenskultur</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">Innovationsgeist</h3>
            <p className="text-gray-600">Wir ermutigen unsere Mitarbeiter, sich kreativ zu denken und nach Methoden zu suchen, um unsere Dienstleistungen zu verbessern und zu optimieren.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">Teamwork</h3>
            <p className="text-gray-600">Wir glauben, dass durch Teamwork größere Erfolge erreicht werden können und bessere Dienstleistungen angeboten werden können.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">Vielfältigkeit und Inklusion</h3>
            <p className="text-gray-600">Wir respektieren und schätzen die individuellen Hintergründe und Ansichten jedes Menschen und schaffen ein einladendes Arbeitsumfeld.</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Stellenangebote</h2>
        
        <div className="space-y-12">
          {jobCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.positions.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                      <span className="bg-ya-yellow-100 text-ya-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">Standort: {job.location}</p>
                    <div className="mt-4">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700">
                        Details ansehen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Mitarbeiterförderung</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Tritt unserem Team bei</h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">Bewerbungsprozess</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  1
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Online-Bewerbung</h3>
                <p className="mt-1 text-gray-600">Durchsuchen Sie unsere Stellenanzeigen, finden Sie die passende Stelle und senden Sie Ihre Bewerbung</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  2
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Vorauswahl</h3>
                <p className="mt-1 text-gray-600">Unser Bewerberteam prüft Ihre Bewerbung und kontaktiert geeignete Kandidaten</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  3
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Interview-Phase</h3>
                <p className="mt-1 text-gray-600">Je nach Stelle kann es Telefon- oder Videotests sowie Präsenzinterviews geben</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  4
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Einstellung und Einstellung</h3>
                <p className="mt-1 text-gray-600">Nach erfolgreichem Interview erhalten Sie eine Einstellungsbescheinigung und wir unterstützen Sie bei der Einstellung</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700">
            Jetzt bewerben
          </button>
        </div>
      </div>
    </main>
  )
}

