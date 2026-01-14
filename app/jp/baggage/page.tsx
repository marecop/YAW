'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BaggagePage() {
  const [activeTab, setActiveTab] = useState('allowance')
  const [activeCabinClass, setActiveCabinClass] = useState('economy')
  
  const tabs = [
    { id: 'allowance', label: '手荷物許容量' },
    { id: 'restricted', label: '制限品目' },
    { id: 'special', label: '特殊手荷物' },
    { id: 'fees', label: '超過料金' },
  ]

  // 不同艙等的行李限額
  const baggageAllowance = {
    economy: {
      cabinBaggage: '機内持ち込み手荷物1個、重量7kg以下、サイズ56x36x23cm以下',
      checkedBaggage: '受託手荷物1個、重量23kg以下',
      extraFees: '重量超過/個数超過料金は別途'
    },
    business: {
      cabinBaggage: '機内持ち込み手荷物2個、合計重量14kg以下、各サイズ56x36x23cm以下',
      checkedBaggage: '受託手荷物2個、各重量32kg以下',
      extraFees: '3個目から有料'
    },
    first: {
      cabinBaggage: '機内持ち込み手荷物2個、合計重量14kg以下、各サイズ56x36x23cm以下',
      checkedBaggage: '受託手荷物3個、各重量32kg以下',
      extraFees: '4個目から有料'
    }
  }

  // 超額行李費用表
  const excessBaggageFees = [
    { weight: '23-32kg（重量超過）', economy: 700, business: 500, first: 0 },
    { weight: '追加手荷物（1個あたり23kg以下）', economy: 1200, business: 1000, first: 800 },
    { weight: 'サイズ超過手荷物（159-203cm）', economy: 1500, business: 1200, first: 1000 },
  ]

  // 特殊行李處理費
  const specialBaggageFees = [
    { item: 'スポーツ用品（ゴルフクラブ）', fee: 900 },
    { item: 'スキー/水上スキー用品', fee: 900 },
    { item: 'サーフボード', fee: 1500 },
    { item: '自転車', fee: 1500 },
    { item: '楽器（小型）', fee: 700 },
    { item: '楽器（大型）', fee: 1800 },
    { item: 'ペット（機内）', fee: 1200 },
    { item: 'ペット（貨物室）', fee: null },
  ]

  // 限制物品列表
  const restrictedItems = [
    {
      category: "持ち込み禁止品目 - 国内線",
      items: [
        '爆発物および花火製品（模擬爆発装置を含む）',
        '圧縮ガス、引火性液体および固体',
        '毒性または伝染性物質',
        '放射性物質',
        '腐食性物質',
        '磁性物品',
        '攻撃的な武器（銃器、刃物など）',
        '麻薬および違法薬物',
        'エセンランド国家標準証明書のない、および20000mAhを超える（含まない）モバイルバッテリー、リチウム電池',
        'すべての液体は保安検査前には持ち込み禁止です（水、飲料、スープ、液体食品など）。スプレーおよびジェルは合計100mlを超えない範囲でのみ持ち込み可能です。',
        '未申告の無線通信ツール（無線ネットワーク機器、トランシーバー、ドローン、無線局などを含む）',
        'アルコールを含むパーソナルケア用品（アルコール含有量50%以上）',
      ]
    },
    {
      category: "持ち込み禁止品目 - 国際線",
      items: [
        '爆発物および花火製品（模擬爆発装置を含む）',
        '圧縮ガス、引火性液体および固体',
        '毒性または伝染性物質',
        '放射性物質',
        '腐食性物質',
        '磁性物品',
        '攻撃的な武器（銃器、大型規制刃物など）',
        '麻薬および違法薬物',
        '20000mAhを超える（含まない）モバイルバッテリー、リチウム電池',
        '大量の液体、ジェル、スプレー（各容器100ml超、合計1リットル超）'
      ]
    },
    {
      category: '機内持ち込み禁止（受託のみ） - 国内線',
      items: [
        '鈍器および作業用具',
        '小型の鋭利な物品（刃渡り6cm未満のナイフ、またはスパイクなど）',
        '圧縮ガスまたは液体物品（150mL以下、超過は持ち込み禁止）',
        'スポーツ用具'
      ]
    },
    {
      category: '機内持ち込み禁止（受託のみ） - 国際線',
      items: [
        '刃物およびハサミ（刃渡り6cm超）',
        'バット、ゴルフクラブなどのスポーツ用具',
        '工具（レンチ、ドライバーなど）',
        'リチウム電池を含む電子機器（規定容量超）',
        '高濃度アルコール飲料（アルコール度数70%超）',
        'スポーツ用具'
      ]
    },
    {
      category: '条件付き持ち込み可能品目 - 国内線',
      items: [
        '液体、ジェル、スプレー（各容器100ml以下、合計1リットル以下）',
        'ベビーフード（適量）',
        '処方薬（処方箋または医師の証明書を持参）',
        '申告済みの無線通信ツール（無線ネットワーク機器、トランシーバー、ドローン、無線局など）',
        'アルコール含有量50%未満のパーソナルケア用品'
      ]
    },
    {
      category: '条件付き持ち込み可能品目 - 国際線',
      items: [
        '液体、ジェル、スプレー（各容器100ml以下、合計1リットル以下）',
        'ベビーフード（適量）',
        '処方薬（処方箋または医師の証明書を持参）',
        '小型電子機器（携帯電話、カメラなど、リチウム電池が規定内）',
        'パーソナルケア用品（化粧品、香水など、容量が液体規定内）'
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
                  エコノミークラス
                </button>
                <button 
                  className={`py-2 px-4 font-medium text-sm ${activeCabinClass === 'business' ? 'border-b-2 border-ya-yellow-500 text-ya-yellow-700' : 'text-gray-500'}`}
                  onClick={() => setActiveCabinClass('business')}
                >
                  ビジネスクラス
                </button>
                <button 
                  className={`py-2 px-4 font-medium text-sm ${activeCabinClass === 'first' ? 'border-b-2 border-ya-yellow-500 text-ya-yellow-700' : 'text-gray-500'}`}
                  onClick={() => setActiveCabinClass('first')}
                >
                  ファーストクラス
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
                  <h3 className="text-lg font-semibold text-gray-900">機内持ち込み手荷物</h3>
                </div>
                <p className="text-gray-600">{baggageAllowance[activeCabinClass as keyof typeof baggageAllowance].cabinBaggage}</p>
                <p className="mt-2 text-sm text-gray-500">
                  機内持ち込み手荷物は、客室の収納棚または前の座席の下に収納でき、緊急通路を塞がないようにする必要があります。
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-ya-yellow-100 rounded-full mr-4">
                    <svg className="w-6 h-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">受託手荷物</h3>
                </div>
                <p className="text-gray-600">{baggageAllowance[activeCabinClass as keyof typeof baggageAllowance].checkedBaggage}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {baggageAllowance[activeCabinClass as keyof typeof baggageAllowance].extraFees}。手荷物の総サイズ（縦+横+高さ）は158cmを超えてはいけません。
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">幼児用手荷物</h3>
              <p className="text-gray-600">
                幼児運賃で旅行されるお客様は、幼児用品（ベビーカーやベビーベッドなど）を1点追加で持ち込むことができます。詳細は空港の実際の規定に準じます。
              </p>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ヒント</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>荷物にネームタグを付け、特徴を記録しておくことをお勧めします</li>
                <li>貴重品、壊れやすいもの、重要書類、医薬品は機内にお持ち込みください</li>
                <li>チェックイン時に、手荷物タグの情報が正しいことを確認してください</li>
                <li>手荷物の預け入れに十分な時間を確保するため、早めに空港に到着してください</li>
                <li>特殊手荷物がある場合は、24時間前までにカスタマーサービスにご連絡ください</li>
              </ul>
            </div>
          </div>
        )
      case 'restricted':
        return (
          <div className="mt-6">
            <p className="text-gray-600 mb-6">
              以下は手荷物制限および輸送禁止品目のリストです。出発前にご確認ください。
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
                    注意：各国の税関および保安規定は異なる場合があります。目的地国の関連規定を事前に確認することをお勧めします。持ち込み品について疑問がある場合は、事前にカスタマーサービスセンターにお問い合わせください。
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
              特殊手荷物は特別な取り扱いと追加料金が必要です。安全に輸送できるよう、少なくとも24時間前までにカスタマーサービスにご連絡ください。
            </p>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      品目タイプ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      料金基準
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
                        {item.fee === null ? '重量に基づいて計算' : `HK$${item.fee} / 個`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">特殊手荷物に関する注意事項</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>運動用具は、輸送中の損傷を防ぐために適切に梱包する必要があります</li>
                <li>楽器は頑丈なハードケースに入れ、弦を緩めて圧力を減らしてください</li>
                <li>ペットの輸送は48時間前までに申請し、関連する健康証明書と予防接種証明書を提供する必要があります</li>
                <li>重量超過手荷物（32kg超）は特別な取り扱いが必要であり、追加料金が発生する場合があります</li>
                <li>一部の路線では特定の特殊手荷物を受け入れられない場合がありますので、事前にご確認ください</li>
              </ul>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">障害者用補助器具</h3>
              <p className="text-gray-600">
                車椅子、松葉杖などの医療補助器具は無料で輸送でき、手荷物許容量には含まれません。電動車椅子は事前にバッテリータイプを申告する必要があり、特別な取り扱いが必要になる場合があります。
              </p>
            </div>
          </div>
        )
      case 'fees':
        return (
          <div className="mt-6">
            <p className="text-gray-600 mb-6">
              無料手荷物許容量を超える手荷物には追加料金が発生します。以下は各クラスの超過手荷物料金基準です。
            </p>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      超過タイプ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      エコノミークラス
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ビジネスクラス
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ファーストクラス
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
                        {item.economy === 0 ? '無料' : `HK$${item.economy}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.business === 0 ? '無料' : `HK$${item.business}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.first === 0 ? '無料' : `HK$${item.first}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">その他の料金に関する注意事項</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>会員ステータスによって超過手荷物料金が異なる場合があります</li>
                <li>オンラインで事前に超過手荷物を購入すると、空港で支払うよりも約15%お得です</li>
                <li>料金は出発地の通貨または相当額で請求されます</li>
                <li>路線によって手荷物料金基準が異なる場合があります。詳細は特定の路線でご確認ください</li>
                <li>料金基準は随時調整される場合があります。最終的な価格は予約時のものとなります</li>
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
                    ヒント：オンラインで事前に超過手荷物サービスを予約すると、費用を節約でき、空港での手続きの煩わしさを避けることができます。
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
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">手荷物規定</span>
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">手荷物規定</h1>
        <p className="mt-2 text-lg text-gray-600">機内持ち込み、受託、制限品目、超過料金などの手荷物ポリシーについて</p>
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">ご質問がありますか？</h2>
        <p className="text-gray-600 mb-6">
          手荷物規定についてご質問がある場合は、お気軽にカスタマーサービスチームにお問い合わせください。
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">メール</h3>
              <p className="text-gray-600">baggage@yellowairlines.com</p>
              <p className="text-sm text-gray-500">24時間以内に返信いたします</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">電話</h3>
              <p className="text-gray-600">+86 181 2231 7910</p>
              <p className="text-sm text-gray-500">月〜日 9:00-21:00（現地時間）</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
