var nightMode = new NightMode();

function NightMode(){
	this.nowMode = false;
	var allDiv = null;
	var divLength = null
	var allA = null;
	var aLength = null;


	this.changeMode = function(){
		var allDiv = document.getElementsByTagName("div");
		var divLength = allDiv.length;
		var allA = document.getElementsByTagName("a");
		var aLength = allA.length;
		var allHum = document.getElementById("humburger_menu_icon").getElementsByTagName("div");
		var humLength = allHum.length;
		var allIcon = document.getElementsByClassName("my_icon");
		var iconLength = allIcon.length;

		if(!this.nowMode){
			//ナイトモード状態を保存
			document.getElementsByTagName("body")[0].style.color="white";
			document.getElementsByTagName("body")[0].style.backgroundColor="black";
			for(var i=0; i < divLength; i++){
				//allDiv[i].style.color = "white";
				allDiv[i].style.backgroundColor = "black";
				allDiv[i].style.borderColor = "white";
				//allDiv[i].style.outlineColor = "white";
				//allDiv[i].style.columnRuleColor = "white";
			}
			for(var i=0; i < aLength; i++){
				allA[i].style.color = "white";
				allA[i].style.backgroundColor = "black";
				allA[i].style.borderColor = "white";
				//allA[i].style.outlineColor = "white";
				//allA[i].style.columnRuleColor = "white";
			}
			for(var i=0; i < humLength; i++){
				allHum[i].style.backgroundColor = "white";
			}
			for(var i=0; i < iconLength; i++){
				allIcon[i].style.backgroundColor = "white";
			}
			if(document.getElementById("mail") !== null){
				document.getElementById("mail").getElementsByTagName("div")[0].style.borderTopColor = "transparent";
			}
			//if(document.getElementById("site_title_logo") !== null){
			//	document.getElementById("site_title_logo").style.backgroundColor = "white";
			//}
			if(document.getElementById("night") !== null){
				document.getElementById("night").style.boxShadow = "inset -1.25vmin -1.25vmin 0 0 white";
			}
		}
		else{
			document.getElementsByTagName("body")[0].style.color="";
			document.getElementsByTagName("body")[0].style.backgroundColor="";
			for(var i=0; i < divLength; i++){
				//allDiv[i].style.color = "";
				allDiv[i].style.backgroundColor = "";
				allDiv[i].style.borderColor = "";
				//allDiv[i].style.outlineColor = "";
				//allDiv[i].style.columnRuleColor = "";
			}
			for(var i=0; i < aLength; i++){
				allA[i].style.color = "";
				allA[i].style.backgroundColor = "";
				allA[i].style.borderColor = "";
				//allA[i].style.outlineColor = "";
				//allA[i].style.columnRuleColor = "";
			}
			for(var i=0; i < humLength; i++){
				allHum[i].style.backgroundColor = "";
			}
			for(var i=0; i < iconLength; i++){
				allIcon[i].style.backgroundColor = "";
			}
			if(document.getElementById("mail") !== null){
				document.getElementById("mail").getElementsByTagName("div")[0].style.borderTopColor = "";
			}
			//if(document.getElementById("site_title_logo") !== null){
			//	document.getElementById("site_title_logo").style.backgroundColor = "";
			//}
			if(document.getElementById("night") !== null){
				document.getElementById("night").style.boxShadow = "";
			}
			if(document.getElementById("head_menu") !== null){
				document.getElementById("head_menu").style.backgroundColor = "";
			}
		}

		this.nowMode = !(this.nowMode);
		Cookies.set("nightMode", this.nowMode);
	}
}

