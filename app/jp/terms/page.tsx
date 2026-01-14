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
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">利用規約</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">イエローエアライン（Yellow Airlines）利用規約</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                イエローエアラインのサービスを利用することで、以下の規約に同意し、承諾したものとみなされます。よくお読みください。
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">最終更新日：2024年10月27日</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. 規約の受諾</h2>
            <p className="text-gray-600 mt-2">1.1 イエローエアラインの公式ウェブサイト（www.yellowairlines.com）またはモバイルアプリ（以下総称して「プラットフォーム」）を使用することにより、お客様は本利用規約（以下「本規約」）を遵守することに同意するものとします。</p>
            <p className="text-gray-600 mt-2">1.2 本規約に同意しない場合は、本プラットフォームの使用を直ちに中止してください。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. サービスの説明</h2>
            <p className="text-gray-600 mt-2">2.1 イエローエアラインは、プラットフォームを通じてフライト検索、予約、支払い、オンラインチェックイン、および関連する旅行サービス（以下「本サービス」）を提供します。</p>
            <p className="text-gray-600 mt-2">2.2 フライト時間、運賃、および座席の空き状況は随時変更される可能性があり、最終的には発券時の確認内容に準拠します。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. アカウントと予約</h2>
            <p className="text-gray-600 mt-2">3.1 予約を完了するには、真実かつ正確な個人情報を提供する必要があります。情報の誤りにより生じた損失については、ユーザーが単独で責任を負うものとします。</p>
            <p className="text-gray-600 mt-2">3.2 アカウントのパスワードを適切に保管する責任はお客様にあり、不正使用によって生じた損失について、イエローエアラインは責任を負いません。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. 運賃と支払い</h2>
            <p className="text-gray-600 mt-2">4.1 運賃は、為替レート、税金、またはプロモーション活動により調整される場合があり、最終価格は支払いページに表示されるものとします。</p>
            <p className="text-gray-600 mt-2">4.2 支払い完了後にフライトがキャンセルされた場合、お客様は払い戻しまたは変更（運賃規則に従って）を選択できます。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. 変更および払い戻しポリシー</h2>
            <p className="text-gray-600 mt-2">5.1 エコノミークラス/ビジネスクラス/ファーストクラスの変更および払い戻し条件は予約時に明記されており、一部の特別運賃は変更または払い戻しができません。</p>
            <p className="text-gray-600 mt-2">5.2 払い戻しは7〜15営業日以内に処理されますが、実際の着金時間は銀行または決済機関によって異なります。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. 手荷物ポリシー</h2>
            <p className="text-gray-600 mt-2">6.1 無料受託手荷物許容量はクラスや路線によって異なります。詳細は「<Link href="/jp/baggage" className="text-ya-yellow-600 hover:text-ya-yellow-700">手荷物規定</Link>」をご参照ください。</p>
            <p className="text-gray-600 mt-2">6.2 超過手荷物は追加料金が必要であり、料金基準は空港カウンターで公表されているものとします。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. 責任の制限</h2>
            <p className="text-gray-600 mt-2">7.1 不可抗力（天候、ストライキ、戦争など）によるフライトの遅延またはキャンセルについて、イエローエアラインは賠償責任を負いませんが、乗客の変更または払い戻しの手配を支援します。</p>
            <p className="text-gray-600 mt-2">7.2 第三者が提供するサービス（ホテル、レンタカーなど）の品質問題について、イエローエアラインはいかなる責任も負いません。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. プライバシーポリシー</h2>
            <p className="text-gray-600 mt-2">8.1 お客様の個人情報は、予約、搭乗、および法的要件を満たす目的でのみ使用されます。詳細は「<Link href="/jp/privacy" className="text-ya-yellow-600 hover:text-ya-yellow-700">プライバシーポリシー</Link>」をご参照ください。</p>
            <p className="text-gray-600 mt-2">8.2 ユーザー体験を向上させるためにCookieを使用する場合がありますが、ブラウザの設定で無効にすることを選択できます。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. 知的財産権</h2>
            <p className="text-gray-600 mt-2">9.1 プラットフォーム上のすべてのコンテンツ（商標、フライト情報、インターフェースデザインなどを含む）はイエローエアラインが所有しており、許可なく複製、スクレイピング、または商業目的で使用することはできません。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. 規約の変更とアカウントの終了</h2>
            <p className="text-gray-600 mt-2">10.1 イエローエアラインは本規約を更新する権利を有し、変更後はプラットフォーム上の通知またはメールでユーザーに通知します。</p>
            <p className="text-gray-600 mt-2">10.2 ユーザーが本規約に違反した場合、当社はアカウントを一時停止または終了する権利を有します。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. 準拠法</h2>
            <p className="text-gray-600 mt-2">11.1 本規約はエセンランド人民共和国の法律に準拠し、紛争はまず友好的な協議によって解決し、協議が整わない場合はエセンランド人民共和国の裁判所に提出するものとします。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">12. 免責事項</h2>
            <p className="text-gray-600 mt-2 font-medium text-red-600">本ウェブサイトのすべての情報は架空の内容であり、教育および展示目的でのみ使用されます。これはデモサイトであり、実際の航空会社ではありません。</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">お問い合わせ</h2>
            <p className="text-gray-600">ご質問がある場合は、イエローエアラインカスタマーサービスまでお問い合わせください：</p>
            <p className="text-gray-600 mt-2">メール：support@yellowairlines.com</p>
            <p className="text-gray-600">電話：+86 181 2231 7910</p>
          </div>
        </div>
      </div>
    </div>
  )
}
