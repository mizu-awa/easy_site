@echo off

rem root��substance�t�H���_�����邩�ǂ����T��
rem =�N�b�V�����y�[�W�����邩�ǂ���
if exist ..\..\substance (
	rem substance�t�H���_�����݂��Ă���ꍇ
	echo �N�b�V�����y�[�W���폜���܂��B
	rem �N�b�V�����y�[�W�iindex.html)���폜����
	del ..\..\index.html
	rem substance�t�H���_�̒��g�����ׂ�root�Ɉړ�
	xcopy /e ..\..\substance ..\..\
	rem ���g�̋�ɂȂ���substance�t�H���_������
	del ..\..\sucstance
) else (
	rem substance�t�H���_�����݂��Ă��Ȃ��ꍇ
	echo �N�b�V�����y�[�W���쐬���܂��B
	rem substance�t�H���_���쐬����
	mkdir ..\..\substance
	rem root�̒��g�isubstance robot.txt�ȊO�j��substance�t�H���_�Ɉړ�����
	xcopy /e ..\..\ ..\..\substance
	rem index.html���쐬
	move ..\data\index.html ..\..\
)