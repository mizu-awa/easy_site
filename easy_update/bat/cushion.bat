@echo off

rem root��substance�t�H���_�����邩�ǂ����T��
rem =�N�b�V�����y�[�W�����邩�ǂ���
if exist ..\..\substance (
	rem substance�t�H���_�����݂��Ă���ꍇ
	echo �N�b�V�����y�[�W���폜���܂��B
	rem �N�b�V�����y�[�W�iindex.html)���폜����
	del ..\..\index.html
	rem substance�t�H���_�̒��g�����ׂ�root�ɃR�s�[
	xcopy /e ..\..\substance ..\..\
	rem substance�t�H���_������
	rmdir /s /q ..\..\substance
) else (
	rem substance�t�H���_�����݂��Ă��Ȃ��ꍇ
	echo �N�b�V�����y�[�W���쐬���܂��B
	rem substance�t�H���_���쐬����
	mkdir ..\..\substance
	echo root�̒��g�isubstance robot.txt easy_update�ȊO�j��substance�t�H���_�ɃR�s�[����
	xcopy /e /EXCLUDE: ..\data\xcopy-excludelist.txt ..\..\ ..\..\substance
	echo �c�����t�@�C���E�t�H���_���폜(���[�U���ǉ������t�H���_���������ꍇ�g���Ȃ����c)
	rmdir /s /q ..\..\contents
	rmdir /s /q ..\..\data
	rmdir /s /q ..\..\img
	rmdir /s /q ..\..\js
	del ..\..\index.html
	del ..\..\style.css
	echo index.html���쐬
	copy ..\data\index.html ..\..\index.html
)