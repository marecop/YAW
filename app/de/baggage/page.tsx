'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BaggagePage() {
  const [activeTab, setActiveTab] = useState('allowance')
  const [activeCabinClass, setActiveCabinClass] = useState('economy')
  
  const tabs = [
    { id: 'allowance', label: 'Gepäcklimits' },
    { id: 'restricted', label: 'Eingeschränkte Gegenstände' },
    { id: 'special', label: 'Spezielle Gepäck' },
    { id: 'fees', label: 'Überschreitungszahlungen' },
  ]

  // 不同艙等的行李限額
  const baggageAllowance = {
    economy: {
      cabinBaggage: 'Ein Handgepäck, maximal 7 kg, maximal 56x36x23 cm',
      checkedBaggage: 'Ein Checked-in Gepäck, maximal 23 kg',
      extraFees: 'Überschreitungszahlungen werden separat berechnet'
    },
    business: {
      cabinBaggage: 'Zwei Handgepäck, insgesamt maximal 14 kg, maximal 56x36x23 cm pro Gepäck',
      checkedBaggage: 'Zwei Checked-in Gepäck, maximal 32 kg pro Gepäck',
      extraFees: 'Überschreitungszahlungen ab dritter Gepäckstück'
    },
    first: {
      cabinBaggage: 'Zwei Handgepäck, insgesamt maximal 14 kg, maximal 56x36x23 cm pro Gepäck',
      checkedBaggage: 'Drei Checked-in Gepäck, maximal 32 kg pro Gepäck',
      extraFees: 'Überschreitungszahlungen ab viertem Gepäckstück'
    }
  }

  // 超額行李費用表
  const excessBaggageFees = [
    { weight: '23-32 kg (Überschreitung)', economy: 700, business: 500, first: 0 },
    { weight: 'Zusätzliches Gepäck (unter 23 kg)', economy: 1200, business: 1000, first: 800 },
    { weight: 'Großes Gepäck (159-203 cm)', economy: 1500, business: 1200, first: 1000 },
  ]

  // 特殊行李處理費
  const specialBaggageFees = [
    { item: 'Sportgeräte (Golfbahn)', fee: 900 },
    { item: 'Ski/Wassersportgeräte', fee: 900 },
    { item: 'Surfboard', fee: 1500 },
    { item: 'Fahrrad', fee: 1500 },
    { item: 'Musikinstrument (klein)', fee: 700 },
    { item: 'Musikinstrument (groß)', fee: 1800 },
    { item: 'Haustiere (Cabin)', fee: 1200 },
    { item: 'Haustiere (Fracht)', fee: null },
  ]

  // 限制物品列表
  const restrictedItems = [
    {
      category: "Nicht zulässige Gegenstände - Inlandsflüge",
      items: [
        'Sprengstoffe und Feuerwerkskörper (einschließlich Fake-Sprengstoffgeräte)',
        'Komprimierte Gase, flüssige Brennstoffe und Feststoffe',
        'Giftigkeit oder Infektionen',
        'Radioaktivität',
        'Korrosivität',
        'Magnetische Gegenstände',
        'Waffen (Waffen, große Schwerter, etc.)',
        'Narkotika und Verbotene Medikamente',
        'Keine ESTA-Zertifikat und Laptops mit mehr als 20000mAh Akkus',
        'Alle Flüssigkeiten sind vor der Sicherheitsprüfung nicht zulässig, einschließlich Wasser, Getränke, Suppen, Flüssigkeits- und Nahrungsmittel. Nebel und Gelee dürfen nur bis zu 100 ml mitgeführt werden.',
        'Unverschärfte Kommunikationsgeräte (einschließlich WLAN-Geräte, Walkie-Talkies, Drones, Funkgeräte, etc.)',
        'Alkoholische persönliche Hygieneartikel (Alkoholgehalt über 50%)',
      ]
    },
    {
      category: "Nicht zulässige Gegenstände - Internationale Flüge",
      items: [
        'Sprengstoffe und Feuerwerkskörper (einschließlich Fake-Sprengstoffgeräte)',
        'Komprimierte Gase, flüssige Brennstoffe und Feststoffe',
        'Giftigkeit oder Infektionen',
        'Radioaktivität',
        'Korrosivität',
        'Magnetische Gegenstände',
        'Waffen (Waffen, große Schwerter, etc.)',
        'Narkotika und Verbotene Medikamente',
        'Keine ESTA-Zertifikat und Laptops mit mehr als 20000mAh Akkus',
        'Alle Flüssigkeiten sind vor der Sicherheitsprüfung nicht zulässig, einschließlich Wasser, Getränke, Suppen, Flüssigkeits- und Nahrungsmittel. Nebel und Gelee dürfen nur bis zu 100 ml mitgeführt werden.',
        'Unverschärfte Kommunikationsgeräte (einschließlich WLAN-Geräte, Walkie-Talkies, Drones, Funkgeräte, etc.)',
        'Alkoholische persönliche Hygieneartikel (Alkoholgehalt über 50%)',
      ]
    },
    {
      category: 'Nicht zulässige Gegenstände - Inlandsflüge',
      items: [
        'Schwerter und Arbeitsgeräte',
        'Kleine scharfe Gegenstände (Schwerter mit einer Klingenlänge von weniger als 6 cm oder Spitzen, etc.)',
        'Komprimierte Gase oder Flüssigkeiten (unter 150 ml, über 150 ml nicht zulässig)',
        'Sportgeräte'
      ]
    },
    {
      category: 'Nicht zulässige Gegenstände - Internationale Flüge',
      items: [
        'Schwerter und Schere (Schwerter mit einer Klingenlänge von mehr als 6 cm)',
        'Baseballschläger, Golfbahnen und andere Sportgeräte',
        'Werkzeuge (Schraubendreher, Schraubenschlüssel, etc.)',
        'Elektronische Geräte mit Lithiumbatterien (über die zulässige Kapazität hinaus)',
        'Alkoholische Getränke (Alkoholgehalt über 70%)',
        'Sportgeräte'
      ]
    },
    {
      category: 'Zulässige Gegenstände - Inlandsflüge',
      items: [
        'Flüssigkeiten, Gelee und Nebel (jeweils nicht mehr als 100 ml, insgesamt nicht mehr als 1 l)',
        'Babyfood (geeignet)',
        'Arzneimittel (mit Rezept oder Arztschein)',
        'Unverschärfte Kommunikationsgeräte (einschließlich WLAN-Geräte, Walkie-Talkies, Drones, Funkgeräte, etc.)',
        'Alkoholische persönliche Hygieneartikel (Alkoholgehalt unter 50%)',
      ]
    },
    {
      category: 'Zulässige Gegenstände - Internationale Flüge',
      items: [
        'Flüssigkeiten, Gelee und Nebel (jeweils nicht mehr als 100 ml, insgesamt nicht mehr als 1 l)',
        'Babyfood (geeignet)',
        'Arzneimittel (mit Rezept oder Arztschein)',
        'Elektronische Geräte mit Lithiumbatterien (in der zulässigen Kapazität)',
        'Alkoholische persönliche Hygieneartikel (Alkoholgehalt unter 50%)',
      ]
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'allowance':
        return (
          <div className="mt-6">
            <div className="mb-6">
              <div className="flex border-b">
                <button 
                  className={`py-2 px-4 font-medium text-sm ${activeCabinClass === 'economy' ? 'border-b-2 border-ya-yellow-500 text-ya-yellow-700' : 'text-gray-500'}`}
                  onClick={() => setActiveCabinClass('economy')}
                >
                  Economy
                </button>
                <button 
                  className={`py-2 px-4 font-medium text-sm ${activeCabinClass === 'business' ? 'border-b-2 border-ya-yellow-500 text-ya-yellow-700' : 'text-gray-500'}`}
                  onClick={() => setActiveCabinClass('business')}
                >
                  Business
                </button>
                <button 
                  className={`py-2 px-4 font-medium text-sm ${activeCabinClass === 'first' ? 'border-b-2 border-ya-yellow-500 text-ya-yellow-700' : 'text-gray-500'}`}
                  onClick={() => setActiveCabinClass('first')}
                >
                  First Klasse
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-ya-yellow-100 rounded-full mr-4">
                    <svg className="w-6 h-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Handgepäck</h3>
                </div>
                <p className="text-gray-600">{baggageAllowance[activeCabinClass as keyof typeof baggageAllowance].cabinBaggage}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Handgepäck muss in der Kabine oder unter dem Vordersitz platziert werden können und darf nicht die Notausgänge blockieren.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-ya-yellow-100 rounded-full mr-4">
                    <svg className="w-6 h-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Gepäck im Flugzeug</h3>
                </div>
                <p className="text-gray-600">{baggageAllowance[activeCabinClass as keyof typeof baggageAllowance].checkedBaggage}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {baggageAllowance[activeCabinClass as keyof typeof baggageAllowance].extraFees}.Die Gesamtlänge (Länge + Breite + Höhe) darf nicht mehr als 158 cm betragen.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kindergepäck</h3>
              <p className="text-gray-600">
                Kindergepäck kann nur bei Flügen mit Kindersitzplätzen mitgeführt werden.
              </p>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipps</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Bevor Sie mit Ihrem Gepäck aufbrechen, vergewissern Sie sich, dass alle Gegenstände zulässig sind.</li>
                <li>Tragen Sie Ihr Gepäck gut sichtbar mit Ihrem Namen und der Flugnummer versehen.</li>
                <li>Beachten Sie die Gepäckbeschränkungen für Ihre Reise.</li>
                <li>Wenden Sie sich an unseren Kundenservice, wenn Sie Unklarheiten haben.</li>
              </ul>
            </div>
          </div>
        )
      case 'restricted':
        return (
          <div className="mt-6">
            <p className="text-gray-600 mb-6">
              Dies ist die Liste der Gepäckbeschränkungen und verbotenen Gegenstände. Bitte überprüfen Sie diese Liste vor Ihrer Reise.
            </p>
            
            {restrictedItems.map((category, index) => (
              <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="mt-8 bg-ya-yellow-50 border-l-4 border-ya-yellow-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-ya-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-ya-yellow-700">
                    Achtung: Die Gepäckbeschränkungen und verbotenen Gegenstände können je nach Land und Sicherheitsvorschriften variieren. Bitte informieren Sie sich vor Ihrer Reise über die lokalen Vorschriften. Wenden Sie sich an unseren Kundenservice, wenn Sie Unklarheiten haben.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'special':
        return (
          <div className="mt-6">
            <p className="text-gray-600 mb-6">
              Spezielle Gepäck benötigt besondere Behandlung und zusätzliche Gebühren. Bitte kontaktieren Sie uns mindestens 24 Stunden vor Ihrer Reise, um sicherzustellen, dass Ihr spezielles Gepäck sicher transportiert werden kann.
            </p>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gegenstandstyp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gebühren
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {specialBaggageFees.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.fee === null ? 'Nach Gewicht berechnet' : `HK$${item.fee} / Stück`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hinweise für spezielle Gepäck</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Sportgeräte müssen sorgfältig verpackt werden, um bei der Transportierung zu schützen</li>
                <li>Musikinstrumente sollten in einem robusten Hartschale verpackt werden und die Saiten gelockert werden, um Druck zu reduzieren</li>
                <li>Haustiere müssen 48 Stunden vor der Reise beantragt werden und entsprechende Gesundheitszeugnisse und Impfzertifikate vorlegen</li>
                <li>Große Gepäckstücke (über 32 kg) benötigen eine besondere Verarbeitung und können zusätzliche Gebühren verursachen</li>
                <li>Es können auf bestimmten Routen möglicherweise nicht alle speziellen Gepäckstücke akzeptiert werden, bitte prüfen Sie vorher die spezifischen Vorschriften</li>
              </ul>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hilfsmittel für Menschen mit Behinderungen</h3>
              <p className="text-gray-600">
                Rollstuhl, Gehhilfen und andere medizinische Hilfsmittel können kostenlos transportiert werden und gelten nicht als Gepäck. Elektrische Rollstühle müssen vorher gemeldet werden
              </p>
            </div>
          </div>
        )
      case 'fees':
        return (
          <div className="mt-6">
            <p className="text-gray-600 mb-6">
              Gepäck, das den freien Gepäckgrenzwert überschreitet, erzeugt zusätzliche Gebühren. Hier sind die Gebühren für die überschreitenden Gepäckstücke in den verschiedenen Kabinen.
            </p>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Überschreitungstyp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Economy
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Klasse
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {excessBaggageFees.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.weight}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.economy === 0 ? 'Gratis' : `ELB$${item.economy}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.business === 0 ? 'Gratis' : `ELB${item.business}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.first === 0 ? 'Gratis' : `ELB${item.first}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hinweise für zusätzliche Gebühren</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Die Mitgliedschaft kann die Gebühren für überschreitende Gepäck beeinflussen</li>
                <li>Es ist im Voraus möglich, überschreitende Gepäckdienste online zu buchen, was etwas günstiger ist als die Bezahlung am Flughafen</li>
                <li>Die Gebühren werden in der Währung des Abflugsorts oder in gleichwertigen Beträgen erhoben</li>
                <li>Auf bestimmten Routen können möglicherweise spezielle Gepäckgebühren gelten, bitte prüfen Sie die spezifischen Vorschriften für die jeweilige Route</li>
                <li>Die Gebühren können sich im Laufe der Zeit ändern, die endgültigen Preise sind diejenigen, die bei der Buchung gültig sind</li>
              </ul>
            </div>
            
            <div className="mt-8 bg-ya-yellow-50 border-l-4 border-ya-yellow-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-ya-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-ya-yellow-700">
                    Hinweis: Es ist im Voraus möglich, überschreitende Gepäckdienste online zu buchen, was etwas günstiger ist als die Bezahlung am Flughafen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
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
              <span className="ml-2 text-gray-900 font-medium">Gepäckbeschränkungen</span>
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Gepäckbeschränkungen</h1>
        <p className="mt-2 text-lg text-gray-600">Erfahren Sie mehr über Handgepäck, Gepäck im Flugzeug, eingeschränkte Gegenstände und zusätzliche Gebühren</p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-ya-yellow-500 text-ya-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Noch Fragen?</h2>
        <p className="text-gray-600 mb-6">
          Wenn Sie Fragen zu den Gepäckbeschränkungen haben, kontaktieren Sie uns bitte jederzeit. Wir freuen uns, Ihnen dabei zu helfen.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">E-Mail</h3>
              <p className="text-gray-600">baggage@flaps1f.com</p>
              <p className="text-sm text-gray-500">Wir werden Ihre E-Mail innerhalb von 24 Stunden beantworten</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
              <p className="text-gray-600">+86 114 5141 9198</p>
              <p className="text-sm text-gray-500">Montag bis Sonntag 9:00-21:00 (Ortszeit)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
