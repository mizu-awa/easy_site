@echo off

rem rootにsubstanceフォルダがあるかどうか探す
rem =クッションページがあるかどうか
if exist ..\..\substance (
	rem substanceフォルダが存在している場合
	echo クッションページを削除します。
	rem クッションページ（index.html)を削除する
	del ..\..\index.html
	rem substanceフォルダの中身をすべてrootにコピー
	echo D | xcopy /e ..\..\substance\contents ..\..\contents
	echo D | xcopy /e ..\..\substance\data ..\..\data
	echo D | xcopy /e ..\..\substance\img ..\..\img
	echo D | xcopy /e ..\..\substance\js ..\..\js
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
	echo D | xcopy /e ..\..\contents ..\..\substance\contents
	echo D | xcopy /e ..\..\data ..\..\substance\data
	echo D | xcopy /e ..\..\img ..\..\substance\img
	echo D | xcopy /e ..\..\js ..\..\substance\js
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

exit