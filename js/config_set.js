var configSet = new ConfigSet();

function ConfigSet(){

	/*！！！！ URLはindex_url + "インデックスからの相対パス"と記述してください ！！！！*/
	/*　index_url:インデックスページのパス(プログラムにより取得)  */

	/*サイトロゴを文字で表示する場合は文字を入れてください（初期状態では最大6文字。CSSで調整可）*/
	this.siteTitleText= "";

	/*サイト上部の説明の有無を設定(表示内容　ない場合は""と表記)*/
	this.topExplainText = "サイト説明";

	/*titleタグの中(統一)を設定*/
	this.titleText = "タグの中の文章";

	/*メニューに表示するリンクを設定("表示名", ページURL，ターゲット,第2レベルの配列)*/
	this.menu = [
					["Top", index_url + "contents/index.html"],
					["Info", index_url + "contents/info/index.html"],
					["Novel", index_url + "contents/novel/index.html",,//ターゲットの部分をちゃんと用意する
						[
							["ジャンル1",index_url + "contents/novel/genre1/index.html"],
							["ジャンル2",index_url + "contents/novel/genre2/index.html"],
							["短編1", index_url + "contents/novel/short1/index.html"],
						]
					],
					["Pict", index_url + "contents/pict/index.html",,
						[
							["ジャンル1", index_url + "contents/pict/genre1/index.html"],
						]
					],
					["Link", index_url + "contents/link/index.html"],
					["Blog","#","_blank"],
				];

	/*メールアイコンの設定(表示するかどうかtrue false,ページURL,ターゲット)*/
	this.mailIcon = [true, "#","_blank"];

	/*ナイトモードの有無の設定(元々黒基調のサイトなら不要．試運転状態なので挙動は保証できません)*/
	this.nightModeIcon = true;

	/*自分で設置するアイコンの設定(表示するかどうか,アイコン画像パス,リンク先パス(関数名等でも可),ターゲット)*/
	this.myIcons = [
					[true, index_url + "img/clapicon.png", "#","_blank"],
					[true, index_url + "img/Twitter_Logo.png", "#","_blank"],
					[false,,]
				];

	/*トップ絵の設定(全てのページに表示する場合true,[表示するページurlのリスト],画像URL)*/
	this.viewTopImage = [false,
						[index_url +  "contents/index.html",],
						index_url +  "img/topimage.png"
					];

	/*パス(url)→パンくずリストの変換設定("パスの文字列(フォルダ名)","表示名")*/
	this.breadName = [
					["contents", "Top"],
					["pict", "Pict"],
					["novel", "Novel"],
					["link", "Link"],
					["info", "Info"],
					["genre1", "ジャンル1"],
					["genre2", "ジャンル2"],
					["short1", "短編"],
				];

	/*次へ・前へ・メニューへの文字設定*/
	this.movePrev = "前";
	this.moveNext = "次";
	this.moveMenu = "戻る";

	/*フッターリンクの設定*///4つくらいまで。プライバシーポリシーやサイトマップ、著作権についてなど
	this.footerLink = [
		["サイトマップ",index_url + ""],
		["プライバシーポリシー",index_url + ""],
	];

	/*コピーライトの設定*/
	this.copyright = "&copy;管理人名 2019";
}

