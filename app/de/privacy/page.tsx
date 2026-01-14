'use client'

import React from 'react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/de/" className="text-gray-500 hover:text-gray-700">
                Hauptseite
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Datenschutzrichtlinie</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yellow Airlines（Yellow Airlines）Datenschutzrichtlinie</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Diese Richtlinie erklärt, wie wir Ihre persönlichen Daten sammeln, verwenden, offenbaren und schützen, wenn Sie unsere Website, unsere mobilen Anwendungen oder unsere Dienste nutzen.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">Letzte Aktualisierung: 27.10.2024</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. Einführung</h2>
            <p className="text-gray-600 mt-2">Willkommen, um die Datenschutzrichtlinie von Yellow Airlines zu lesen. Wir wissen, wie wichtig Ihre persönlichen Daten sind, und wir sind bestrebt, Ihre Privatsphäre zu schützen. Diese Richtlinie erklärt, wie wir Ihre persönlichen Daten sammeln, verwenden, offenbaren und schützen, wenn Sie unsere Website, unsere mobilen Anwendungen oder unsere Dienste nutzen.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. Die von uns gesammelten Daten</h2>
            <div className="pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mt-4">2.1 Die von Ihnen bereitgestellten Daten</h3>
              <p className="text-gray-600 mt-2">Buchungsdaten: Name, Kontaktinformationen, Geburtsdatum, Pass/Identitätsnummer, Zahlungsinformationen</p>
              <p className="text-gray-600">Konto-Daten: Benutzername, Passwort, persönliche Daten</p>
              <p className="text-gray-600">Einstellungen: Sitzplatzpräferenz, Essenauswahl, Frequent Flyer-Informationen</p>
              <p className="text-gray-600">Kommunikationsdaten: Ihre Interaktion mit unserem Kundenservice-Team</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">2.2 Automatisch gesammelte Daten</h3>
              <p className="text-gray-600 mt-2">Gerätedaten: IP-Adresse, Browser-Typ, Betriebssystem</p>
              <p className="text-gray-600">Nutzungsdaten: Besuchte Seiten, angeklickte Links, Suchhistorie</p>
              <p className="text-gray-600">Standortdaten: Wenn Sie unsere mobile Anwendung verwenden (mit Ihrer Zustimmung)</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">2.3 Daten von Drittanbietern</h3>
              <p className="text-gray-600 mt-2">Von Reisebüros oder Partnern bereitgestellte Buchungsdaten</p>
              <p className="text-gray-600">Social-Media-Plattformen (wenn Sie sich über diese Plattformen anmelden)</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. Wie wir Ihre Daten verwenden</h2>
            <p className="text-gray-600 mt-2">Unsere Verwendung Ihrer persönlichen Daten basiert auf folgenden rechtlichen Grundlagen:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>Erfüllung von Verträgen: Verarbeitung Ihrer Buchungen und Bereitstellung der von Ihnen angeforderten Dienste</li>
              <li>Rechtliche Verpflichtungen: Einhaltung von Sicherheits- und Zollvorschriften</li>
              <li>Rechtliche Berechtigung: Verb</li>
              <li>Einwilligung: Verwendung für Marketingzwecke (Sie können Ihre Einwilligung jederzeit widerrufen)</li>
            </ul>
            <p className="text-gray-600 mt-2">Konkrete Verwendungszwecke:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Verarbeitung Ihrer Buchungen und Bereitstellung der von Ihnen angeforderten Dienste</li>
              <li>Bereitstellung von Kundenservice und Support</li>
              <li>Verbesserung unserer Website und Dienste</li>
              <li>Senden wichtiger Benachrichtigungen (z.B. Änderungen an Flügen)</li>
              <li>Durchführung von Marktforschung und Analyse</li>
              <li>Erkennung und Verhinderung von Betrug</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. Datenfreigabe und Offenbarung</h2>
            <p className="text-gray-600 mt-2">Wir teilen Ihre persönlichen Daten nur in folgenden Fällen mit:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>Dienstleistungsanbieter: Verarbeitung von Zahlungen, IT-Dienste, Kundenservice usw.</li>
              <li>Luftfahrtpartner: Gemeinsame Flüge, Zusatzdienste usw.</li>
              <li>Regierungsbehörden: Gemäß gesetzlichen Anforderungen (z.B. Zoll oder Einreise)</li>
              <li>Geschäftstransfers: Wie Unternehmenszusammenschlüsse, Übernahmen oder Verkäufe von Vermögenswerten</li>
            </ul>
            <p className="text-gray-600 mt-2">Wir werden Ihre persönlichen Daten nicht an Dritte für Marketingzwecke verkaufen.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. Datenaufbewahrung</h2>
            <p className="text-gray-600 mt-2">Wir halten Ihre persönlichen Daten nur so lange auf, wie es für die Erfüllung der in dieser Richtlinie beschriebenen Zwecke erforderlich ist, oder wie lange es gemäß gesetzlichen Anforderungen erforderlich ist. Zum Beispiel:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>Buchungsdaten: Aufbewahrung 7 Jahre (steuer- und rechtliche Gründe)</li>
              <li>Nutzungsdaten: Aufbewahrung 2 Jahre</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. Ihre Rechte</h2>
            <p className="text-gray-600 mt-2">Gemäß anwendbarem Recht können Sie möglicherweise die folgenden Rechte haben:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>Zugriff auf Ihre persönlichen Daten, die wir halten</li>
              <li>Korrektur ungenauer oder unvollständiger Daten</li>
              <li>Löschen Ihrer Daten in bestimmten Fällen</li>
              <li>Einschränkung oder Widerspruch gegen die Verarbeitung Ihrer Daten</li>
              <li>Anforderung einer portablen Version Ihrer Daten</li>
              <li>Widerruf der Zustimmung (wird nicht auf vorherige rechtliche Verarbeitung Einfluss nehmen)</li>
            </ul>
            <p className="text-gray-600 mt-2">Wenn Sie diese Rechte ausüben möchten, kontaktieren Sie unseren Datenschutzbeauftragten: privacy@yellowairlines.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. Internationaler Datenübertrag</h2>
            <p className="text-gray-600 mt-2">Aufgrund der globalen Natur der Luftfahrt können Ihre Daten an Server in Regionen außerhalb Ihrer Rechtssphäre übertragen werden. Die Datenschutzvorschriften in diesen Regionen können sich von denen in Ihrer Rechtssphäre unterscheiden. Wir ergreifen angemessene Schutzmaßnahmen, um Ihre persönlichen Daten zu schützen.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. 安全措施</h2>
            <p className="text-gray-600 mt-2">Wir ergreifen angemessene Schutzmaßnahmen, um Ihre persönlichen Daten zu schützen, einschließlich:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>Verschlüsselung sensible Daten</li>
              <li>Regelmäßige Sicherheitsaudits</li>
              <li>Mitarbeiter-Datenschutztraining</li>
              <li>Zugriffsrechtekontrolle</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. Cookies und Tracking-Technologien</h2>
            <p className="text-gray-600 mt-2">Wir verwenden Cookies und ähnliche Technologien, um:</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>Speichern Ihrer Einstellungen</li>
              <li>Analyse der Website-Nutzung</li>
              <li>Bereitstellung personalisierter Inhalte</li>
            </ul>
            <p className="text-gray-600 mt-2">Sie können Ihre Cookie-Einstellungen über Ihren Browser verwalten.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. Datenschutz für Kinder</h2>
            <p className="text-gray-600 mt-2">Unsere Dienste sind nicht für Kinder unter 14 Jahren ausgerichtet. Wenn wir versehentlich Kinderdaten sammeln, werden wir sie so schnell wie möglich löschen.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. Änderungen dieser Richtlinie</h2>
            <p className="text-gray-600 mt-2">Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wenn wir wichtige Änderungen vornehmen, werden wir Sie per E-Mail oder über unsere Website benachrichtigen.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontaktinformationen</h2>
            <p className="text-gray-600">Wenn Sie Fragen zur Datenschutzrichtlinie haben oder Ihre Datenrechte ausüben möchten, kontaktieren Sie uns bitte über die folgenden Informationen:</p>
            <p className="text-gray-600 mt-2">Yellow Airlines Datenschutzbeauftragter</p>
            <p className="text-gray-600">E-Mail: privacy@flaps1f.com</p>
            <p className="text-gray-600">Telefon: +86 181 2231 7910</p>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 border-l-4 border-gray-400">
            <p className="text-sm text-gray-600 font-medium">
              Hinweis: Diese Website ist ein Bildungsbeispiel und keine echte Fluggesellschaft Website. Alle Inhalte sind rein fiktiv und dienen nur der Anzeige. Sie stellen keine tatsächlichen Unternehmen oder Dienstleistungen dar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

