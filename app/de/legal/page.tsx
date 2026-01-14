'use client'

import React from 'react'
import Link from 'next/link'

export default function LegalPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/de/" className="text-gray-500 hover:text-gray-700">
                Startseite
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Rechtliche Erklärung</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yellow Airlines（Yellow Airlines）Rechtliche Erklärung</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Bitte lesen Sie diese rechtliche Erklärung sorgfältig, um Ihre Rechte und Verantwortungen bei der Nutzung dieser Website zu verstehen.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">Letzte Aktualisierung: 27.10.2025</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. Informationen und Daten</h2>
            <p className="text-gray-600 mt-2">
              Die Yellow Airlines Website (im Folgenden als "diese Website" bezeichnet) und alle darauf enthaltenen Inhalte sind Eigentum von Yellow Airlines und unterliegen dem Schutz der Urheberrechtsgesetze, Markengesetzen und anderen geistigen Eigentumsgesetzen der Republik Einsenland. Ohne schriftliche Genehmigung von Yellow Airlines dürfen keine Einheiten oder Personen diese Website oder ihre Teile in irgendeiner Weise verwenden, kopieren, modifizieren, verbreiten, darstellen oder veröffentlichen.
            </p>
            <p className="text-gray-600 mt-2">
              Die auf dieser Website bereitgestellten Informationen dienen nur als Referenz. Wir werden uns bemühen, die Genauigkeit der Website-Inhalte zu gewährleisten, geben aber keine Garantie für die Genauigkeit, Vollständigkeit oder Aktualität der Informationen. Yellow Airlines behält sich das Recht vor, die Website-Inhalte und Produktinformationen jederzeit zu ändern, ohne eine zusätzliche Benachrichtigung.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. Haftungsausschluss</h2>
            <p className="text-gray-600 mt-2">
            Soweit gesetzlich zulässig, übernimmt Yellow Airlines keine Haftung für direkte, indirekte, beiläufige, besondere, mittelbare oder strafende Schäden, die sich aus der Nutzung oder der Unmöglichkeit der Nutzung dieser Website ergeben, einschließlich, aber nicht beschränkt auf entgangenen Gewinn, Datenverlust oder Betriebsunterbrechungen.
            </p>
            <p className="text-gray-600 mt-2">
              Für Verzögerungen, Stornierungen, Verlust von Gepäck oder andere Schäden, die aufgrund von Unvorhersehbaren Ereignissen (wie Naturkatastrophen, Regierungsmaßnahmen, Streiks, Kriege, Seuchen usw.) oder anderen nicht von Yellow Airlines verursachten Gründen entstehen, übernimmt Yellow Airlines keine Haftung.
            </p>
            <p className="text-gray-600 mt-2">
              Beim Nutzen dieser Website zur Buchung von Flügen oder dem Erwerb von Dienstleistungen müssen Sie sorgfältig die entsprechenden Bedingungen und Bestimmungen lesen und akzeptieren. Yellow Airlines übernimmt keine Verantwortung für Verluste, die aufgrund der Nichteinhaltung dieser Bedingungen oder Bestimmungen durch den Nutzer entstehen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. Externe Links</h2>
            <p className="text-gray-600 mt-2">
              Diese Website kann Links zu externen Websites enthalten, die ausschließlich der Nutzerkomfort bereitgestellt werden. Yellow Airlines übernimmt keine Verantwortung für den Inhalt, die Genauigkeit oder Verfügbarkeit der Inhalte externer Websites. Außerdem übernimmt Yellow Airlines keine Verantwortung für Schäden, die aufgrund der Nutzung oder des Zugriffs auf solche externen Websites entstehen.
            </p>
            <p className="text-gray-600 mt-2">
              Der Zugriff auf externe Websites ist auf Ihre eigene Entscheidung und Risiko. Wir empfehlen Ihnen, die entsprechenden Nutzungsbedingungen und Datenschutzrichtlinien der externen Websites zu lesen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. Geistiges Eigentum</h2>
            <p className="text-gray-600 mt-2">
              Alle Inhalte dieser Website, einschließlich, aber nicht beschränkt auf Texte, Bilder, Logos, Audio, Video, Software, Code und deren Kombinationen, sind durch das Urheberrechtsgesetz der Republik Einsenland und andere geistige Eigentumsgesetze geschützt. Ohne schriftliche Genehmigung von Yellow Airlines dürfen keine Einheiten oder Personen diese Inhalte in irgendeiner Weise verwenden, kopieren, modifizieren, verbreiten, darstellen oder veröffentlichen.
            </p>
            <p className="text-gray-600 mt-2">
              "Yellow Airlines" und alle zugehörigen Logos sind Markenzeichen von Yellow Airlines und unterliegen dem Schutz des Markengesetzes der Republik Einsenland und anderer geistiger Eigentumsgesetze. Ohne schriftliche Genehmigung von Yellow Airlines dürfen keine Einheiten oder Personen diese Markenzeichen in irgendeiner Weise verwenden, kopieren, modifizieren, verbreiten, darstellen oder veröffentlichen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. Datenschutz</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlines legt großen Wert auf den Schutz Ihrer persönlichen Daten. Wir erheben, verwenden, speichern und schützen Ihre persönlichen Daten gemäß den relevanten Rechtsvorschriften und unserer <Link href="/de/privacy" className="text-ya-yellow-600 hover:text-ya-yellow-700">Datenschutzrichtlinie</Link>. Bitte lesen Sie unsere Datenschutzrichtlinie sorgfältig, bevor Sie diese Website nutzen.
            </p>
            <p className="text-gray-600 mt-2">
              Wenn Sie Fragen zur Verarbeitung Ihrer persönlichen Daten haben, kontaktieren Sie uns bitte über die Kontaktinformationen am Ende dieser Erklärung.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. Nutzerverhalten</h2>
            <p className="text-gray-600 mt-2">
              Beim Nutzen dieser Website müssen Sie die relevanten Rechtsvorschriften und andere gesetzliche Bestimmungen der Republik Einsenland beachten und das Netzzeugverhalten respektieren. Sie dürfen diese Website nicht für unerlaubte Aktivitäten verwenden, einschließlich, aber nicht beschränkt auf:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
              <li>Veröffentlichung, Übertragung oder Speicherung von Informationen, die gegen die nationale Rechtsvorschriften verstoßen</li>
              <li>Die Verletzung von geistigem Eigentum, Geschäftsgeheimnissen oder anderen rechtlichen Rechten Dritter</li>
              <li>Die Zerstörung der ordnungsgemäßen Funktion der Website oder des Zugriffs auf Server ohne Erlaubnis</li>
              <li>Die unbefugte Verbreitung von Computerviren oder anderen schädlichen Programmen</li>
              <li>Die Täuschung von Personen oder Institutionen durch falsche Aktivitäten</li>
            </ul>
            <p className="text-gray-600 mt-2">
              Wenn Sie bemerken, dass eine solche Verletzung auftritt, hat Yellow Airlines das Recht, die Bereitstellung seiner Dienstleistungen sofort zu beenden und sich die Rechtmäßigkeit der Maßnahmen zu erhalten.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. Anwendbares Recht und Streitbeilegung</h2>
            <p className="text-gray-600 mt-2">
              Die Interpretation, Gültigkeit und Streitbeilegung dieser rechtlichen Erklärung gelten für die Republik Einsenland.
            </p>
            <p className="text-gray-600 mt-2">
              Alle Streitigkeiten oder Konflikte, die aufgrund der Nutzung dieser Website entstehen, sollten zuerst im guten Glauben der Beteiligten gelöst werden. Wenn eine Einigung nicht erzielt werden kann, kann jede Partei einen Klageverfahren vor dem zuständigen Gericht in der Republik Einsenland einreichen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. Datensicherheit</h2>
            <p className="text-gray-600 mt-2">
              Wir treffen Maßnahmen der Branche, um die Sicherheit Ihrer persönlichen Daten zu schützen. Allerdings kann die Übertragung über das Internet nicht garantiert werden, dass alle Informationen, die über diese Website übertragen werden, sicher sind.
            </p>
            <p className="text-gray-600 mt-2">
              Die Risiken, die durch die Nutzung dieser Website und die Übertragung von Informationen entstehen, liegen bei Ihnen. Wir empfehlen Ihnen, bei der Nutzung der Website angemessene Maßnahmen zu ergreifen, um die Sicherheit Ihrer persönlichen Daten zu schützen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. Änderungen dieser Erklärung</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlines behält sich das Recht vor, diese rechtliche Erklärung jederzeit zu ändern. Eine geänderte rechtliche Erklärung wird sofort nach Veröffentlichung auf dieser Website wirksam. Die weitere Nutzung dieser Website bedeutet, dass Sie die geänderte rechtliche Erklärung akzeptieren.
            </p>
            <p className="text-gray-600 mt-2">
              Wir empfehlen Ihnen, diese rechtliche Erklärung regelmäßig zu lesen, um Änderungen zu erkennen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. Urheberrechtserklärung</h2>
            <p className="text-gray-600 mt-2">
              Alle Inhalte dieser Website, einschließlich, aber nicht beschränkt auf Texte, Bilder, Logos, Audio, Video, Software, Code und deren Kombinationen, sind durch das Urheberrechtsgesetz der Republik Einsenland und andere geistige Eigentumsgesetze geschützt. Ohne schriftliche Genehmigung von Yellow Airlines dürfen keine Einheiten oder Personen diese Inhalte in irgendeiner Weise verwenden, kopieren, modifizieren, verbreiten, darstellen oder veröffentlichen.
            </p>
            <p className="text-gray-600 mt-2">
              Ohne schriftliche Genehmigung von Yellow Airlines dürfen keine Einheiten oder Personen diese Markenzeichen in irgendeiner Weise verwenden, kopieren, modifizieren, verbreiten, darstellen oder veröffentlichen.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. Firmenqualifikationen</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlines ist gemäß dem Einsenlandes Gesetz über Unternehmen (Companies Act) registriert und verfügt über gültige Handelsregistrierung und Flugbetriebsgenehmigung. Die Firmenregistrierungsnummer lautet: MYHKC-69128
            </p>
            <p className="text-gray-600 mt-2 font-medium text-red-600">
              Hinweis: Diese Website ist ein Bildungsbeispiel und keine echte Fluggesellschaft Website. Alle Inhalte sind rein fiktiv und dienen nur der Anzeige. Sie stellen keine tatsächlichen Unternehmen oder Dienstleistungen dar.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontaktinformationen</h2>
            <p className="text-gray-600">
              Wenn Sie Fragen zur rechtlichen Erklärung haben oder mit uns in Verbindung treten möchten, kontaktieren Sie uns bitte über die folgenden Informationen:
            </p>
            <p className="text-gray-600 mt-2">
              Firmenname: Yellow Airlines Co., Ltd. (Yellow Airlines Co., Ltd.)
            </p>
            <p className="text-gray-600">
              E-Mail: legal@yellowairlines.com
            </p>
            <p className="text-gray-600">
              Telefon: +86 181 2231 7910 (Werktage 9:00-18:00)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

