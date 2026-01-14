'use client'

import Link from 'next/link'

export default function FAQPage() {
  
  const faqCategories = [
    {
      id: 'booking',
      title: 'Buchung und Zahlung',
      questions: [
        {
          question: 'Wie kann ich die günstigsten Flugpreise finden?',
          answer: 'Yellow Airlines bietet eine flexible Flugpreis-Suche-Funktion. Sie können die "Preis-Kalender" Funktion verwenden, um die Preise für verschiedene Tage zu sehen, oder abonnieren Sie unsere E-Mail, um Preis-Aktionen zu erhalten. Normalerweise können Sie günstigere Preise erhalten, wenn Sie früher buchen und in Nicht-Spitzzeiten fliegen.'
        },
        {
          question: 'Wird eine Gebühr für die Stornierung oder Änderung der Buchung berechnet?',
          answer: 'Das hängt von der Art des gekauften Tickets und der Zeit der Stornierung/Änderung ab. Die Basispreise der Economy Class erlauben möglicherweise keine Rückerstattung, aber eine Gebühr für die Änderung kann gezahlt werden. Flexible Preise und Business Class bieten in der Regel flexiblere Änderungsrichtlinien. Bitte überprüfen Sie die konkreten Preisregeln bei der Buchung oder wenden Sie sich an unseren Kundenservice für Hilfe.'
        },
        {
          question: 'Kann ich für andere Tickets buchen?',
          answer: 'Ja, Sie können Tickets für Ihre Familie, Freunde oder Kollegen buchen. Während der Buchung müssen Sie die detaillierten Informationen für jeden Passagier bereitstellen, einschließlich des Namens (der mit dem Namen auf Ihrem Pass übereinstimmen muss), des Geburtsdatums und der Kontaktinformationen.'
        },
        {
          question: 'Wo kann ich meine Buchung bestätigen finden?',
          answer: 'Nach der Buchung senden wir eine Bestätigungsmail an die von Ihnen bereitgestellte E-Mail-Adresse. Sie können auch auf unsere Website oder unsere App im "Meine Buchungen" Bereich Ihre Buchungsdetails ansehen.'
        }
      ]
    },
    {
      id: 'baggaget(',
      title: ')Gepäckbestimmungen',
      questions: [
        {
          question: 'Wie viel Gepäck ist für verschiedene Ticket-Typen erlaubt?',
          answer: 'Die Gepäckbegrenzungen variieren je nach Flug und Ticket-Art. Im Allgemeinen umfasst die Economy Class Basispreis 7kg Handgepäck, die Economy Class Flexible Preise und Business Class in der Regel 23kg oder 32kg Gepäck-Grenzwerte. Sie können die konkreten Grenzwerte bei der Buchung oder auf unserer Gepäckbestimmungsseite sehen.'
        },
        {
          question: 'Wie kann ich zusätzliche Gepäck-Grenzwerte kaufen?',
          answer: 'Sie können zusätzliche Gepäck-Grenzwerte bei der Buchung oder durch das Anmelden Ihres Kontos online kaufen. Das Online-Kaufen ist im Vergleich zum Kauf am Flughafen wirtschaftlicher. Sie können auch unseren Kundenservice kontaktieren, um Ihnen bei diesem Vorgang zu helfen.'
        },
        {
          question: 'Wie werden besondere Gepäckstücke (wie Sportgeräte, Musikinstrumente usw.) verarbeitet?',
          answer: 'Besondere Gepäckstücke müssen im Voraus beantragt werden. Die meisten Sportgeräte (wie Golfbälle, Ski-Ausrüstung) können als Standard-Gepäck transportiert werden, aber es kann zusätzliche Kosten geben. Musikinstrumente können als Handgepäck oder als Gepäck transportiert werden, oder es kann ein zusätzlicher Sitz benötigt werden. Bitte kontaktieren Sie uns 48 Stunden vor dem Flug, um spezielle Gepäck-Anweisungen zu erhalten.'
        }
      ]
    },
    {
      id: 'checkin',
      title: 'Check-In und Flugservice',
      questions: [
        {
          question: 'Wann öffnet sich die Online-Check-In?',
          answer: 'Die Online-Check-In öffnet sich normalerweise 24 Stunden vor dem Flug und schließt 60 Minuten vor dem Flug. Wir empfehlen, die Check-In so früh wie möglich zu machen, um Ihren bevorzugten Sitzplatz zu wählen.'
        },
        {
          question: 'Was passiert, wenn ich den Flug verpasse?',
          answer: 'Wenn Sie den Flug verpassen, kontaktieren Sie bitte unseren Kundenservice oder gehen Sie zur Yellow Airlines Service-Büro am Flughafen. Je nach Ihrem Ticket-Typ und den konkreten Umständen werden wir Ihnen helfen, zu einem nächsten verfügbaren Flug zu wechseln, aber es kann Kosten für die Änderung geben.'
        },
        {
          question: 'Welche speziellen Speisen bietet Yellow Airlines?',
          answer: 'Wir bieten verschiedene spezielle Speisenoptionen, einschließlich Vegetarier, Halal-Speisen, Glutenfrei, Lactosefrei usw. Bitte wenden Sie sich an unseren Kundenservice 48 Stunden vor dem Flug, um spezielle Speisen zu bestellen.'
        },
        {
          question: 'Wird WiFi auf den Flügen angeboten?',
          answer: 'Ja, wir bieten WiFi auf den meisten Flügen an. Kurzstreckenflüge bieten möglicherweise kostenlose Grundfunktionen, während Langstreckenflüge in der Regel verschiedene上网-Pakete bieten. Die konkreten Preise und Verfügbarkeit hängen von Ihrer Fluglinie ab.'
        }
      ]
    },
    {
      id: 'special',
      title: 'Besondere Service',
      questions: [
        {
          question: 'Wie kann ich Passagieren mit besonderen Anforderungen helfen?',
          answer: 'Wir sind dazu verpflichtet, allen Passagieren eine bequeme Reiseerlebnis zu bieten. Für Rollstuhl-Service, Assistenten-Check-In oder andere besondere Service, kontaktieren Sie uns 48 Stunden vor dem Flug oder bei der Buchung. Unser Personal am Flughafen wird Passagieren mit besonderen Anforderungen die gesamte Reise helfen.'
        },
        {
          question: 'Kann Schwangere mit Yellow Airlines fliegen?',
          answer: 'Schwangere können normalerweise mit unseren Flügen fliegen, aber es gibt einige Einschränkungen. Passagiere unter 28 Wochen Schwangerschaft können ohne medizinische Bestätigung fliegen. Passagiere zwischen 28 und 36 Wochen Schwangerschaft müssen eine Fluggenehmigung des Arztes vorlegen. Passagiere über 36 Wochen Schwangerschaft werden aus Sicherheitsgründen normalerweise nicht empfohlen, zu fliegen. Bitte konsultieren Sie Ihren Arzt und kontaktieren Sie uns vor der Buchung.'
        },
        {
          question: 'Was ist mit Kindern, die alleine reisen?',
          answer: '5-12 Jahre alte Kinder können das "Unbegleiteten-Kinderservice" für ein eigenständiges Reisen nutzen. Dieser Service muss im Voraus gebucht und zusätzliche Kosten entrichtet werden. Unser Personal wird den Kindern während der gesamten Reise die Sicherheit gewährleisten, vom Flughafen bis zum Zielort und der mitgeführten Person. 12-16 Jahre alte Kinder können diesen Service nutzen.'
        },
        {
          question: 'Kann ich mit meinem Haustier reisen?',
          answer: 'Kleine Haustiere (Katzen, kleine Hunde) können als Handgepäck mit in den Flugzeugkabinen mitgenommen werden, sofern sie in einem geeigneten Haustierkäfig eingepackt sind. Größere Haustiere müssen als Gepäck transportiert werden. Alle Haustiertransporte müssen im Voraus beantragt und zusätzliche Kosten entrichtet werden. Bitte beachten Sie, dass Service-Tiere andere Regeln haben. Bitte kontaktieren Sie uns vor der Buchung für weitere Informationen.'
        }
      ]
    },
    {
      id: 'rewards',
      title: 'Mitgliedschaft und Belohnungen',
      questions: [
        {
          question: 'Wie kann ich dem Yellow Airlines-Frequent Flyer-Programm beitreten?',
          answer: 'Sie können sich auf unserer Website oder in unserer App kostenlos als "Yellow Miles" Mitglied registrieren. Der Registrierungsvorgang ist einfach, es ist nur erforderlich, grundlegende persönliche Informationen und Kontaktinformationen bereitzustellen. Nachdem Sie Mitglied geworden sind, wird Ihre jede Flugreise Meilen sammeln, die für kostenlose Tickets und andere Belohnungen verwendet werden können.'
        },
        {
          question: 'Wie lange sind die Meilenpunkte gültig?',
          answer: 'Standard-Mitglieder haben 2 Jahre Gültigkeit der Meilenpunkte. Silber-Mitglieder haben 3 Jahre Gültigkeit der Meilenpunkte, Gold-Mitglieder und Platinum-Mitglieder haben keine Gültigkeitsfrist für die Meilenpunkte. Jede Kontoaktivität (Flug oder Umtausch) setzt die Gültigkeit der Meilenpunkte zurück.'
        },
        {
          question: 'Wie kann ich meine Meilen-Guthaben überprüfen?',
          answer: 'Sie können sich auf unserer Website oder in unserer App anmelden, im Mitgliederbereich Ihr Meilen-Guthaben, Aktivitätsverlauf und nahender Meilenpunkte sehen. Sie können auch die aktualisierten Meileninformationen in der E-Mail sehen, die Sie nach jedem Flug erhalten.'
        }
      ]
    }
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
            <span className="ml-2 text-gray-900 font-medium">Häufige Fragen</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Häufige Fragen</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Finden Sie Antworten auf Ihre Fragen zu Yellow Airlines-Service
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 側邊類別選單 */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 sticky top-20">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Fragenkategorien</h2>
            <nav className="space-y-2">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-ya-yellow-100 text-gray-700 transition-colors"
                >
                  {category.title}
                </a>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-ya-yellow-50 rounded-lg">
              <h3 className="font-medium text-ya-yellow-800 mb-2">Benötigen Sie mehr Hilfe?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Wenn Sie keine Antwort auf Ihre Frage gefunden haben, kontaktieren Sie bitte unseren Kundenservice.
              </p>
              <a
                href="mailto:support@yellowairlines.com"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700"
              >
                Kontaktieren Sie uns
              </a>
            </div>
          </div>
        </div>

        {/* 問題列表 */}
        <div className="lg:col-span-3">
          {faqCategories.map((category) => (
            <div
              id={category.id}
              key={category.id}
              className="mb-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-gray-200">
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group">
                    <summary className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 pt-2">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 联系信息 */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Noch Fragen?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Unser Kundenservice-Team ist jederzeit für Ihre Hilfe bereit. Bitte kontaktieren Sie uns über die folgenden Kanäle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg">
            <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-1">E-Mail</h3>
            <a href="mailto:supportya@flaps1f.com" className="text-ya-yellow-600 hover:underline">
              supportya@flaps1f.com
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-1">Kundenservice-Telefon</h3>
            <a href="tel:+8618122317910" className="text-ya-yellow-600 hover:underline">
              +86 181 2231 7910
            </a>
            <p className="text-sm text-gray-500 mt-1">Montag bis Sonntag 9:00-21:00</p>
          </div>
        </div>
      </div>
    </main>
  )
}

