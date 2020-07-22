@echo off

rem rootにsubstanceフォルダがあるかどうか探す
rem =クッションページがあるかどうか
if exist ..\..\substance (
	rem substanceフォルダが存在している場合
	echo クッションページを削除します。
	rem クッションページ（index.html)を削除する
	del ..\..\index.html
	rem substanceフォルダの中身をすべてrootにコピー
	xcopy /e ..\..\substance\contents ..\..\contents
	xcopy /e ..\..\substance\data ..\..\data
	xcopy /e ..\..\substance\img ..\..\img
	xcopy /e ..\..\substance\js ..\..\js
	copy ..\..\substance\index.html ..\..\index.html
	copy ..\..\substance\style.css ..\..\style.css
	rem substanceフォルダを消去
	rmdir /s /q ..\..\substance
) else (
	rem substanceフォルダが存在していない場合
	echo クッションページを作成します。
	rem substanceフォルダを作成する
	mkdir ..\..\substance
	rem rootの中身（substance robot.txt easy_update以外）をsubstanceフォルダにコピーする
	xcopy /e ..\..\contents ..\..\substance\contents
	xcopy /e ..\..\data ..\..\substance\data
	xcopy /e ..\..\img ..\..\substance\img
	xcopy /e ..\..\js ..\..\substance\js
	copy ..\..\index.html ..\..\substance\index.html
	copy ..\..\style.css ..\..\substance\style.css
	rem 残ったファイル・フォルダを削除
	rmdir /s /q ..\..\contents
	rmdir /s /q ..\..\data
	rmdir /s /q ..\..\img
	rmdir /s /q ..\..\js
	del ..\..\index.html
	del ..\..\style.css
	echo index.htmlを作成
	copy ..\data\index.html ..\..\index.html
)