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
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">プライバシーポリシー</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">イエローエアライン（Yellow Airlines）プライバシーポリシー</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                本ポリシーは、お客様が当社のウェブサイト、モバイルアプリ、またはサービスを利用する際に、当社がどのようにお客様の個人データを収集、使用、開示、および保護するかについて説明するものです。
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">最終更新日：2024年10月27日</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. はじめに</h2>
            <p className="text-gray-600 mt-2">イエローエアライン（Yellow Airlines）のプライバシーポリシーへようこそ。当社は個人情報の重要性を深く理解し、お客様のプライバシー保護に尽力しています。本ポリシーは、お客様が当社のウェブサイト、モバイルアプリ、またはサービスを利用する際に、当社がどのようにお客様の個人データを収集、使用、開示、および保護するかについて説明するものです。</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. 収集する情報</h2>
            <div className="pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mt-4">2.1 お客様から提供される情報</h3>
              <p className="text-gray-600 mt-2">予約情報：氏名、連絡先、生年月日、パスポート/身分証明書番号、支払い情報</p>
              <p className="text-gray-600">アカウント情報：ユーザー名、パスワード、プロフィール情報</p>
              <p className="text-gray-600">設定情報：座席の好み、食事の選択、マイレージ情報</p>
              <p className="text-gray-600">通信情報：カスタマーサービスチームとのやり取りの記録</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">2.2 自動的に収集される情報</h3>
              <p className="text-gray-600 mt-2">デバイス情報：IPアドレス、ブラウザの種類、オペレーティングシステム</p>
              <p className="text-gray-600">使用データ：閲覧したページ、クリックしたリンク、検索履歴</p>
              <p className="text-gray-600">位置情報：モバイルアプリを使用する場合（お客様の同意が必要です）</p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">2.3 第三者から取得する情報</h3>
              <p className="text-gray-600 mt-2">旅行代理店またはパートナーから提供される予約情報</p>
              <p className="text-gray-600">ソーシャルメディアプラットフォーム（これらのプラットフォーム経由でログインする場合）</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. 情報の利用目的</h2>
            <p className="text-gray-600 mt-2">当社は、以下の法的根拠に基づいてのみお客様の個人データを使用します。</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>契約の履行：予約の処理および要求されたサービスの提供</li>
              <li>法的義務の遵守：航空安全、税関、および入国要件の遵守</li>
              <li>正当な利益：サービスの改善、詐欺の防止</li>
              <li>同意に基づく場合：マーケティング目的（同意はいつでも撤回可能）</li>
            </ul>
            <p className="text-gray-600 mt-2">具体的な用途は以下の通りです。</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>フライト予約の完了および管理</li>
              <li>カスタマーサポートおよびサービスの提供</li>
              <li>ウェブサイトおよびサービスの改善</li>
              <li>重要な通知（フライト変更など）の送信</li>
              <li>市場調査および分析の実施</li>
              <li>詐欺行為の防止および検出</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. 情報の共有と開示</h2>
            <p className="text-gray-600 mt-2">当社は、以下の場合にのみお客様のデータを共有します。</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>サービスプロバイダー：支払い処理、ITサービス、カスタマーサポートなど</li>
              <li>提携航空会社：コードシェア便、乗り継ぎサービスなど</li>
              <li>政府機関：法的要件に基づく場合（税関や入国管理局など）</li>
              <li>事業譲渡：合併、買収、または資産売却の場合</li>
            </ul>
            <p className="text-gray-600 mt-2">当社は、マーケティング目的でお客様の個人データを第三者に販売することはありません。</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. データの保持</h2>
            <p className="text-gray-600 mt-2">当社は、本ポリシーに記載された目的を達成するために必要な期間、または法律で義務付けられている期間、お客様の個人データを保持します。例：</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>予約記録：7年間（税務および法的な理由による）</li>
              <li>ウェブサイト使用データ：2年間</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. お客様の権利</h2>
            <p className="text-gray-600 mt-2">適用される法律に基づき、お客様は以下の権利を有する場合があります。</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>当社が保有するお客様の個人データへのアクセス</li>
              <li>不正確または不完全なデータの訂正</li>
              <li>特定の状況下でのデータの削除要求</li>
              <li>データの処理に対する制限または異議申し立て</li>
              <li>データのポータブルな形式での取得要求</li>
              <li>同意の撤回（撤回前の適法な処理には影響しません）</li>
            </ul>
            <p className="text-gray-600 mt-2">上記の権利を行使する場合は、当社のデータ保護責任者までご連絡ください：privacy@yellowairlines.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. 国境を越えたデータ転送</h2>
            <p className="text-gray-600 mt-2">航空業界のグローバルな性質上、お客様のデータはお客様の居住国以外のサーバーに転送される場合があります。これらの地域のデータ保護法は異なる場合がありますが、当社はお客様の個人データを保護するための適切な措置を講じます。</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. セキュリティ対策</h2>
            <p className="text-gray-600 mt-2">当社は、お客様のデータの安全を確保するために適切な技術的および管理的措置を講じています。</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>機密データの暗号化</li>
              <li>定期的なセキュリティ監査</li>
              <li>従業員へのプライバシー教育</li>
              <li>アクセス権限の管理</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. Cookieおよび追跡技術</h2>
            <p className="text-gray-600 mt-2">当社は、Cookieおよび類似の技術を使用して以下のことを行います。</p>
            <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
              <li>お客様の設定の記憶</li>
              <li>ウェブサイトの使用状況の分析</li>
              <li>パーソナライズされたコンテンツの提供</li>
            </ul>
            <p className="text-gray-600 mt-2">ブラウザの設定を通じてCookieの設定を管理できます。</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. 子供のプライバシー</h2>
            <p className="text-gray-600 mt-2">当社のサービスは16歳未満の子供を対象としていません。誤って子供のデータを収集した場合は、速やかに削除します。</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. ポリシーの変更</h2>
            <p className="text-gray-600 mt-2">当社は、本プライバシーポリシーを随時更新する場合があります。重大な変更がある場合は、メールまたはウェブサイトの通知を通じてお知らせします。</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">お問い合わせ</h2>
            <p className="text-gray-600">本ポリシーに関するご質問、またはデータの権利を行使したい場合は、以下までご連絡ください。</p>
            <p className="text-gray-600 mt-2">イエローエアライン データ保護責任者</p>
            <p className="text-gray-600">メール：privacy@yellowairlines.com</p>
            <p className="text-gray-600">電話：+86 181 2231 7910</p>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 border-l-4 border-gray-400">
            <p className="text-sm text-gray-600 font-medium">
              注：本ウェブサイトは教育用のサンプルであり、実際の航空会社のウェブサイトではありません。すべての内容は架空のものであり、展示目的でのみ使用されます。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
