<!doctype html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Laravel</title>

    </head>
    <body>

    <div class="image">
      @foreach($image as $i)
      @if($i!=null)
	<img src="{{ asset('storage/'.$i->path) }}" width="200px" height="">

      @endif
      @endforeach
    </div>

    <div class="form">

      @if(count($errors)>0)
      <div class="alert alert-danger">
      <ul>
          @foreach($errors->all() as $error)
          <li>{{$error}}</li>
          @endforeach
          </ul>
      </div>
      @endif

      <form action="{{route('store')}}" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        <input type="file" name="image">
        <br>
        <input type="submit" value="保存">
      </form>

    </div>

    </body>
</html>

<style>
img{
  width:30%;
  height:30%;
  margin-left:33%;
  margin-top:50px;
}
.form{
  margin:7% 33% ;
}
</style>
