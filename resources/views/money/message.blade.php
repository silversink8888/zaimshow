<div class="">
@if ($errors->any())
    <font color="red">
      <ul>
          @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
          @endforeach
      </ul>
    </font>
@endif
</div>
