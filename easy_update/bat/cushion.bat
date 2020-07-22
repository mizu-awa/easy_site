@echo off

rem rootにsubstanceフォルダがあるかどうか探す
rem =クッションページがあるかどうか
if exist ..\..\substance (
	rem substanceフォルダが存在している場合
	echo クッションページを削除します。
	rem クッションページ（index.html)を削除する
	del ..\..\index.html
	rem substanceフォルダの中身をすべてrootに移動
	xcopy /e ..\..\substance ..\..\
	rem 中身の空になったsubstanceフォルダを消去
	del ..\..\sucstance
) else (
	rem substanceフォルダが存在していない場合
	echo クッションページを作成します。
	rem substanceフォルダを作成する
	mkdir ..\..\substance
	rem rootの中身（substance robot.txt以外）をsubstanceフォルダに移動する
	xcopy /e ..\..\ ..\..\substance
	rem index.htmlを作成
	move ..\data\index.html ..\..\
)