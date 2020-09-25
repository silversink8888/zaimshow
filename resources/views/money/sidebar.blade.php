<section id="header">

	@include('layouts.app-side')

	<nav id="nav">
	 <!--/ カレンダー -->
	@include('/money/calender')
	 <!-- カレンダー /-->
	</nav>

	<footer>
		<ul class="icons">
			<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
			<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
			<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
			<li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
			<li><a href="#" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
		</ul>
	</footer>

</section>
@yield('sidebar')