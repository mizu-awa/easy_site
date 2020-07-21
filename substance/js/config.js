/*読み込み時の処理を追加*/
window.addEventListener("load", function(){

	document.title = configSet.titleText;
	setSiteTitleText();
	makeExplainText();
	makeMenu();
	makeIconSet();
	makeTopImage();
	makeBread();
	document.getElementById("site_title_logo").href = (index_url + "index.html");

	if(Cookies.get("nightMode") === "true"){
		nightMode.changeMode();
	}

	readSiteHistory(document.getElementById("site_history"));
	readImage(document.getElementById("auto_images"));
	readTable(document.getElementsByClassName("auto_tables"));

	setFooterLink(document.getElementById("foot_link"));

	makeMainMenu();
	makeParaMenu();
	makeMainImageMenu();
	makeMainImageTextMenu();

	readNovelText(document.getElementById("novel_text"));/*！！characterNameChangerと合わせる必要あり！!*/

	/*全てが終了してから表示*/
	document.getElementById("all").style.visibility = "visible";
},false)

/*メディアクエリの基準を設定*/
const mq = window.matchMedia("(max-width:480px)");

/*ルートのURLを取得*/
var index_url = (
    document.currentScript
        ? document.currentScript.src
        : document.getElementsByTagName("script")[document.getElementsByTagName("script").length-1].src
    )
    .replace(new RegExp("^"+location.origin), "")
    .replace(/[^\/]+$/, "")
	.replace(/js\//,"");

/*自分のURLを取得*/
var my_url = location.pathname;

/*サイトタイトルの表示*/
var setSiteTitleText = function(){
	if(configSet.siteTitleText !== ""){
		var h1 = document.createElement("h1");
		h1.innerText = configSet.siteTitleText;
		document.getElementById("site_title_logo").appendChild(h1);
		document.getElementById("site_title_logo").style.backgroundImage = "none";
	}
}

/*説明文の表示*/
var makeExplainText = function(){
	if(configSet.topExplainText !== ""){
		document.getElementById("top_explain_text").innerText = configSet.topExplainText;
	}
	else{
		document.getElementById("top_explain_text").style.display = "none";
	}
}

/*メニューを作成・表示*/
var makeMenu = function(){
	var menuSet = configSet.menu;
	var length = menuSet.length;

	for(var i=0; i < length; i++){
		var newDiv = document.createElement("div");							/*divタグを作る*/
		var newA = document.createElement("a");								/*aタグを作る*/
		newA.href = menuSet[i][1];											/*リンクを設定*/
		newA.innerText = menuSet[i][0];										/*テキストを反映*/
		if(("" + menuSet[i][2]) !== "undefined"){
			newA.target= menuSet[i][2];
		}
		newDiv.appendChild(newA);

		/*第2レベルの作成*/
		if(("" + menuSet[i][3]) !== "undefined"){
			var newSubMenu = document.createElement("div");
			var subLength = menuSet[i][3].length;
			for(var j=0; j < subLength; j++){
				var newSubA = document.createElement("a");
				newSubA.innerText = menuSet[i][3][j][0];
				newSubA.href = menuSet[i][3][j][1];
				if(("" + menuSet[i][3][j][2]) !== "undefined"){
					newSubA.target= menuSet[i][3][j][2];
				}
				newSubMenu.appendChild(newSubA);
			}
			newDiv.onmouseover = function(){
				if(!mq.matches){
					this.lastElementChild.classList.add("zoom_top");
					this.lastElementChild.style.display = "block";
				}
			}
			newDiv.onmouseout = function(){
				if(!mq.matches){
					this.lastElementChild.classList.remove("zoom_top");
					this.lastElementChild.style.display = "";
				}
			}
			newDiv.appendChild(newSubMenu);
		}
		document.getElementById("head_menu").appendChild(newDiv);				/*要素を追加*/
	}
}

/*アイコンを作成・表示*/
var makeIconSet = function(){
	//メールアイコンに対する処理
	if(configSet.mailIcon[0] === true){
		document.getElementById("mail").style.display = "inline-block";
		document.getElementById("mail").href = configSet.mailIcon[1];
		document.getElementById("mail").target = configSet.mailIcon[2];
	}
	else{
		document.getElementById("mail").style.display = "none";
	}
	//ナイトモードアイコンに対する処理
	if(configSet.nightModeIcon === true){
		document.getElementById("night").style.display = "inline-block";
	}
	else{
		document.getElementById("night").style.display = "none";
	}

	//自分で設置するアイコンに対する処理
	var myIcons = configSet.myIcons;
	var length = myIcons.length;

	for(var i=0; i < length; i++){
		if(myIcons[i][0] === true){
			var newA = document.createElement("a");								/*aタグを作る*/
			newA.style.backgroundImage = 'url("' + myIcons[i][1] + '")';		/*背景を反映*/
			newA.href = myIcons[i][2];											/*リンクを設定*/
			if((""+myIcons[i][3]) !== "undefined"){
				newA.target = myIcons[i][3];
			}
			newA.className = "my_icon";
			document.getElementById("icon_set").appendChild(newA);				/*要素を追加*/
		}
	}
}

/*トップ絵の表示*/
var makeTopImage = function(){
	var viewImageList = configSet.viewTopImage;
	var topImage = document.getElementById("top_image");
	topImage.style.display = "none";
	if(viewImageList[0] === true){
		topImage.src = viewImageList[2];
		topImage.style.display = "";
	}
	else{
		var length = viewImageList[1].length;
		for(i=0; i < length; i++){
			if(viewImageList[1][i].indexOf(my_url) > -1){/*fireFoxだとローカルで一致しないため部分一致*/
				topImage.src = viewImageList[2];
				topImage.style.display = "";
			}
		}
	}

	/*カラムによる変更*/
	if(window.getComputedStyle(topImage,"").position === "relative"){
		document.getElementById("all").insertBefore(topImage,document.getElementsByTagName("header")[0]);
	}
	if(window.getComputedStyle(topImage,"").maxWidth === "10000px"){
		document.getElementsByTagName("main")[0].insertBefore(topImage,document.getElementById("bread"));
	}
}

/*パンくずリストを作成・表示*/
var makeBread = function(){
	var localPathList = my_url.replace(index_url, "").split("\/");
	var pathLength = localPathList.length;
	var breadNames = configSet.breadName;
	var breadNamesLength = breadNames.length;

	var breadNamesHTML = '<a href="' + index_url + 'index.html">' + 'Index' + '</a>';

	for(var i=0; i < pathLength; i++){
		for(var k=0; k < breadNamesLength; k++){
			if(localPathList[i] === breadNames[k][0]){
				var pageUrl = my_url.substring(0, my_url.indexOf(breadNames[k][0])) + breadNames[k][0] + "/index.html";
				breadNamesHTML += ('&gt;<a href="' + pageUrl + '">' + breadNames[k][1] + '</a>');
			}
		}
	}

	document.getElementById("bread").innerHTML = breadNamesHTML;
}

/*メニューを開く*/
var openMenu = function(){
	var menus = document.getElementById("head_menu").getElementsByTagName("div");
	var length = menus.length;

	for(var i=0; i < length; i++){
		menus[i].classList.add("slide_left");
	}
	document.getElementById("head_menu").style.display = "inline-block";

	/*リサイズに対して*/
	window.addEventListener("resize",resizeOver,false);
}

/*リサイズ対応用関数*/
var resizeOver = function(){
	if(!mq.matches && (document.getElementById("head_menu").style.display === "inline-block")){
		closeMenu();
	}
}

/*閉じる(アニメーション付きなので大げさ)*/
var closeMenu = function(){
	//ブラウザが大きければそもそも実行しない?（ブラウザが大きいときに×ボタンはないから大丈夫）
	//if(!mq.matches){ return 0;}
	var menus = document.getElementById("head_menu").getElementsByTagName("div");
	var length = menus.length;

	for(var i=0; i < length; i++){
		menus[i].classList.remove("slide_left");
		menus[i].offsetWidth = menus[i].offsetWidth;
		menus[i].classList.add("slide_right");
	}

	var timerStop = false;
	var timeOut = setInterval(function(){
		if(timerStop){
			document.getElementById("head_menu").style.display = "";
			
			for(var i=0; i < length; i++){
				menus[i].classList.remove("slide_right");
				menus[i].offsetWidth = menus[i].offsetWidth;
			}
			clearInterval(timeOut);
		}
		else{
			timerStop = true;
		}
	},150);
	/*リサイズに対して*///現状ちょっと遅れてしまうけど、とりあえず実装はできている
	window.removeEventListener("resize",resizeOver,false);
}

/*前　次　の設定（そういうページでしか使わない）*/
var myPagePara = document.location.search.substring(1);//パラメータ取得
var myPageParaArray = myPagePara.split("&");//パラメータ一覧
/*パラメータを変化させる*/
var movePara = function(obj,move){
	if(myPageParaArray.length <= 1){
		return 0;
	}
	var row = myPageParaArray[0].split("=")[1]*1;
	var col = myPageParaArray[1].split("=")[1]*1;
	if((""+paraListSet[row][col+move]) !== "undefined"){
		var url = "?row=" + row + "&col=" + (col+move);
		obj.href = url;
	}
}

/*更新履歴表示*/
var readSiteHistory = function(obj){
	if(obj === null){ return 0;}

	/*同じ階層にある場合のみ*/
	var fileName = "data/site_history.txt";

	/*ファイル読み込み用の記述(外側に設置したほうがいい？)*/
	var writeSignature = function( filename ) {
		var text = "";
		var xhr = new XMLHttpRequest();
		xhr.open("get", filename,true);
		xhr.responseType = "text";//この指定大事
		xhr.onreadystatechange = function(){
			// 本番用
			if (xhr.readyState === 4 && xhr.status === 200){
				console.log("読み込み完了");
				text = xhr.responseText;//innerHTMLと迷う
				obj.lastElementChild.innerText = text;
			}
			// ローカルファイル用
			if (xhr.readyState === 4 && xhr.status === 0){
				console.log("読み込みエラーまたは読み込み未完了\nサーバにアップロードしてテストしてください");
				text = xhr.responseText;
			}
		}
		xhr.send("");
	}
	writeSignature(fileName);
}

/*オート画像表示*/
var readImage = function(obj){
	if(obj === null){ return 0;}

	/*初期化*/
	var row = 0;
	var col = 0;
	var length = 0;
	var chooseImage = 1;
	var beforeId = "auto_images";
	var newImageCount;

	/*状態切り替え関数*/
	var changeMode = function(nextId){
		if(nextId === obj.id){return 0;}

		obj.children[chooseImage].style.border="";
		if(nextId === "auto_images_zoom"){
			document.getElementById("auto_images_zoom_icon").style.backgroundImage = "url('" + index_url + "img/zoom_out.png')";
			document.getElementById("auto_images_all_icon").style.backgroundImage = "url('" + index_url + "img/all_view.png')";
		}
		else if(nextId === "auto_images_all"){
			window.scroll(0, obj.getBoundingClientRect().top+ window.pageYOffset);
			document.getElementById("auto_images_all_icon").style.backgroundImage = "url('" + index_url + "img/all_view_on.png')";
			obj.children[chooseImage].style.border="0.1em solid gray";
			if(obj.id === "auto_images"){
				document.getElementById("auto_images_zoom_icon").style.backgroundImage = "url('" + index_url + "img/zoom_out.png')";
			}
			else if(obj.id === "auto_images_zoom"){
				document.getElementById("auto_images_zoom_icon").style.backgroundImage = "url('" + index_url + "img/zoom.png')";
			}
		}
		else{
			document.getElementById("auto_images_zoom_icon").style.backgroundImage = "url('" + index_url + "img/zoom.png')";
			document.getElementById("auto_images_all_icon").style.backgroundImage = "url('" + index_url + "img/all_view.png')";
		}

		beforeId = obj.id;
		obj.id = nextId;
		Cookies.set("autoImageId", obj.id);

		//if(beforeId === "auto_images_all"){
			window.scroll(0, obj.children[chooseImage].getBoundingClientRect().top + window.pageYOffset - 10);
		//}

	}

	/*メニューを作っていく*/
	var makeImageMenu = function(){
		var newSpanMenu = document.createElement("span");
		newSpanMenu.id="auto_images_menu";
		var newZoomOutIcon = document.createElement("a");
		newZoomOutIcon.id="auto_images_zoom_icon";
		newZoomOutIcon.onclick = function(){
			if(obj.id === "auto_images_all"){
				changeMode(beforeId);
			}
			else if(obj.id === "auto_images"){
				changeMode("auto_images_zoom");
			}
			else{
				changeMode("auto_images");
			}
		};

		var newAllViewIcon = document.createElement("a");
		newAllViewIcon.id="auto_images_all_icon";
		newAllViewIcon.onclick = function(){
			if(obj.id !== "auto_images_all"){
				changeMode("auto_images_all");
			}
			else{
				changeMode(beforeId);
			}
		};

		newImageCount = document.createElement("span");
		newImageCount.id="auto_images_count";
		newImageCount.innerText = "1/" + length;

		newSpanMenu.appendChild(newImageCount);
		newSpanMenu.appendChild(newAllViewIcon);
		newSpanMenu.appendChild(newZoomOutIcon);

		obj.insertBefore(newSpanMenu,obj.firstChild);
	}

	/*1つ1つの画像を作っていく*/
	var makeAutoImage = function(){

		for(var i=0; i < length; i++){
			var url = autoImages[i][0];
			if(myPageParaArray.length > 1){
				if(paraListSet[row][col][1].slice(-1) !== "/"){paraListSet[row][col][1] += "/"}//実験しないと
				url = paraListSet[row][col][1] + url;//ここを変えた
			}

			var comment = autoImages[i][1];

			var newDiv = document.createElement("div");
			var newSpan = document.createElement("span");
			var newZoomIcon = document.createElement("a");
			var newImageObj = document.createElement("img");
			var newComment = document.createElement("p");

			newDiv.className = "flexbox";

			newImageObj.src = url;
			
			newImageObj.onclick = function(){
				if(mq.matches){
					window.open(this.src, "_blank");
				}
				else if(obj.id === "auto_images_all"){
					changeMode(beforeId);
					window.scroll(0, this.parentNode.parentNode.getBoundingClientRect().top + window.pageYOffset + 1);
				}
				else if(obj.id === "auto_images_zoom"){
					if(this.parentNode.parentNode.getBoundingClientRect().top < 15){
						window.scroll(0, this.parentNode.parentNode.getBoundingClientRect().bottom + window.pageYOffset - 10);
					}
					else{
						window.scroll(0, this.parentNode.parentNode.getBoundingClientRect().top + window.pageYOffset);
					}
				}	
				else{
					if(this.parentNode.parentNode.getBoundingClientRect().top < 0){
						window.scroll(0, this.parentNode.parentNode.getBoundingClientRect().bottom + window.pageYOffset + 1);
					}
					else{
						window.scroll(0, this.parentNode.parentNode.getBoundingClientRect().top + window.pageYOffset + 1);
					}
				}
			}
			newImageObj.onerror = function(){this.parentNode.parentNode.style.display = "none";};//んん？

			newZoomIcon.href = url;
			newZoomIcon.target="_blank";

			newComment.innerText = comment;

			newDiv.appendChild(newZoomIcon);
			newSpan.appendChild(newImageObj);
			newSpan.appendChild(newComment);
			newDiv.appendChild(newSpan);
			obj.appendChild(newDiv);
		}
	}

	/*実際に行われる処理*/
	//viewer専用
	if(myPageParaArray.length > 1){
		
		row = myPageParaArray[0].split("=")[1]*1;
		col = myPageParaArray[1].split("=")[1]*1;

		var pattern = ".txt";
		/*拡張子がtxtの場合終了*///この記述を消しても動くかもしれませんが、処理軽減のため
		if((paraListSet[row][col][1].lastIndexOf(pattern) + pattern.length === paraListSet[row][col][1].length) && (pattern.length<=paraListSet[row][col][1].length)){
			obj.style.display = "none";
			return 0;
		}
		
		/*javascript読み込み*/
		var count = document.getElementsByTagName("script").length;//数を取得
		var newScript = document.createElement("script");
		newScript.type = "text/javascript";
		if(paraListSet[row][col][1].slice(-1) !== "/"){
			paraListSet[row][col][1] += "/";
		}
		newScript.src = paraListSet[row][col][1] + "read_images_config.js";

		document.getElementsByTagName("head")[0].appendChild(newScript);

		var timeCount = 0;
		var id = setInterval(function(){
		  // 読み込みが完了するまで繰り返す
			timeCount++;
			var isEnd = true;
			try{
				length = autoImages.length;
			}
			catch(e){
				isEnd = false;
			}
			if(isEnd) {
				//length = autoImages.length;
				makeAutoImage();
				makeImageMenu();
				//タイトルの書き換え
				document.getElementsByTagName("h2")[0].innerText = paraListSet[row][col][0];
				//説明文の書き換え
				if(""+paraListSet[row][col][3] !== "undefined"){
					document.getElementById("images_explain").innerHTML = paraListSet[row][col][3];
				}
				else{
					document.getElementById("images_explain").innerHTML = "";
				}

				/*クッキーから取得*/
				if(("" + Cookies.get("autoImageId")) !== "undefined"){
					changeMode(Cookies.get("autoImageId"));//ロード時に急に状態変更
				}
				clearInterval(id);
			}
			else if(timeCount > 40){//タイムアウト(とりあえず2秒)
				clearInterval(id);
				console.log("画像リストが見つかりません");
				obj.style.display = "none";//要素を消してしまう
			}
		}, 50);
	}
	else{//viewer以外のページ
		try{
			length = autoImages.length;
		}
		catch(error){
			//viewerだけどパラメータが指定されていなかった場合の処理
			//autoImagesのjsファイルを読み込ませていなかった場合は意図せずここへ飛ぶ
			document.getElementsByTagName("h2")[0].innerText = "エラー";
			document.getElementById("images_explain").innerHTML = "作品が指定されていません";
			return 0;
		}
		makeAutoImage();
		makeImageMenu();
	}

	/*画像番号を更新*/
	window.addEventListener("scroll", function(){
		if(obj.id === "auto_images_all"){return 0;}
		var viewport = window.parent.screen.height;
		for(var i=1; i < length; i++){
			if(obj.children[i].getBoundingClientRect().top >= (viewport/2)*(-1)){
				newImageCount.innerText = i + "/" + length;
				break;
			}
			if(i === (length-1)){
				newImageCount.innerText = length + "/" + length;
			}
		}
		chooseImage = i;
	},false);
}


/*オート表生成*/
var readTable = function(obj){
	if(obj === null){ return 0;}
	var length = obj.length;//html側の数に依存？

	for(var i=0; i < length; i++){
		var table = autoTables[i];
		if(("" + table) === "undefined"){ return 0;}//JavaScript側の数に依存
		var lineLength = table.length;
		var rowLength = 0;
		for(var k=1; k < lineLength; k++){
			if(table[k].length > rowLength){
				rowLength = table[k].length;
			}
		}
		for(var k=1; k < lineLength; k++){
			var newLine = document.createElement("tr");
			for(var j=0; j < rowLength; j++){
				var newRow = document.createElement("td");
				if((""+table[k][j]) !== "undefined"){
					newRow.innerHTML = table[k][j];
				}
				newLine.appendChild(newRow);
			}
			obj[i].appendChild(newLine);
			obj[i].border = table[0][0];
		}
	}
}


/*メインメニューの生成*/
var makeMainMenu = function(){
	var mainMenuArray = document.getElementsByClassName("main_menu");
	if(mainMenuArray === null){ return 0; }
	var mainLength = mainMenuArray.length;

	for(var num=0; num < mainLength; num++){
		if((mainMenuSet[num] + "") === "undefined"){ break; }
		var length = mainMenuSet[num].length;

		for(var i=0; i < length; i++){
			var newA = document.createElement("a");								/*aタグを作る*/
			newA.innerText = mainMenuSet[num][i][0];
			newA.href = mainMenuSet[num][i][1];
			if((""+mainMenuSet[num][i][2]) !== "undefined"){
				newA.target = mainMenuSet[num][i][2];
			}
			mainMenuArray[num].appendChild(newA);
		}
	}
}

/*パラメータメニューを作る*/
var makeParaMenu = function(){
	var paraMenuArray = document.getElementsByClassName("para_menu");
	if(paraMenuArray === null){ return 0; }
	var paraLength = paraMenuArray.length;

	for(var num=0; num < paraLength; num++){
		if((paraListSet[num] + "") === "undefined"){ break; }
		var length = paraListSet[num].length;

		for(var i=0; i < length; i++){
			var newA = document.createElement("a");								/*aタグを作る*/
			newA.innerText = paraListSet[num][i][0];
			newA.href = "viewer.html?row=" + num + "&col=" + i;
			if((""+paraListSet[num][i][2]) !== "undefined"){
				newA.target = paraListSet[num][i][2];
			}
			paraMenuArray[num].appendChild(newA);
		}
	}
}

/*画像メインメニューの生成*/
var makeMainImageMenu = function(){
	var mainMenuArray = document.getElementsByClassName("main_image_menu");
	if(mainMenuArray === null){ return 0; }
	var mainLength = mainMenuArray.length;

	for(var num=0; num < mainLength; num++){
		
		if((mainImageMenuSet[num] + "") === "undefined"){ break; }
		var length = mainImageMenuSet[num].length;
		for(var i=0; i < length; i++){
			var newA = document.createElement("a");								/*aタグを作る*/
			var newImage = document.createElement("img");//img作り損のときがある
			newA.href = mainImageMenuSet[num][i][1];
			if((mainImageMenuSet[num][i][2] !== "") && (""+mainImageMenuSet[num][i][2] !== "undefined")){
				newImage.alt = mainImageMenuSet[num][i][0];
				newImage.src = mainImageMenuSet[num][i][2];
				newA.appendChild(newImage);
			}
			else{
				newA.innerText = mainImageMenuSet[num][i][0];
			}

			if((""+mainImageMenuSet[num][i][3]) !== "undefined"){
				newA.target = mainImageMenuSet[num][i][3];
			}
			mainMenuArray[num].appendChild(newA);
		}
	}
}

/*画像＋文字メインメニューの生成*/
var makeMainImageTextMenu = function(){
	var mainMenuArray = document.getElementsByClassName("main_image_text_menu");
	if(mainMenuArray === null){ return 0; }
	var mainLength = mainMenuArray.length;

	for(var num=0; num < mainLength; num++){
		
		if((mainImageTextMenuSet[num] + "") === "undefined"){ break; }
		var length = mainImageTextMenuSet[num].length;
		for(var i=0; i < length; i++){
			var newA = document.createElement("a");								/*aタグを作る*/
			var newDiv = document.createElement("div");						/*divタグを作る*/
			var newText = document.createElement("span");							/*pタグを作る*/
			newText.innerText = mainImageTextMenuSet[num][i][0];
			newA.href = mainImageTextMenuSet[num][i][1];
			newA.className="flexbox";
			newDiv.style.backgroundImage = "url(\"" + mainImageTextMenuSet[num][i][2] + "\")";
			newA.appendChild(newDiv);
			newA.appendChild(newText);

			if((""+mainImageTextMenuSet[num][i][3]) !== "undefined"){
				newA.target = mainImageTextMenuSet[num][i][3];
			}

			mainMenuArray[num].appendChild(newA);
		}
	}
}


/*小説表示（ファイル読み込み）の設定*/
var readNovelText = function(obj){
	if(obj === null){ return 0;}
	if(obj.innerText.length > 1){return 0;}//既に文章が入っていた場合終了

	try{
		var row = myPageParaArray[0].split("=")[1]*1;
		var col = myPageParaArray[1].split("=")[1]*1;
	}
	catch(error){
		document.getElementsByTagName("h2")[0].innerText = "エラー";
		obj.innerText = "作品が指定されていません";
		return 0;
	}

	var fileName = paraListSet[row][col][1];
	var pattern = ".txt";
	/*拡張子がtxtでない場合終了*///この記述を消しても動くかもしれませんが、処理軽減のため
	if(!((fileName.lastIndexOf(pattern) + pattern.length === fileName.length) && (pattern.length<=fileName.length))){
		obj.style.display = "none";
		return 0;
	}

	/*タイトルと説明文を指定*/
	document.getElementsByTagName("h2")[0].innerText = paraListSet[row][col][0];

	if(""+paraListSet[row][col][3] !== "undefined"){
		document.getElementById("images_explain").innerText = paraListSet[row][col][3];
	}

	/*ファイル読み込み用の記述*/
	var writeSignature = function( filename ) {
		var text = "";
		var xhr = new XMLHttpRequest();
		xhr.open("get", filename,true);
		xhr.responseType = "text";//この指定大事
		xhr.onreadystatechange = function(){
			// 本番用
			if (xhr.readyState === 4 && xhr.status === 200){
				console.log("読み込み完了");
				text = xhr.responseText;
				text = text.replace(/>\r?\n/g,">");//HTMLタグには改行を適用しない。
				text = text.replace(/\r?\n/g,"<br>");//rのみの改行には非対応
				obj.innerHTML = text;
			}
			// ローカルファイル用
			if (xhr.readyState === 4 && xhr.status === 0){
				console.log("読み込みエラーまたは読み込み未完了\nサーバにアップロードしてテストしてください");
				obj.style.display = "none";//要素自体を消してしまう
			}
		}
		xhr.send("");
	}

	writeSignature(fileName);
}

/*フッターリンクの設定*/
var setFooterLink = function(obj){
	if(obj === null){ return 0;}

	var myArray = configSet.footerLink;
	var length = myArray.length;
	var newSpan = document.createElement("span");

	for(var i=0; i < length; i++){
		var newA = document.createElement("a");
		newA.innerText = myArray[i][0];
		newA.href = myArray[i][1];
		if((""+myArray[i][2]) !== "undefined"){
			newA.target = myArray[i][2];
		}
		newSpan.appendChild(newA);
	}
	obj.appendChild(newSpan);

}
