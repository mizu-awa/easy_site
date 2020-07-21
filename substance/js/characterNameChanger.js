var characterNameChanger = new CharacterNameChanger();
function CharacterNameChanger(){
	
	/*---------------------------------ユーザ設定--------------------------------------*/
	/*cookieの有効期限(日数)*/
	var max_age_date = 365;

	/*変換対象文字列(デフォルト名) 指定しない(nullにした)場合は名前1,名前2...になります*/
	var defaultNames = ["明寺","菜真絵"];

	/*変換したい要素のid名を文字列で*/
	var nameChangeTarget = "novel_text";
	/*-----------------------------ユーザ設定ここまで----------------------------------*/

	/*cookieの範囲を入力.その他オプション書き込み可"*/
	var cookieOption = "path=/";//ここ1回設定したらそれ以降変えちゃダメ。ゼッタイ

	
	/*名前登録*/
	this.addCharacterName = function(){
		/*cookieが使用可能かチェック*/
		if(navigator.cookieEnabled === false){
			alert("cookieを有効にしてください");
			return;
		}

		/*名前入力ボックスを取得*/
		var nameInputs = document.getElementById("character_name_changer").getElementsByClassName("name_box");
		/*ボックスの数を取得*/
		var namesLength = nameInputs.length;
		if(namesLength === 0){
			alert("名前入力ボックスがありません");
			return 0;
		}

		/*名前の集まりを1つの文字列に*/
		var namesList = "";//最終的にcookieに保存する値
		var namesArray = new Array(namesLength);
		for(var i=0; i < (namesLength-1); i++){
			namesList =  namesList + nameInputs[i].value + "+";
			namesArray[i] = nameInputs[i].value;
		}
		namesList =  namesList + nameInputs[namesLength-1].value;
		namesArray[namesLength-1] = nameInputs[namesLength-1].value;

		/*cookieに保存*/
		document.cookie = "characterNameChanger=; max-age=0;" + cookieOption;//一度削除しておく

		document.cookie = "characterNameChanger=" + encodeURIComponent(namesList) + "; max-age=" + (max_age_date * 86400) + ";" + cookieOption;
		characterNameChanger.changeName(namesArray);//変換

	}

	/*名前変換ボックスを作る*/
	this.makeCharacterNameBox = function(num){
		/*外側を作成*/
		var newDiv = document.createElement("div");
		newDiv.id = "character_name_changer";

		/*入力欄を作成*/
		var newBoxes = new Array(num);
		for(var i=0; i < num; i++){
			newBoxes[i] = document.createElement("input");
			newBoxes[i].type = "text";
			newBoxes[i].className="name_box";
			newDiv.appendChild(newBoxes[i]);
			newDiv.innerHTML += "<br>";
		}

		/*ボタンを作成*/
		var newInputButton = document.createElement("input");
		newInputButton.type = "button";
		newInputButton.value = "登録";
		newInputButton.onclick = function(){characterNameChanger.addCharacterName();newDiv.style.display = "none";};
		newDiv.appendChild(newInputButton);
		newDiv.style.display="none";

		var newChangeButton = document.createElement("a");
		newChangeButton.innerText="名前変更";
		newChangeButton.id="name_change_button";
		newChangeButton.onclick = function(){
			if(newDiv.style.display === "none"){
				newDiv.style.display = "block";
			}
			else{
				newDiv.style.display = "none";
			}
		};

		document.getElementById(nameChangeTarget).parentNode.insertBefore(newChangeButton, document.getElementById(nameChangeTarget));
		document.getElementById(nameChangeTarget).parentNode.insertBefore(newDiv, document.getElementById(nameChangeTarget));
		
	}

	/*ロード時の処理*/
	window.addEventListener("load", function(){

			/*変換対象の要素がない場合*/
			if(document.getElementById(nameChangeTarget) === null){
				return 0;//終了
			}

			/*cookieが使用可能かチェック*/
			if(navigator.cookieEnabled === false){
				alert("cookieが無効です");
				return;
			}

			/*保存してあるクッキー一覧を取得*/
			var cookies = document.cookie.split(";");	//cookie全体
			var cookieLength = cookies.length;			//cookieのキーの数

			var names = [];//変換後の名前一覧


			/*characterNameChangerを探し,名前一覧を取得する*/
			for(var i=0; i < cookieLength; i++){
				var cookie = cookies[i].split("=");
				if(cookie[0] === "characterNameChanger" || cookie[0] === " characterNameChanger"){
					names = decodeURIComponent(cookie[1]).split("+");
					break;//ループから抜け出す
				}
			}

			/*名前変換フォーム作成についての処理*/
			var nameInputs;
			try{
				nameInputs = document.getElementById("character_name_changer").getElementsByClassName("name_box");
			}
			catch(error){
				nameInputs = null;
			}

			if(nameInputs === null){//ボックスを作る
				var maxLength = 0;
				if(names.length > defaultNames.length){
					maxLength = names.length;
				}
				else{
					maxLength = defaultNames.length;
				}
				
				characterNameChanger.makeCharacterNameBox(maxLength);
				nameInputs = document.getElementById("character_name_changer").getElementsByClassName("name_box");
			}

			/*名前変換フォームの中身の書き換えとデフォルト名＆変換後名の確定*/
			var nameBoxLength = nameInputs.length;
			for(var i=0; i < nameBoxLength; i++){
				var defaultName;
				if(i < names.length){
					defaultName = names[i];
				}
				else if((defaultNames === null) ||(typeof defaultNames === "undefined") ||(typeof defaultNames[i] === "undefined") || (defaultNames[i] === null)){
					//デフォルト名が設定されていなかった
					defaultName = "名前" + (i+1);
					defaultNames[i] = defaultName;
					names.push(defaultName);
				}
				else{
					//デフォルト名が設定されていた
					defaultName = defaultNames[i];
					names.push(defaultName);
				}
				/*名前ボックスに名前を入れる*/
				nameInputs[i].value = defaultName;
			}

			/*本文をテキストファイルから取得する際の待ち*///該当要素の中に中身があるかどうかのチェック
			var timeCount = 0;
			var id = setInterval(function(){
				timeCount++;
				if(document.getElementById(nameChangeTarget).innerText.length > 1){
					characterNameChanger.changeText();
					clearInterval(id);
				}
				else if(timeCount > 20){//タイムアウト(とりあえず2秒)
					clearInterval(id);
					return 0;//終了
				}
			},100);

			/*変換用のテキストになるまでの待ち*/
			var changedDiv;
			changedDiv = document.getElementById(nameChangeTarget);

			var timeCount2 = 0;
			var id2 = setInterval(function(){
				timeCount2++;
				if(changedDiv.dataset.nameChanged === "true"){
					characterNameChanger.changeName(names);
					document.getElementById("name_change_button").style.display = "block";
					clearInterval(id2);
				}
				else if(timeCount2 > 20){//タイムアウト(とりあえず2秒)
					clearInterval(id2);
					return 0;//終了
				}
			},100);
			
			return;
		}
	)

	/*名前を変換する関数*/
	this.changeName = function(names){
		for(var i=0; i < names.length; i++){
			var nameAreas;
			var nameAreasLength;

			try{
				nameAreas = document.getElementsByClassName("changed_name_" + i);
				nameAreasLength = nameAreas.length;
			}
			catch(error){
				nameAreasLength = 0;
			}
			
			for(var j=0; j < nameAreasLength; j++){
				nameAreas[j].innerText = names[i];
			}
		}

	}

	/*テキストを名前変換用に変更する関数*/
	this.changeText = function(){
		/*変換対象の文字列を取得*/
			var exchangedName;
			exchangedName = document.getElementById(nameChangeTarget).innerHTML;

			/*デフォルト名の数を取得*/
			var defaultNamesLength = defaultNames.length;
			/*テキストを変換していく*/
			for(var i=0; i < defaultNamesLength; i++){
				exchangedName = exchangedName.split(defaultNames[i]).join("<span class=\"changed_name_" + i + "\"></span>");//変換
			}


			/*変換した文字列を戻す*/
			if(nameChangeTarget === null){
				document.body.innerHTML = exchangedName;
				document.body.innerHTML.dataset.nameChanged = "true";
			}
			else{
				document.getElementById(nameChangeTarget).innerHTML = exchangedName;
				document.getElementById(nameChangeTarget).dataset.nameChanged = "true";
			}
	}

}