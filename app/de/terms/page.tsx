'use client'

import React from 'react'
import Link from 'next/link'

export default function TermsPage() {
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
              <span className="ml-2 text-gray-900 font-medium">Service-Bedingungen</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">黃色航空 (Yellow Airlines) Nutzerbedingungen und Vereinbarung</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Die Nutzung der Yellow Airlines-Dienste bedeutet, dass Sie diese Bedingungen akzeptieren und zustimmen. Bitte lesen Sie sich sorgfältig durch.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">Letzte Aktualisierung: 1.1.2026</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. Akzeptieren der Bedingungen</h2>
            <p className="text-gray-600 mt-2">1.1 Die Nutzung der offiziellen Yellow Airlines-Website (fly.flaps1f.com) oder der mobilen Anwendung (im Folgenden als "Plattform" bezeichnet) bedeutet, dass Sie diese Bedingungen akzeptieren und zustimmen. (Im Folgenden als "Bedingungen" bezeichnet).</p>
            <p className="text-gray-600 mt-2">1.2 Wenn Sie diese Bedingungen nicht akzeptieren, stoppen Sie bitte sofort die Nutzung der Plattform.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. Dienstbeschreibung</h2>
            <p className="text-gray-600 mt-2">2.1 Yellow Airlines bietet über die Plattform Flugsuche, Buchung, Zahlung, Online-Check-in und verwandte Reiseleistungen (im Folgenden als "Dienste" bezeichnet) an.</p>
            <p className="text-gray-600 mt-2">2.2 Die Flugzeiten, Preise und Sitzplätze können sich jederzeit ändern, die endgültige Bestätigung erfolgt beim Ausstellen des Tickets.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. Konto und Buchung</h2>
            <p className="text-gray-600 mt-2">3.1 Sie müssen wahre, genaue persönliche Daten bereitstellen, um die Buchung abzuschließen. Verantwortlich für Schäden aufgrund von Fehlern in den Daten ist der Benutzer selbst.</p>
            <p className="text-gray-600 mt-2">3.2 Sie sind verantwortlich für die ordnungsgemäße Aufbewahrung Ihres Kontopassworts. Yellow Airlines übernimmt keine Verantwortung für Schäden aufgrund von unbefugtem Zugriff.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. Preise und Zahlung</h2>
            <p className="text-gray-600 mt-2">4.1 Die Preise können sich je nach Wechselkurs, Steuern oder Werbeaktionen ändern, die endgültige Preisangabe erfolgt auf der Zahlungsseite.</p>
            <p className="text-gray-600 mt-2">4.2 Nach erfolgreicher Zahlung können Sie wählen, ob Sie eine Rückerstattung oder eine Verlängerung (gemäß den Preisregeln) wünschen.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. Änderungs- und Rückerstattungsrichtlinien</h2>
            <p className="text-gray-600 mt-2">5.1 Die Änderungs- und Rückerstattungsbedingungen für Economy, Business und First Class werden bei der Buchung klar definiert. Teilweise werden Sonderangebote nicht geändert oder zurückerstattet.</p>
            <p className="text-gray-600 mt-2">5.2 Die Rückerstattung wird innerhalb von 7 bis 15 Werktagen verarbeitet, die tatsächliche Einzahlung hängt von der Bank oder dem Zahlungsdienstleister ab.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. Gepäckpolitik</h2>
            <p className="text-gray-600 mt-2">6.1 Die Freikofferlimits variieren je nach Klasse und Flugstrecke. Details finden Sie im <Link href="/de/baggaget(" className=")text-ya-yellow-600 hover:text-ya-yellow-700">Gepäckbestimmungen</Link>.</p>
            <p className="text-gray-600 mt-2">6.2 Überschreitende Gepäckstücke müssen zusätzlich vergütet werden. Die Gebühren sind auf den Schalter am Flughafen zu finden.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. Haftungsbeschränkung</h2>
            <p className="text-gray-600 mt-2">7.1 Yellow Airlines übernimmt keine Haftung für Verzögerungen oder Stornierungen aufgrund von Unvorhersehbaren Ereignissen (wie Wetter, Streik, Krieg usw.).</p>
            <p className="text-gray-600 mt-2">7.2 Yellow Airlines übernimmt keine Haftung für Qualitätsprobleme von Diensten von Drittanbietern (wie Hotels, Mietwagen usw.).</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. Datenschutzrichtlinie</h2>
            <p className="text-gray-600 mt-2">8.1 Ihre persönlichen Daten werden nur für Buchungen, Check-in und legal zulässige Zwecke verwendet. Details finden Sie in der <Link href="/de/privacy" className="text-ya-yellow-600 hover:text-ya-yellow-700">Datenschutzrichtlinie</Link>.</p>
            <p className="text-gray-600 mt-2">8.2 Wir können Cookies verwenden, um die Nutzererfahrung zu verbessern. Sie können dies in den Browser-Einstellungen deaktivieren.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. Geistiges Eigentum</h2>
            <p className="text-gray-600 mt-2">9.1 Alle Inhalte auf der Plattform (einschließlich Marken, Flugdaten, Schnittstellen-Design usw.) gehören zu Yellow Airlines und dürfen nicht ohne Genehmigung kopiert, abgerufen oder für kommerzielle Zwecke verwendet werden.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. Änderungs- und Kontobeendigungsrichtlinien</h2>
            <p className="text-gray-600 mt-2">10.1 Yellow Airlines hat das Recht, diese Bedingungen zu ändern. Nach einer Änderung wird diese durch eine Veröffentlichung auf der Plattform oder eine E-Mail an die Benutzer bekannt gegeben.</p>
            <p className="text-gray-600 mt-2">10.2 Wenn ein Benutzer diese Bedingungen verletzt, haben wir das Recht, sein Konto vorübergehend oder endgültig zu sperren.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. Anwendbares Recht</h2>
            <p className="text-gray-600 mt-2">11.1 Diese Bedingungen unterliegen dem Recht der Republik Ägypten. Alle Streitigkeiten sollten zunächst friedlich gelöst werden. Bei unlösbaren Streitigkeiten wird der Fall an das Gericht der Republik Ägypten weitergeleitet.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">12. Erklärung</h2>
            <p className="text-gray-600 mt-2 font-medium text-red-600">Alle Informationen auf dieser Website sind fiktive Inhalte und dienen nur der Bildung und Präsentation. Dies ist eine Demonstrationswebsite, keine echte Fluggesellschaft.</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontaktinformationen</h2>
            <p className="text-gray-600">Für Fragen kontaktieren Sie bitte die Yellow Airlines-Kundenbetreuung:</p>
            <p className="text-gray-600 mt-2">E-Mail: support@fly.flaps1f.com</p>
            <p className="text-gray-600">Telefon: +852 2345 6789</p>
          </div>
        </div>
      </div>
    </div>
  )
}

