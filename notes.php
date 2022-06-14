<?php

/*
* Template Name: Venue Template
*/

get_header(); ?>

<main id="venue" class="wrapper__main bgWhite">

	<div id="venue-intro" class="venue__section bgSecondary center">
		<header class="venue__header">
			<div class="venue__title">
				<h1 class="h2"><span>Venue</span></h1>

				<a href="<?php the_field('url', 'option'); ?>" target="_blank" rel="nofollow" class="venue__cta venue__cta--first btn btn--link btn--link--left"><span class="normal">Virtual Tour</span></a>

				<button type="button" class="venue__cta venue__cta--last btn btn--link btn--dialog" aria-expanded="false"><span class="normal">Book Event</span></button>
			</div>

			<div class="vertBeforeRow--d vertAfter3x vertAfterRow--d">
				<div class="vertBeforeRow2x vertBefore2x--d"><?php echo file_get_contents(get_template_directory() . '/images/lines-doors.svg'); ?></div>
			</div>

			<?php $hero_img = get_field('hero_img'); ?>
			<?php if ($hero_img) { ?>
				<img src="<?php echo $hero_img['url']; ?>" alt="<?php echo $hero_img['alt']; ?>" id="venue-hero" class="venue__hero" />
			<?php } ?>

		</header>
	</div>

	<div class="venue__section hub grid grid--d--18">
		<div class="venue__col hub__col hub__col--flex grid__col grid__col--d--span-11">
			<div class="venue__pane hub__pane hub__pane--half hub__pane--half--venue hub__pane--noOverflow bgPrimary">

				<?php $details_gallery_1_images = get_field('details_gallery_1'); ?>
				<?php if ($details_gallery_1_images) :  ?>
					<div id="venue-slider" class="swiper">
						<div class="swiper-wrapper">
							<?php foreach ($details_gallery_1_images as $details_gallery_1_image) : ?>
								<div class="swiper-slide">
									<img src="<?php echo $details_gallery_1_image['sizes']['large']; ?>" alt="<?php echo $details_gallery_1_image['alt']; ?>" class="hub__pane__object" />
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endif; ?>

			</div>

			<div class="venue__pane hub__pane hub__pane--last hub__pane--half grid grid--11 bgTertiary">
				<div class="venue__pane__item hub__pane grid__col grid__col--span-7">
					<?php $details_img_3 = get_field('details_img_3'); ?>
					<?php if ($details_img_3) { ?>
						<img src="<?php echo $details_img_3['url']; ?>" alt="<?php echo $details_img_3['alt']; ?>" class="hub__pane__object" />
					<?php } ?>
				</div>

				<div id="venue-illo-toothpick" class="venue__pane__item hub__pane hub__pane--noOverflow grid__col grid__col--8 grid__col--span-4" style="background: url('<?php echo get_template_directory_uri(); ?>/images/illo-toothpick.svg') no-repeat 40% 50% / 150% auto;">

					<div class="hub__illo hub__illo--bottom">
						<?php echo file_get_contents(get_template_directory() . '/images/illo-toothpick.svg'); ?>
					</div>
				</div>
			</div>
		</div>

		<div class="venue__col hub__col grid__col grid__col--d--12 grid__col--d--span-7">
			<div class="venue__pane hub__pane hub__pane--xl">
				<?php $details_img_2 = get_field('details_img_2'); ?>
				<?php if ($details_img_2) { ?>
					<img src="<?php echo $details_img_2['url']; ?>" alt="<?php echo $details_img_2['alt']; ?>" class="hub__pane__object" />
				<?php } ?>
			</div>
		</div>
	</div>

	<section class="venue__section venue__section--details">
		<div class="grid grid--d--18 vertBeforeRow2x vertAfterRow2x">
			<div class="grid__col grid__col--3 grid__col--d--6 grid__col--span-16 grid__col--d--span-8">
				<h2 class="h3 vertAfter"><?php the_field('details_headline'); ?></h2>
				<p><?php the_field('details_textarea'); ?></p>
				<a href="<?php the_field('url', 'option'); ?>" target="_blank" rel="nofollow" class="btn btn--link">Take A Virtual Tour</a>
			</div>
		</div>

		<?php if (have_rows('details_items')) : ?>
			<div class="grid grid--d--18">
				<div class="grid__col grid__col--3 grid__col--d--3 grid__col--span-16 grid__col--d--span-14">
					<ul class="list list--flex">
						<?php while (have_rows('details_items')) : the_row(); ?>
							<li class="list__item list__item--half vertAfter vertAfter2x--d">
								<h3 class="h5 vertAfterMin"><?php the_sub_field('headline'); ?></h3>
								<p><?php the_sub_field('textarea'); ?></p>
							</li>
						<?php endwhile; ?>
					</ul>
				</div>
			</div>
		<?php endif; ?>

		<?php $details_cta = get_field('details_cta'); ?>
		<?php if ($details_cta) { ?>
			<div class="grid grid--d--18 vertBeforeRow vertAfterRow2x center">
				<div class="grid__col grid__col--3 grid__col--span-14">
					<a href="<?php echo $details_cta['url']; ?>" target="<?php echo $details_cta['target']; ?>" class="btn btn--pill bgPrimary white"><?php echo $details_cta['title']; ?></a>
				</div>
			</div>
		<?php } ?>
	</section>

	<div id="venue-illo-sputnik" class="venue__section venue__section--sputnik bgTertiary" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/pattern-dots.svg');">
		<span id="venue-illo-sputnik-svg"><?php echo file_get_contents(get_template_directory() . '/images/illo-sputnik.svg'); ?></span>
	</div>

	<div class="venue__section hub grid grid--d--18">
		<div class="venue__col hub__col grid__col grid__col--d--span-7">
			<div class="hub__pane hub__pane--xl">
				<?php $occasions_img_1 = get_field('occasions_img_1'); ?>
				<?php if ($occasions_img_1) { ?>
					<img src="<?php echo $occasions_img_1['url']; ?>" alt="<?php echo $occasions_img_1['alt']; ?>" class="hub__pane__object" />
				<?php } ?>
			</div>
		</div>

		<div class="venue__col hub__col hub__col--flex grid__col grid__col--d--8 grid__col--d--span-11">
			<div class="venue__pane hub__pane hub__pane--half hub__pane--half--venue">
				<?php $occasions_img_2 = get_field('occasions_img_2'); ?>
				<?php if ($occasions_img_2) { ?>
					<img src="<?php echo $occasions_img_2['url']; ?>" alt="<?php echo $occasions_img_2['alt']; ?>" class="hub__pane__object" />
				<?php } ?>
			</div>

			<div class="venue__pane hub__pane hub__pane--last hub__pane--half grid grid--11">
				<div class="venue__pane__item hub__pane grid__col grid__col--span-7">
					<?php $occasions_img_3 = get_field('occasions_img_3'); ?>
					<?php if ($occasions_img_3) { ?>
						<img src="<?php echo $occasions_img_3['url']; ?>" alt="<?php echo $occasions_img_3['alt']; ?>" class="hub__pane__object" />
					<?php } ?>
				</div>

				<div id="venue-lines-stereo" class="venue__pane__item hub__pane hub__pane--noOverflow grid__col grid__col--8 grid__col--span-4 bgSecondary">
					<div class="hub__lines hub__lines--top">
						<?php echo file_get_contents(get_template_directory() . '/images/lines-stereo.svg'); ?>
					</div>
				</div>
			</div>
		</div>
	</div>

	<section class="venue__section venue__section--types">
		<div class="grid grid--d--18 vertBeforeRow2x vertAfterRow2x">
			<div class="grid__col grid__col--3 grid__col--d--6 grid__col--span-16 grid__col--d--span-8">
				<h2 class="h3 vertAfter"><?php the_field('occasions_headline'); ?></h2>
				<p><?php the_field('occasions_textarea'); ?></p>
			</div>
		</div>

		<?php if (have_rows('occasions_items')) : ?>
			<div class="grid grid--d--18 vertAfterRow2x">
				<div class="grid__col grid__col--3 grid__col--d--3 grid__col--span-16 grid__col--d--span-14">

					<ul class="list list--flex">
						<?php while (have_rows('occasions_items')) : the_row(); ?>
							<li class="list__item list__item--thirds vertAfter2x">
								<h3 class="h5 vertAfterMin"><?php the_sub_field('headline'); ?></h3>
								<p><?php the_sub_field('textarea'); ?></p>
								<?php $cta = get_sub_field('cta'); ?>
								<?php if ($cta) { ?>
									<a href="<?php echo $cta['url']; ?>" target="<?php echo $cta['target']; ?>" class="btn btn--link"><?php echo $cta['title']; ?></a>
								<?php } ?>
							</li>
						<?php endwhile; ?>
					</ul>
				</div>
			</div>
		<?php endif; ?>

		<div class="grid grid--d--18 vertAfterRow2x center">
			<div class="grid__col grid__col--3 grid__col--span-14">
				<button type="button" class="btn btn--pill btn--dialog bgPrimary white" aria-expanded="false">Book An Event</button>
			</div>
		</div>

		<?php echo file_get_contents(get_template_directory() . '/images/lines-martini.svg'); ?>
	</section>
</main>

<?php get_footer(); ?>