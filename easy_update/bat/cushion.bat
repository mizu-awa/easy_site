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
	rmdir /s ..\..\substance
) else (
	rem substanceフォルダが存在していない場合
	echo クッションページを作成します。
	rem substanceフォルダを作成する
	mkdir ..\..\substance
	rem rootの中身（substance robot.txt easy_update以外）をsubstanceフォルダにコピーする
	xcopy /e ..\..\ ..\..\substance /EXCLUDE: ..\data\xcopy-excludelist.txt
	rem 残ったファイル・フォルダを削除(ユーザが追加したフォルダがあった場合使えないが…)
	rmdir /s ..\..\contents
	rmdir /s ..\..\data
	rmdir /s ..\..\img
	rmdir /s ..\..\js
	del ..\..\index.html
	del ..\..\style.css
	rem index.htmlを作成
	copy ..\data\index.html ..\..\index.html
)