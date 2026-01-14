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
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">法的通知</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yellow Airlines 法的通知</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                本ウェブサイトを利用する際の権利と責任について、この法的通知をよくお読みください。
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">最終更新日：2025年10月27日</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. 情報とデータ</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlinesのウェブサイト（以下「本サイト」）およびそのすべてのコンテンツはYellow Airlinesが所有し、エセンランド人民共和国の著作権法、商標法、およびその他の知的財産権法によって保護されています。Yellow Airlinesの書面による許可なしに、いかなる組織または個人も、本サイトのいかなる部分も使用、複製、変更、送信、展示、または配布することはできません。
            </p>
            <p className="text-gray-600 mt-2">
              本サイトで提供される情報は参照用です。正確性を確保するよう努めますが、情報の正確性、完全性、適時性を保証するものではありません。Yellow Airlinesは、予告なしにサイトのコンテンツおよび製品情報を変更する権利を留保します。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. 免責事項</h2>
            <p className="text-gray-600 mt-2">
              法律で認められる最大限の範囲で、Yellow Airlinesは、本サイトの使用または使用不能に起因する直接的、間接的、付随的、特殊的、派生的、または懲罰的な損害（利益の損失、データの損失、または業務の中断を含みますがこれらに限定されません）について責任を負いません。
            </p>
            <p className="text-gray-600 mt-2">
              不可抗力（自然災害、政府の行為、ストライキ、戦争、伝染病などを含みますがこれらに限定されません）またはYellow Airlinesに起因しないその他の理由による遅延、キャンセル、手荷物の紛失、またはその他の損失について、Yellow Airlinesは責任を負いません。
            </p>
            <p className="text-gray-600 mt-2">
              本サイトを使用してフライトを予約したりサービスを購入したりする場合は、関連する利用規約をよく読み、同意する必要があります。Yellow Airlinesは、ユーザーが利用規約に違反したことにより生じた損失について責任を負いません。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. 第三者リンク</h2>
            <p className="text-gray-600 mt-2">
              本サイトには、ユーザーの便宜のために第三者のウェブサイトへのリンクが含まれている場合があります。Yellow Airlinesは、第三者のウェブサイトのコンテンツ、正確性、または可用性について責任を負わず、それらのサイトへのアクセスまたは使用によって生じたいかなる損失についても責任を負いません。
            </p>
            <p className="text-gray-600 mt-2">
              第三者のウェブサイトへのアクセスはご自身の選択であり、リスクはご自身で負うものとします。第三者のウェブサイトの利用規約およびプライバシーポリシーを確認することをお勧めします。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. 知的財産権</h2>
            <p className="text-gray-600 mt-2">
              本サイトのすべてのコンテンツ（テキスト、画像、ロゴ、音声、ビデオ、ソフトウェア、コード、およびそれらの組み合わせを含みますがこれらに限定されません）は、エセンランド人民共和国の著作権法および国際著作権法によって保護されています。Yellow Airlinesの明確な書面による許可なしに、いかなる形式または手段によっても、これらのコンテンツを複製、変更、送信、展示、または使用することはできません。
            </p>
            <p className="text-gray-600 mt-2">
              「Yellow Airlines」および関連するロゴはYellow Airlinesの商標または登録商標であり、エセンランド人民共和国の商標法および国際商標法によって保護されています。Yellow Airlinesの書面による許可なしに、いかなる組織または個人もこれらの商標を使用することはできません。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. 個人情報保護</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlinesはお客様の個人情報保護を重視しています。「個人データ（プライバシー）条例」およびその他の関連法規、ならびに当社の「<Link href="/jp/privacy" className="text-ya-yellow-600 hover:text-ya-yellow-700">プライバシーポリシー</Link>」に従って、お客様の個人情報を収集、使用、保存、保護します。本サイトを使用する前に、当社の「プライバシーポリシー」をよくお読みください。
            </p>
            <p className="text-gray-600 mt-2">
              当社の個人情報の取り扱いについてご質問がある場合は、本通知の下部にある連絡先までお問い合わせください。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. ユーザー行動規範</h2>
            <p className="text-gray-600 mt-2">
              本サイトを使用する際は、中華人民共和国香港特別行政区の法律およびその他の関連法規を遵守し、インターネットの倫理を尊重する必要があります。以下を含むがこれらに限定されない違法行為に本サイトを使用することはできません：
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
              <li>国の法律や規制に違反する情報の投稿、送信、または保存</li>
              <li>他人の知的財産権、企業秘密、またはその他の合法的権利の侵害</li>
              <li>ウェブサイトの正常な運営の妨害、ウェブサーバーへの不正アクセス</li>
              <li>コンピュータウイルスまたはその他の破壊的なプログラムの意図的な拡散</li>
              <li>他人または組織になりすまして虚偽の活動を行うこと</li>
            </ul>
            <p className="text-gray-600 mt-2">
              上記の規定に違反する行為が発見された場合、Yellow Airlinesは直ちにサービスの提供を停止する権利を有し、法的責任を追及する権利を留保します。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. 適用法および紛争解決</h2>
            <p className="text-gray-600 mt-2">
              本法的通知の解釈、有効性、および紛争解決には、中華人民共和国香港特別行政区の法律が適用されます。
            </p>
            <p className="text-gray-600 mt-2">
              本サイトの使用に起因または関連する紛争については、双方が友好的に協議して解決するものとします。協議が整わない場合、いずれかの当事者はYellow Airlinesの所在地を管轄する裁判所に訴訟を提起することができます。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. 情報セキュリティ</h2>
            <p className="text-gray-600 mt-2">
              当社は、お客様の個人情報の安全を保護するために業界標準の措置を講じています。ただし、インターネット送信は絶対的な安全を保証するものではなく、本サイトを通じて送信される情報の安全性を保証することはできません。
            </p>
            <p className="text-gray-600 mt-2">
              本サイトを使用し、情報を送信するリスクはご自身で負うものとします。ウェブサイトを使用する際は、個人情報を保護するために適切な予防措置を講じることをお勧めします。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. 通知の変更</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlinesは、本法的通知を随時変更する権利を留保します。変更後の法的通知は、本サイトに掲載された時点で効力を生じ、本サイトの使用を継続することは、変更後の法的通知に同意したものとみなされます。
            </p>
            <p className="text-gray-600 mt-2">
              変更を確認するために、本法的通知を定期的に確認することをお勧めします。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. 著作権表示</h2>
            <p className="text-gray-600 mt-2">
              本サイトのすべてのコンテンツの著作権はYellow Airlinesまたはそのコンテンツ提供者に帰属し、エセンランド人民共和国の著作権法および国際著作権条約によって保護されています。
            </p>
            <p className="text-gray-600 mt-2">
              Yellow Airlinesの事前の書面による許可なしに、複製、変更、送信、展示、出版、販売、ライセンス供与、または派生作品の作成を含むがこれらに限定されない、いかなる形式でも本サイトのコンテンツを使用することはできません。
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. 企業資格</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlinesは、エセンランド人民共和国の「会社法」に基づいて設立された企業であり、法的な商業登録および航空運航資格を有しています。会社登録番号：MYHKC-69128
            </p>
            <p className="text-gray-600 mt-2 font-medium text-red-600">
              注：本ウェブサイトは教育用のサンプルであり、実際の航空会社のウェブサイトではありません。すべての内容は架空のものであり、展示目的でのみ使用されます。
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">お問い合わせ</h2>
            <p className="text-gray-600">
              本法的通知についてご質問がある場合、または当社への連絡が必要な場合は、以下の方法でお問い合わせください。
            </p>
            <p className="text-gray-600 mt-2">
              会社名：Yellow Airlines Co., Ltd.
            </p>
            <p className="text-gray-600">
              メール：legal@yellowairlines.com
            </p>
            <p className="text-gray-600">
              電話：+86 181 2231 7910（平日 9:00-18:00）
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
