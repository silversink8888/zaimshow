<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use App\Attachment;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(){
      $image=Attachment::all();
      print_r($image[0]['path']);
      return view('index',compact('image'));
    }

    public function store(Request $request){
      $request->validate([
         'image'=>'required|image|mimes:jpg,jpeg,png|max:2000'
     ]);

//     $fileName=Str::random(40).'.'.$file->getClientOriginalExtension();
//     Image::make($file)->save(public_path('images/'.$fileName));
//	Image::make($file)->resize(300, null)->save(public_path( 'storage/' . $fileName ));
	
	//ファイルアップロード処理
	$file = $request->file('image');
	//    $name = $file->getClientOriginalName(); //元のファイル名のまま
	$name = Str::random(40).'.'.$file->getClientOriginalExtension(); //ランダムで40文字

	// 画像を横幅300px・縦幅アスペクト比維持の自動サイズへリサイズして保存先へ格納
	$tmpPath = public_path('storage/') . $name;

	$image = Image::make($file)
	->resize(200, null, function ($constraint) {
	$constraint->aspectRatio();
	})
	->save($tmpPath);


    // $post=new Post;
     $post = new Attachment;
     
     $post->path=$name;
     $post->name='name';
     $post->buy_no='suzuki000000000';
     $post->key='image';
     $post->save();

     return redirect()->back();
    }
}