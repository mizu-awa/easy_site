@echo off

rem rootにsubstanceフォルダがあるかどうか探す
rem =クッションページがあるかどうか
if exist ..\..\substance (
	rem substanceフォルダが存在している場合
	echo クッションページを削除します。
	rem クッションページ（index.html)を削除する
	del ..\..\index.html
	rem substanceフォルダの中身をすべてrootにコピー
	xcopy /e ..\..\substance ..\..\
	rem substanceフォルダを消去
	rmdir /s /q ..\..\substance
) else (
	rem substanceフォルダが存在していない場合
	echo クッションページを作成します。
	rem substanceフォルダを作成する
	mkdir ..\..\substance
	echo rootの中身（substance robot.txt easy_update以外）をsubstanceフォルダにコピーする
	xcopy /e /EXCLUDE: ..\data\xcopy-excludelist.txt ..\..\ ..\..\substance
	echo 残ったファイル・フォルダを削除(ユーザが追加したフォルダがあった場合使えないが…)
	rmdir /s /q ..\..\contents
	rmdir /s /q ..\..\data
	rmdir /s /q ..\..\img
	rmdir /s /q ..\..\js
	del ..\..\index.html
	del ..\..\style.css
	echo index.htmlを作成
	copy ..\data\index.html ..\..\index.html
)