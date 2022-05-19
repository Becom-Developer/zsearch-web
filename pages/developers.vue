<template>
  <b-container class="mb-5">
    <div class="my-3">
      <b-card header="webapiアクセスについて" header-tag="header" title="">
        <b-card-text>
          現在試験運用につきアクセス課金やログインなど不要でwebapiを開放しています。
          アクセス方法は下記を参考ください。
        </b-card-text>
      </b-card>
    </div>
    <div class="my-3">
      <b-card
        header="curlコマンドを使ったアクセス"
        header-tag="header"
        title=""
      >
        <b-card-text>
          事前にお手元のPCでcurlコマンドを利用できるようにしてコンソール画面から
          下記のコマンドを実行してみてください。
        </b-card-text>
        <pre class="bg-dark text-white p-3">
curl 'https://zsearch-api.becom.co.jp/' \
--verbose \
--header 'Content-Type: application/json' \
--header 'accept: application/json' \
--data-binary '{"resource":"search","method":"like","apikey":"becom","params":{"zipcode":"8120041"}}'
        </pre>
        <b-card-text>
          下記のようなレスポンスが返却されれば正常です。（みやすくするために整形していますが本来は一行で返却されます。）
        </b-card-text>
        <pre class="bg-dark text-white p-3">
{
  version: '2022-04-28',
  message: '検索件数: 1',
  count: 1,
  data: [
    {
      id: 112419,
      local_code: '40132',
      zipcode_old: '812  ',
      zipcode: '8120041',
      pref_kana: 'フクオカケン',
      city_kana: 'フクオカシハカタク',
      town_kana: 'ヨシヅカ',
      pref: '福岡県',
      city: '福岡市博多区',
      town: '吉塚',
      double_zipcode: '0',
      town_display: '0',
      city_block_display: '1',
      double_town: '0',
      update_zipcode: '0',
      update_reason: '0',
      version: '2022-04-28',
      deleted: 0,
      modified_ts: '2022-05-18 12:40:01',
      created_ts: '2022-05-18 12:40:01',
    },
  ],
}
        </pre>
      </b-card>
    </div>

    <div class="my-3">
      <b-card header="リクエストパラメーターについて" header-tag="header" title="">
        <b-card-text>
          下記の場合は郵便番号のみの検索です。
        </b-card-text>
        <pre class="bg-dark text-white p-3">"params":{"zipcode":"8120041"}</pre>
        <b-card-text>「福岡県」という言葉で検索の場合</b-card-text>
        <pre class="bg-dark text-white p-3">"params":{"pref":"福岡県"}</pre>
        <b-card-text>ものすごい量のレスポンスがありますがおそらく下記のような内容だと思います。</b-card-text>
        <pre class="bg-dark text-white p-3">{"version":"2022-04-28","count":3303,"message":"検索件数: 3303","data":[{...}]}</pre>
        <b-card-text>今のところ検索条件は「郵便番号」、「都道府県」、「市町村」、「以下の住所」が使えます、下記がその一例です。</b-card-text>
        <pre class="bg-dark text-white p-3">"params":{"zipcode":"812","pref":"福岡","city":"福岡","town":"吉"}</pre>
        <b-card-text>上記の条件で検索すると下記のようなレスポンスが返ってくると思います。二件返ってきました。</b-card-text>
        <pre class="bg-dark text-white p-3">{"message":"検索件数: 2","count":2,"version":"2022-04-28","data":[{...}]}</pre>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
