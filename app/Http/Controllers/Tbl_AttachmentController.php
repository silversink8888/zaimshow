<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Str;
use App\Attachment;
use Illuminate\Support\Facades\DB;

class Tbl_AttachmentController extends Controller
{
	/***********************************/
	//ファイルアップロード
	//
	//parametor1 画像
	//parametor2 ユーザ情報
	//return view('money/show')
	/***********************************/
	public function FileUpload($request,$money_arr){

		$this->validate($request, [
			'file'=> [
				//必須
				'required',
				//アップロードされたファイル
				'file',
				//画像ファイル
				'image',
				//MIMEタイプを指定
				'mimes:jpeg,png',
			]
		]);

		if ($request->file('file')->isValid([])) {
				
			//ファイルアップロード処理
			$file = $request->file('file');
			//$name = $file->getClientOriginalName(); //元のファイル名のまま
			$name = Str::random(40).'.'.$file->getClientOriginalExtension(); //ランダムで40文字
			// 画像を横幅300px・縦幅アスペクト比維持の自動サイズへリサイズして保存先へ格納
			$tmpPath = public_path('storage/') . $name;
			$image = Image::make($file)
			->resize(200, null, function ($constraint) {
			$constraint->aspectRatio();
			})
			->save($tmpPath);
		
			$path = basename($tmpPath); //ファイル名のみ取得

			$attachments_arr = array();
			$attachments_arr = DB::table('attachments')
								->where('buy_no', $money_arr->buy_no)
								->get();

			//編集
//			if(!empty($attachments_arr)){
			if(count($attachments_arr)){
				//path のみ変更
				$update = [
					'path' => $path
				];
				
				Attachment::where('buy_no',$money_arr->buy_no)->update($update);

			//新規登録
			}else{

				$attachment = new \App\Attachment();
				$attachment->name = $request->name;
				$attachment->buy_no = $money_arr->buy_no;
				$attachment->path = $path;
				$attachment->key = 'image';
				$attachment->save();
			}

			return view('money/show')->with('file', basename($tmpPath));
			
		}else{
			return redirect()
				->back()
				->withInput()
				->withErrors();
		}
	}
}
