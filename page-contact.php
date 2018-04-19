<!DOCTYPE html>
<html lang="pl">
<?php include'_head.php'; ?>
<body class="page-contact-template">
	<?php include'_navigation.php'; ?>
	<section class="main-banner subpage" data-aos="fade" data-aos-once="true" data-aos-delay="00" data-aos-duration="300">
		<div class="container-fluid">
			<div class="carousel-left" data-aos="zoom-in" data-aos-once="true" data-aos-delay="400" data-aos-duration="500">
				<img class="img-fluid" src="webroot/img/attenzione.jpg" alt="">
			</div>
			<div class="carousel-right" data-aos="fade-down" data-aos-once="true" data-aos-delay="400" data-aos-duration="500">
				<h1 class="carousel-header bg-brand-primary">uśmiechnij <br> mi się</h1>
			</div>
			<div class="mx-15-minus">
				<div class="carousel-main">
					<div class="item">
						<img class="img-fluid" src="webroot/img/slider9.jpg" alt="">
					</div>
				</div>
			</div>
		</div>
	</section>
	<main class="main">
		<section>
			<div class="container-fluid">
				<div class="mx-15-minus">
					<pre>Kontakt</pre>
				</div>
			</div>
		</section>
		<section class="section-contact">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12 col-lg-6 left" data-aos="fade" data-aos-once="true" data-aos-delay="400" data-aos-duration="500">
						<div class="contact-wrapper">
							<div class="contact-row">
								<div class="contact-box">
									<address>
										UŚMIECHNIJ MI SIĘ <br>
										Marta Niedziela-Sołtysiak <br>
										ul. Sadowa 67 <br>
										32-600 Oświęcim
									</address>
									<a href="">Telefon: <br> +48 33 476 8989</a>
								</div>
								<div class="contact-box">
									<address>
										Centrum Medyczne<br>
										UŚMIECHNIJ MI SIĘ<br>
										pl. Kościuszki 12<br>
										32-600 Oświęcim
									</address>
									<a href="">Telefon: <br> +48 33 841 1528</a>
								</div>
								<div class="contact-box">
									<p>Godziny otwarcia</p>
									<p>
										Poniedziałek-Piątek<br>
										od 9.00 do 20.00<br>
										Sobota<br>
										od 9.00 do 13.00.
									</p>
								</div>
							</div>
						</div>
						<div>
							<button type="button" class="btn btn-lg btn-primary btn-register text-lowercase">rejestracja@usmiechnijmisie.pl</button>
						</div>
					</div>
					<div class="col-12 col-lg-6 right" data-aos="fade" data-aos-once="true" data-aos-delay="400" data-aos-duration="500">
						<div class="vertical-line line-2" id="animation-line-2"></div>
						<div class="pos-start-animate" data-animate="#animation-line-2"></div>
						<form class="form form-contact">
							<div class="form-group row">
								<label for="fullname" class="col-md-4 col-lg-12 col-xll-4 col-form-label">Imię i nazwisko </label>
								<div class="col-md-8 col-lg-12 col-xll-8">
									<input type="text" class="form-control" id="fullname">
								</div>
							</div>
							<div class="form-group row">
								<label for="email" class="col-md-4 col-lg-12 col-xll-4 col-form-label">Adres email</label>
								<div class="col-md-8 col-lg-12 col-xll-8">
									<input type="email" class="form-control" id="email">
								</div>
							</div>
							<div class="form-group row">
								<label for="phone" class="col-md-4 col-lg-12 col-xll-4 col-form-label">Telefon</label>
								<div class="col-md-8 col-lg-12 col-xll-8">
									<input type="tel" class="form-control" id="phone">
								</div>
							</div>
							<div class="form-group">
								<label for="message">Treść wiadomości</label>
								<textarea class="form-control" id="message" rows="10"></textarea>
							</div>
							<div class="d-flex justify-content-end">
								<button type="submit" class="btn btn-lg btn-primary">wyślij</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</main>
	<div id="map" data-aos="fade" data-aos-once="true" data-aos-delay="400" data-aos-duration="500"></div>
	<?php include '_footer.php'; ?>
	<?php include '_footer-scripts.php'; ?>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiAQhE2CBrmV2eU77G00lIO5VoMRO-ZNE"
	type="text/javascript"></script>

	<script type="text/javascript">
	(function() {

		if(document.querySelectorAll('#map').length > 0) {
			google.maps.event.addDomListener(window, 'load', initMap);
		}

		function initMap() {

			var locations = [
				['<b>UŚMIECHNIJ MI SIĘ</b> <br><br><b>Marta Niedziela-Sołtysiak</b><br><b> ul.Sadowa 67</b><br>', 50.025761, 19.226464, 1],
				['<b>CENTRUM MEDYCZNE</b> <br><br> <b>UŚMIECHNIJ MI SIĘ</b><br><b>pl. Kościuszki 12</b><br>', 50.037425,  19.224914, 2]
			];

			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 9,
				mapTypeId: google.maps.MapTypeId.ROADMAP,

				styles: [
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e9e9e9"
							},
							{
								"lightness": 17
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f5f5"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 17
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 29
							},
							{
								"weight": 0.2
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 18
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							},
							{
								"lightness": 16
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f5f5"
							},
							{
								"lightness": 21
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dedede"
							},
							{
								"lightness": 21
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#ffffff"
							},
							{
								"lightness": 16
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"saturation": 36
							},
							{
								"color": "#333333"
							},
							{
								"lightness": 40
							}
						]
					},
					{
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f2f2f2"
							},
							{
								"lightness": 19
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#fefefe"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#fefefe"
							},
							{
								"lightness": 17
							},
							{
								"weight": 1.2
							}
						]
					}
				]
			});

			var infowindow = new google.maps.InfoWindow();
			var bounds = new google.maps.LatLngBounds();
			var marker;

			for (var i = 0; i < locations.length; i++) {

				content = [
					'<div style="width: 200px; padding: 10px 0 10px 5px;">',
					locations[i][0],
					'</div>'
				].join('');

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i][1], locations[i][2]),
					map: map,
					icon: 'webroot/img/map-icon.jpg',
					content: content,
					animation: google.maps.Animation.DROP
				});

				bounds.extend(marker.position);
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(marker.content);
						infowindow.open(map, marker);
					}
				})(marker, i));
				map.fitBounds(bounds);
			}
		}
	})();
</script>
</body>
</html>
