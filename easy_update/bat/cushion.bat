@echo off

rem root��substance�t�H���_�����邩�ǂ����T��
rem =�N�b�V�����y�[�W�����邩�ǂ���
if exist ..\..\substance (
	rem substance�t�H���_�����݂��Ă���ꍇ
	echo �N�b�V�����y�[�W���폜���܂��B
	rem �N�b�V�����y�[�W�iindex.html)���폜����
	del ..\..\index.html
	rem substance�t�H���_�̒��g�����ׂ�root�ɃR�s�[
	echo D | xcopy /e ..\..\substance\contents ..\..\contents
	echo D | xcopy /e ..\..\substance\data ..\..\data
	echo D | xcopy /e ..\..\substance\img ..\..\img
	echo D | xcopy /e ..\..\substance\js ..\..\js
	copy ..\..\substance\index.html ..\..\index.html
	copy ..\..\substance\style.css ..\..\style.css
	rem substance�t�H���_������
	rmdir /s /q ..\..\substance
) else (
	rem substance�t�H���_�����݂��Ă��Ȃ��ꍇ
	echo �N�b�V�����y�[�W���쐬���܂��B
	rem substance�t�H���_���쐬����
	mkdir ..\..\substance
	rem root�̒��g�isubstance robot.txt easy_update�ȊO�j��substance�t�H���_�ɃR�s�[����
	echo D | xcopy /e ..\..\contents ..\..\substance\contents
	echo D | xcopy /e ..\..\data ..\..\substance\data
	echo D | xcopy /e ..\..\img ..\..\substance\img
	echo D | xcopy /e ..\..\js ..\..\substance\js
	copy ..\..\index.html ..\..\substance\index.html
	copy ..\..\style.css ..\..\substance\style.css
	rem �c�����t�@�C���E�t�H���_���폜
	rmdir /s /q ..\..\contents
	rmdir /s /q ..\..\data
	rmdir /s /q ..\..\img
	rmdir /s /q ..\..\js
	del ..\..\index.html
	del ..\..\style.css
	echo index.html���쐬
	copy ..\data\index.html ..\..\index.html
)

exit