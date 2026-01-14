'use client'

import Link from 'next/link'

export default function FAQPage() {
  
  const faqCategories = [
    {
      id: 'booking',
      title: '予約と支払い',
      questions: [
        {
          question: '最安値の航空券を検索するにはどうすればよいですか？',
          answer: 'Yellow Airlinesは柔軟な航空券価格検索機能を提供しています。「価格カレンダー」機能を使用して異なる日付の運賃を確認したり、メールマガジンに登録して特別運賃の通知を受け取ることができます。通常、早期予約やオフピーク時のフライトを選択することで、よりお得な価格で利用できます。'
        },
        {
          question: '予約のキャンセルや変更には手数料がかかりますか？',
          answer: '購入された運賃タイプやキャンセル/変更の時期によって異なります。エコノミークラスの基本運賃では払い戻しができない場合がありますが、手数料を支払うことで変更が可能な場合があります。フレックス運賃やビジネスクラスは通常、より柔軟な変更ポリシーを提供しています。予約時に特定の運賃規則を確認するか、カスタマーサービスにお問い合わせください。'
        },
        {
          question: '他の人のために航空券を予約できますか？',
          answer: 'はい、家族、友人、同僚のために航空券を予約できます。予約プロセス中に、各乗客の詳細情報（パスポートの氏名と完全に一致する氏名）、生年月日、連絡先情報を提供する必要があります。'
        },
        {
          question: '予約確認書はどこで確認できますか？',
          answer: '予約完了後、提供されたメールアドレスに確認メールを送信します。また、当社のウェブサイトやアプリにログインし、「マイブッキング」セクションで旅程の詳細を確認することもできます。'
        }
      ]
    },
    {
      id: 'baggage',
      title: '手荷物規定',
      questions: [
        {
          question: '航空券の種類ごとの手荷物許容量はどれくらいですか？',
          answer: '手荷物許容量は路線や運賃タイプによって異なります。一般的に、エコノミークラスの基本運賃には7kgの機内持ち込み手荷物が含まれ、エコノミークラスのフレックス運賃やビジネスクラスには通常23kgまたは32kgの受託手荷物許容量が含まれます。予約時または当社のウェブサイトの手荷物規定ページで具体的な許容量を確認できます。'
        },
        {
          question: '追加の手荷物許容量を購入するにはどうすればよいですか？',
          answer: '予約時またはアカウントにログインしてオンラインで追加の手荷物許容量を購入できます。空港で購入するよりもオンラインで事前に購入する方がお得です。カスタマーサービスに連絡して手続きを行うこともできます。'
        },
        {
          question: '特殊手荷物（スポーツ用品、楽器など）の取り扱いはどうなりますか？',
          answer: '特殊手荷物は事前の申請が必要です。ほとんどのスポーツ用品（ゴルフクラブ、スキー用具など）は標準的な受託手荷物として預けることができますが、追加料金がかかる場合があります。楽器はサイズによって機内持ち込みまたは受託手荷物となるか、追加の座席購入が必要になる場合があります。具体的なガイダンスについては、48時間前までにカスタマーサービスにお問い合わせください。'
        }
      ]
    },
    {
      id: 'checkin',
      title: '搭乗と機内サービス',
      questions: [
        {
          question: 'オンラインチェックインはいつから利用できますか？',
          answer: 'オンラインチェックインは通常、フライト出発の24時間前から開始され、出発の60分前に締め切られます。希望の座席を選択するために、早めにチェックインすることをお勧めします。'
        },
        {
          question: 'フライトに乗り遅れた場合はどうすればよいですか？',
          answer: 'フライトに乗り遅れた場合は、すぐにカスタマーサービスに連絡するか、空港のYellow Airlinesサービスカウンターにお越しください。運賃タイプや具体的な状況に応じて、次の利用可能なフライトへの変更をお手伝いしますが、変更手数料がかかる場合があります。'
        },
        {
          question: 'Yellow Airlinesではどのような特別食を提供していますか？',
          answer: 'ベジタリアン、ハラール、グルテンフリー、ラクトースフリーなど、さまざまな特別食オプションを提供しています。フライト出発の少なくとも48時間前までに、予約確認画面またはカスタマーサービスを通じて特別食をリクエストしてください。'
        },
        {
          question: '機内でWi-Fiサービスは利用できますか？',
          answer: 'はい、ほとんどのフライトで機内Wi-Fiサービスを提供しています。一部の短距離フライトでは基本的なブラウジングを無料で提供しており、長距離フライトでは通常、複数のインターネットプランを選択できます。具体的な価格と利用可能性は路線によって異なります。'
        }
      ]
    },
    {
      id: 'special',
      title: '特別サービス',
      questions: [
        {
          question: '特別な配慮が必要な乗客のために支援を手配するにはどうすればよいですか？',
          answer: '私たちはすべての乗客に快適な旅行体験を提供することに尽力しています。車椅子サービス、搭乗支援、その他の特別な支援が必要な場合は、予約時または少なくともフライト出発の48時間前までにカスタマーサービスにご連絡ください。空港スタッフが必要な乗客に全行程でサポートを提供します。'
        },
        {
          question: '妊娠中のお客様はYellow Airlinesのフライトに搭乗できますか？',
          answer: '妊娠中のお客様も通常はご搭乗いただけますが、いくつかの制限があります。妊娠28週未満のお客様は診断書は不要です。妊娠28週〜36週のお客様は医師が発行した搭乗許可証が必要です。妊娠36週以上のお客様は安全上の理由から通常、搭乗をお勧めしません。予約前に医師に相談し、カスタマーサービスにご連絡ください。'
        },
        {
          question: '子供の一人旅にはどのような手配が必要ですか？',
          answer: '5〜12歳のお子様は、「同伴者なし未成年者」サービスを利用して一人で旅行できます。このサービスは事前の予約と追加料金の支払いが必要です。当社のスタッフが空港出発から目的地で指定されたお迎えの方と合流するまで、お子様の安全を常に見守ります。12〜16歳の未成年者もこのサービスを選択できます。'
        },
        {
          question: 'ペットを連れて旅行できますか？',
          answer: '小型のペット（猫、小型犬）は、航空会社の要件を満たすペットキャリアを使用する場合、対象となるフライトで機内持ち込み手荷物として客室に持ち込むことができます。大型のペットは受託手荷物として預ける必要があります。すべてのペット輸送には事前の申請と料金の支払いが必要です。介助犬には異なる規定が適用されますのでご注意ください。詳細は事前にカスタマーサービスにお問い合わせください。'
        }
      ]
    },
    {
      id: 'rewards',
      title: '会員と特典',
      questions: [
        {
          question: 'Yellow Airlinesのマイレージプログラムに入会するにはどうすればよいですか？',
          answer: '当社のウェブサイトまたはアプリでYellow Airlinesの「Yellow Miles」会員に無料で登録できます。登録プロセスは簡単で、基本的な個人情報と連絡先情報を提供するだけです。会員になると、フライトごとにマイルが貯まり、無料航空券やその他の特典と交換できます。'
        },
        {
          question: 'マイルの有効期限はどれくらいですか？',
          answer: '標準会員のマイル有効期限は2年です。シルバー会員のマイル有効期限は3年で、ゴールドおよびプラチナ会員のマイルには有効期限がありません。アカウントのアクティビティ（フライトまたは交換）があるたびに、マイルの有効期限はリセットされます。'
        },
        {
          question: 'マイル残高を確認するにはどうすればよいですか？',
          answer: 'ウェブサイトまたはアプリにログインし、会員センターでマイル残高、アクティビティ履歴、有効期限が近いマイルを確認できます。また、フライト後に届くメールでも最新のマイル情報を確認できます。'
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
            <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
              ホーム
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-900 font-medium">よくある質問</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">よくある質問</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Yellow Airlinesのサービスに関する質問への回答を見つける
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 側邊類別選單 */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 sticky top-20">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">質問カテゴリー</h2>
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
              <h3 className="font-medium text-ya-yellow-800 mb-2">さらにサポートが必要ですか？</h3>
              <p className="text-sm text-gray-600 mb-4">
                必要な回答が見つからない場合は、カスタマーサービスチームにお問い合わせください。
              </p>
              <a
                href="mailto:support@yellowairlines.com"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700"
              >
                お問い合わせ
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
        <h2 className="text-2xl font-semibold mb-4">まだ質問がありますか？</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          カスタマーサービスチームがいつでもお手伝いします。以下の方法でお問い合わせください。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg">
            <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-1">メール</h3>
            <a href="mailto:support@yellowairlines.com" className="text-ya-yellow-600 hover:underline">
              support@yellowairlines.com
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-1">カスタマーサービス電話</h3>
            <a href="tel:+8618122317910" className="text-ya-yellow-600 hover:underline">
              +86 181 2231 7910
            </a>
            <p className="text-sm text-gray-500 mt-1">月〜日 9:00-21:00</p>
          </div>
        </div>
      </div>
    </main>
  )
}
